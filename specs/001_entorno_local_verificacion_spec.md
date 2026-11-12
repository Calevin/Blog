# Spec 001 — Entorno Local Reproducible y Verificación Determinista

- **Tarea ID:** `001`
- **Identificador:** `entorno_local_verificacion`
- **Origen:** Prosa
- **Estado:** `APROBADA`

## 1. Contexto y Objetivo (El POR QUÉ)

El proyecto opera sobre un sistema Linux NixOS donde el runtime Node.js no se encuentra instalado en el `$PATH` global del host. Para garantizar la reproducibilidad absoluta y permitir que el evaluador determinista (`seb-harness`) ejecute comandos de verificación con códigos de salida confiables, es necesario disponer de un entorno declarativo aislado con soporte opcional para integración transparente vía shell, y de tareas estandarizadas en el gestor de paquetes para inspección estática, tipado, compilación y suite completa.

## 2. Actores y Usuarios

- **Desarrollador / Mantenedor:** Usuario técnico que requiere ingresar al entorno de desarrollo local con todas las dependencias del sistema resueltas de forma transparente y sin colisiones de dependencias globales.
- **Evaluador Determinista (`seb-harness`):** Agente o arnés computacional que ejecuta validaciones programáticas para certificar el estado del código sin intervención humana.

## 3. Historias de Usuario

- **HU-01:** Como desarrollador, quiero instanciar un entorno de desarrollo declarativo y aislado (con activación transparente mediante `direnv`) para disponer de las herramientas necesarias sin alterar la configuración global del sistema operativo anfitrión.
- **HU-02:** Como evaluador determinista, quiero invocar comandos estandarizados de validación de tipos (`typecheck`), diagnóstico (`check`), compilación (`build`) y suite global (`test`) para auditar la integridad del proyecto de forma reproducible con códigos de salida inequívocos (0 para éxito, distinto de 0 ante fallos).

## 4. Definiciones de Dominio

- **Entorno Declarativo:** Configuración inmutable y aislada donde las herramientas de compilación y ejecución se resuelven a partir de referencias herméticas sin mutar el perfil del usuario.
- **Verificación Determinista:** Proceso de inspección de código y artefactos cuya ejecución produce idénticos resultados y códigos de retorno dados los mismos insumos de entrada.

## 5. Requisitos Funcionales (Criterios de Aceptación en EARS)

- **RF-01 (Event-Driven):** CUANDO el desarrollador o el arnés active el entorno declarativo del repositorio, EL SISTEMA DEBE proveer el runtime de ejecución (Node.js en versión compatible >= 22) y su gestor de paquetes de forma hermética y reproducible.
- **RF-02 (Event-Driven):** CUANDO el entorno local cuente con la herramienta de shell automático (`direnv`), EL SISTEMA DEBE permitir la carga automática del entorno reproducible al ingresar al directorio raíz del proyecto.
- **RF-03 (Ubiquitous):** EL SISTEMA DEBE exponer tareas estandarizadas de diagnóstico del framework (`check`) y validación estricta de tipos (`typecheck`) que devuelvan código de salida 0 únicamente cuando no existan inconsistencias de tipado ni errores de esquema Zod.
- **RF-04 (Unwanted Behavior):** SI se detecta una inconsistencia de tipos o un esquema de contenido inválido durante la verificación estática, ENTONCES EL SISTEMA DEBE finalizar la ejecución con un código de retorno distinto de cero reportando los errores detectados en la salida de error.
- **RF-05 (Ubiquitous):** EL SISTEMA DEBE exponer una tarea estandarizada de compilación del sitio estático (`build`) que reporte código de salida 0 si y solo si todos los artefactos de producción son construidos satisfactoriamente.
- **RF-06 (Ubiquitous):** EL SISTEMA DEBE exponer una tarea estandarizada de verificación integral (`test`) que orqueste secuencialmente la validación estática y la compilación, retornando código de salida 0 únicamente si ambas etapas concluyen exitosamente.
- **RF-07 (Unwanted Behavior):** SI cualquiera de las etapas de la suite integral falla, ENTONCES EL SISTEMA DEBE interrumpir la cadena de ejecución y retornar de inmediato el código de error correspondiente.

## 6. Requisitos No Funcionales (Verificables)

- **RNF-01:** El entorno declarativo no debe requerir privilegios de superusuario (`root`) para su instanciación en la máquina anfitriona.
- **RNF-02:** Los comandos estandarizados de chequeo y compilación deben ser idempotentes y respetar la compatibilidad con el motor de ejecución especificado en la constitución del proyecto.

## 7. Casos Límite (Edge Cases)

- **CL-01 (Ausencia de binarios globales en el host):** El sistema debe resolver e instanciar el runtime completo en máquinas sin binarios de Node.js o npm en el `$PATH` del sistema.
- **CL-02 (Discrepancia en Frontmatter de Artículos):** La verificación de contenido debe atrapar campos faltantes o tipos incorrectos en los archivos MDX/Markdown antes de permitir la generación de artefactos finales.

## 8. Fuera de Alcance (Out of Scope)

- Integración de formateadores adicionales de código (e.g. Prettier con plugins) o linters cosméticos en esta iteración.
- Configuración de pipelines externos de CI/CD (GitHub Actions o equivalentes).
- Modificación del diseño visual, tipografía o maquetación del blog.
- Incorporación o edición de nuevos artículos de blog en `src/content/blog/`.

## 9. Criterios de Finalización (Definition of Done)

- Todos los requisitos (`RF-01` a `RF-07`) cuentan con verificación programática en `[PASA]` ejecutada mediante `.seb/bin/seb verify entorno_local_verificacion`.
- Cero violaciones a `docs/constitution.md`.

## 10. Dudas Abiertas y Puntos por Clarificar

- Ninguna duda pendiente. (Requisitos clarificados y formalizados).
