# Plan Técnico — entorno_local_verificacion (Spec 001)

- **Spec Origen:** `specs/001_entorno_local_verificacion_spec.md`
- **Verificador Asociado:** `specs/001_entorno_local_verificacion_verificador.md`
- **Estado:** `PLANIFICADO`

## 1. Resumen Arquitectónico y Aislamiento de Lógica

El proyecto opera bajo Linux NixOS, donde `node` y `npm` no residen en el `$PATH` global del host. Para asegurar reproducibilidad hermética tanto para el desarrollador humano como para el arnés determinista (`seb-harness`), se adoptará un entorno declarativo mediante Nix Flakes (`flake.nix`).

La integración con el entorno de shell del usuario se delega en `direnv` mediante un archivo `.envrc` declarativo.
La estandarización de comandos se encapsula en `package.json`, asegurando que las herramientas de diagnóstico (`astro check`), chequeo de tipos estricto (`tsc --noEmit`) y compilación (`astro build`) queden unificadas en una suite orquestadora (`npm test`) con encadenamiento fail-fast (`&&`).

## 2. Mapa de Archivos a Crear o Modificar

| Archivo / Ruta | Acción (`CREAR` / `MODIFICAR`) | Responsabilidad Técnica | Requisitos Cubiertos (`RF-XX`) |
| :--- | :--- | :--- | :--- |
| `flake.nix` | `CREAR` | Definición declarativa hermética de inputs y `devShells.default` con `nodejs_22`. | `RF-01`, `RNF-01` |
| `.envrc` | `CREAR` | Integración automática con `direnv` mediante directiva `use flake`. | `RF-02` |
| `package.json` | `MODIFICAR` | Formalización de scripts `check`, `typecheck` y orquestador `test`, más dependencias necesarias (`@astrojs/check`, `typescript`). | `RF-03`, `RF-04`, `RF-05`, `RF-06`, `RF-07` |
| `.gitignore` | `MODIFICAR` | Exclusión del directorio temporal `.direnv` generado por la herramienta de shell. | `RNF-01` |

## 3. Contratos, Firmas y Modelo de Datos

### Estructura de `flake.nix` (Nix Declarativo)
```nix
{
  description = "Development environment for Blog Personal Calevin";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSupportedSystem = f: nixpkgs.lib.genAttrs supportedSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      devShells = forEachSupportedSystem ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
          ];
        };
      });
    };
}
```

### Contrato de Scripts en `package.json`
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "typecheck": "tsc --noEmit",
    "test": "npm run check && npm run typecheck && npm run build"
  }
}
```

## 4. Decisiones Técnicas Justificadas

- **Decisión 1:** Implementación de `flake.nix` usando funciones nativas de `nixpkgs.lib` en lugar de dependencias externas como `flake-utils`.
  - *Alternativa descartada:* Incorporar `github:numtide/flake-utils`.
  - *Motivo:* Minimiza los inputs del flake, previene descargas adicionales innecesarias y reduce la latencia en entornos aislados.
- **Decisión 2:** Estructura de `test` como pipeline estricto (`npm run check && npm run typecheck && npm run build`).
  - *Alternativa descartada:* Ejecutar únicamente `astro build`.
  - *Motivo:* `astro build` puede tolerar advertencias o tipos no estrictos en código auxiliar; la conjunción con `astro check` y `tsc --noEmit` garantiza el cumplimiento de la ley de tipos establecida en `docs/constitution.md`.

## 5. Secuencia de Tareas Atómicas (TDD)

- [ ] **T1. Crear `flake.nix` y actualizar `.gitignore`** (`RF-01`, `RNF-01`)
  - _Archivos:_ `flake.nix`, `.gitignore`
  - _Hecho cuando:_ Los comandos `CHK-01` y `CHK-98` devuelven exit code `0`.
- [ ] **T2. Configurar integración de shell `.envrc`** (`RF-02`)
  - _Archivos:_ `.envrc`
  - _Hecho cuando:_ El comando `CHK-02` devuelve exit code `0`.
- [ ] **T3. Incorporar scripts de verificación determinista en `package.json`** (`RF-03`, `RF-07`)
  - _Archivos:_ `package.json`
  - _Hecho cuando:_ Los comandos `CHK-03` y `CHK-07` devuelven exit code `0`.
- [ ] **T4. Instalar dependencias de desarrollo y validar tipos** (`RF-04`)
  - _Archivos:_ `package.json`, `package-lock.json`
  - _Hecho cuando:_ El comando `CHK-04` devuelve exit code `0`.
- [ ] **T5. Ejecutar la compilación estática y verificar suite completa** (`RF-05`, `RF-06`, `GLOBAL`)
  - _Archivos:_ `dist/`
  - _Hecho cuando:_ Los comandos `CHK-05`, `CHK-06` y `CHK-99` devuelven exit code `0`.
