# Verificador Programático — entorno_local_verificacion (Spec 001)

> **Contrato Inmutable (`seb-harness`):** Este archivo es ejecutado automáticamente por `.seb/bin/seb verify entorno_local_verificacion` y por el hook `pre-commit` de Git.
> **Prohibición Anti-Reward-Hacking:** El agente implementador tiene terminantemente prohibido editar este archivo o relajar los tests invocados.

## 1. Matriz de Controles Ejecutables (Parseada por `seb verify`)

| Check ID | Requisito | Descripción de la Verificación | Comando Determinista |
| :--- | :--- | :--- | :--- |
| CHK-01 | RF-01 | Verificación de runtime Node.js >= 22 y npm hermético en Nix Flake | `nix develop --command bash -c "node -v | grep -E '^v(2[2-9]|[3-9][0-9])\.' && npm -v"` |
| CHK-02 | RF-02 | Verificación de archivo .envrc con integración a Flake | `test -f .envrc && grep -q "use flake" .envrc` |
| CHK-03 | RF-03 | Verificación de presencia de scripts check y typecheck en package.json | `grep -q '"check":' package.json && grep -q '"typecheck":' package.json` |
| CHK-04 | RF-04 | Verificación estática estricta de tipos mediante npm run typecheck | `nix develop --command npm run typecheck` |
| CHK-05 | RF-05 | Compilación estática de producción mediante npm run build | `nix develop --command npm run build` |
| CHK-06 | RF-06 | Ejecución de suite orquestada determinista mediante npm test | `nix develop --command npm test` |
| CHK-07 | RF-07 | Verificación de encadenamiento fail-fast en script test | `grep -E '"test":\s*".*&&.*"' package.json` |
| CHK-98 | RNF-01 | Verificación de metadata y validez de flake.nix sin root | `nix flake metadata` |
| CHK-99 | GLOBAL | Verificación de generación de artefactos estáticos en directorio dist | `test -d dist && test -f dist/index.html` |

## 2. Criterio de Aprobación

- La tarea solo se considera implementada cuando `.seb/bin/seb verify entorno_local_verificacion` reporta **100% de los controles (`CHK-01` a `CHK-99`) en estado `[PASA]`**.
