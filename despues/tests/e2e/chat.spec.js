const { test, expect } = require('@playwright/test');

const IMAGE_URL = 'https://www.w3.org/People/mimasa/test/imgformat/img/w3c_home.jpg';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=qYwlqx-JLok';
const SCRIPT_MSG = 'hola <script>alert("xss")</script>';

async function sendMessage(page, text) {
  await page.getByPlaceholder('Escriba un mensaje').fill(text);
  await page.getByRole('button', { name: 'Send' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/?testAuth=1');
  await expect(page.getByText('Conectado como David')).toBeVisible({ timeout: 15000 });
});

test('imagen termina de cargar', async ({ page }) => {
  await sendMessage(page, IMAGE_URL);
  const img = page.locator('#messages img');
  await expect(img).toBeVisible();
  await expect.poll(async () => {
    return img.evaluate((el) => el.complete && el.naturalWidth > 0);
  }).toBe(true);
});

test('video youtube muestra iframe', async ({ page }) => {
  await sendMessage(page, YOUTUBE_URL);
  const iframe = page.locator('#messages iframe[src*="youtube.com/embed/qYwlqx-JLok"]');
  await expect(iframe).toBeVisible();
  await expect(iframe).toHaveAttribute('src', /youtube\.com\/embed\/qYwlqx-JLok/);
});

test('script no abre dialog', async ({ page }) => {
  page.on('dialog', async (dialog) => {
    await dialog.dismiss();
    throw new Error('Unexpected dialog: ' + dialog.message());
  });

  await sendMessage(page, SCRIPT_MSG);

  const item = page.locator('#messages li').last();
  await expect(item).toContainText('hola');
  await expect(item.locator('script')).toHaveCount(0);
  await expect(page.locator('#messages img')).toHaveCount(0);
  await expect(page.locator('#messages iframe')).toHaveCount(0);
});

test('guest cannot send without auth', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('No autenticado')).toBeVisible();
  const send = page.getByRole('button', { name: 'Send' });
  await expect(send).toBeDisabled();
});
