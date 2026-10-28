# Spec Delta

## Purpose

Escanea las dependencias del chat con Snyk, remedia las vulnerabilidades Critical y High, y deja las suites de prueba existentes en verde.

## ADDED Requirements

### Requirement: Dependency scan reports vulnerabilities
El proyecto SHALL poder ejecutar un escaneo de dependencias que produzca una lista de vulnerabilidades encontradas.

#### Scenario: snyk test lists issues
- **WHEN** se corre `snyk test` sobre el arbol npm del chat
- **THEN** el escaneo termina y muestra una lista de vulnerabilidades (o indica que no hay ninguna)

### Requirement: Critical and High issues are remediated
Despues del escaneo, el proyecto SHALL no dejar pendientes vulnerabilidades de severidad Critical ni High en las dependencias.

#### Scenario: High and Critical are gone
- **WHEN** un agente de IA aplica las correcciones recomendadas a las dependencias
- **THEN** un nuevo `snyk test` no reporta hallazgos Critical ni High

### Requirement: Existing suites still pass
Tras remediar dependencias, el chat SHALL seguir pasando las suites unitaria, de integracion y de extremo a extremo ya existentes.

#### Scenario: All current tests rerun green
- **WHEN** se vuelven a ejecutar las tres suites actuales del proyecto
- **THEN** las tres terminan sin fallos

### Requirement: Scan evidence is kept
El trabajo SHALL dejar una captura revisable del escaneo o de su resultado posterior.

#### Scenario: Evidence 5 is saved
- **WHEN** el escaneo o la remediacion se completa
- **THEN** queda una captura en `evidencia/evidencia-5.png`
