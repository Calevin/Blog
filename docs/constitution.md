# Constitución del Proyecto — Blog Personal Calevin (The Personal Manual)

> **Ley Suprema (`seb-harness`):** Este documento define los principios innegociables del proyecto. Toda especificación (`*_spec.md`), plan (`*_plan.md`), verificador (`*_verificador.md`) e implementación debe cumplirlos estrictamente.

## A. Naturaleza del Proyecto

- **Propósito y Misión:** Archivo técnico y blog de desarrollo de software bajo la estética industrial "The Personal Manual", inspirada en el "Semiotic Standard" de Ron Cobb (*Alien*). Ofrece notas de ingeniería de software, arquitectura de sistemas, Linux/NixOS, configuración de servidores e inteligencia artificial.
- **Usuarios / Consumidores:** Lectores web técnicos, ingenieros de software y visitantes interesados en análisis técnicos directos y sin adornos innecesarios.
- **Tipo de Sistema y Alcance:** Sitio estático de alto rendimiento generado mediante Astro (SSG), empaquetado en contenedor Docker con servidor web Nginx y expuesto mediante reverse proxy Caddy (`http://blog.calevin.com`). El alcance cubre frontend estático, colecciones de contenido MDX/Markdown y tipografía/estilos industriales.

## B. Stack Tecnológico (Reglas de Implementación)

- **Lenguaje y Runtime:** Node.js (>=22.12.0) sobre Linux NixOS / contenedor Alpine (`node:25.9.0-alpine`).
- **Frameworks y Librerías Core:**
  - Astro (`astro` ^6.1.3) como generador de sitios estáticos.
  - Tailwind CSS v4 (`tailwindcss` ^4.2.2 y `@tailwindcss/vite` ^4.2.2) para el sistema de diseño.
  - Astro MDX (`@astrojs/mdx` ^5.0.3) para renderizado de contenido enriquecido.
  - Shiki como motor de resaltado de código sintáctico (tema `plastic`, ajuste de líneas habilitado).
  - TypeScript en modo estricto (`astro/tsconfigs/strict`).
- **Persistencia e Infraestructura:**
  - Contenido persistido en archivos Markdown/MDX dentro del repositorio (`src/content/blog/`).
  - Runtime de producción en contenedor Docker ligero (`nginx:alpine` con `absolute_redirect off`).
  - Orquestación local/servidor vía Docker Compose en red externa `caddy_net`.
- **Comandos Oficiales de Verificación Programática:**
  - **Compilación / Build:** `npm run build` (o en Nix: `nix-shell -p nodejs_22 --run "npm run build"`).
  - **Tests Unitarios / Validación de Tipos:** `npx tsc --noEmit` / validación del catálogo de contenido Astro.
  - **Linter / Análisis Estático:** Verificación de tipos TypeScript estricto y chequeo de integridad de contenido (`astro check` / `tsc --noEmit`).
- **Prohibiciones de Stack:**
  - Prohibido añadir dependencias externas en tiempo de ejecución sin aprobación previa en la spec/plan.
  - Prohibido sustituir librerías existentes en el proyecto por alternativas equivalentes sin justificación documentada.
  - Prohibido incorporar frameworks cliente pesados (como React, Vue o Svelte) para renderizado general salvo islas estrictamente necesarias y aprobadas.

## C. Reglas de Dominio y Lógica de Negocio

- **Invariantes del Dominio:**
  - Todo artículo (`post`) debe categorizarse en una de las secciones oficiales: `01_INPUT`, `02_OUTPUT`, `03_MY_SERVER`, `04_MY_SETUP`, `05_IA`.
  - El frontmatter de cada publicación debe cumplir obligatoriamente con el esquema Zod: `title` (string), `description` (string), `pubDate` (fecha en formato DD-MM-YYYY o DD/MM/YYYY con o sin hora) y opcionalmente `updatedDate`.
  - Los identificadores y slugs de URL deben ser deterministas y derivados de la estructura de archivos en `src/content/blog/`.
- **Fronteras de Datos y Consistencia:**
  - La integridad de las colecciones se valida programáticamente durante el build estático mediante `src/content.config.ts`.
  - Las fechas se normalizan de forma consistente a objetos `Date` ISO en tiempo de parsing.
- **Aislamiento de Lógica:**
  - La lógica de transformación y validación de datos de contenido debe residir exclusivamente en `src/content.config.ts` o módulos auxiliares puros, aislada de las plantillas y componentes visuales `.astro`.

## D. Estructura y Estilo de Código

- **Topología de Directorios:**
  - `src/content/blog/`: Artículos técnicos en Markdown y MDX organizados por posts.
  - `src/content.config.ts`: Configuración de colecciones y esquemas Zod.
  - `src/components/`: Componentes reutilizables de Astro (UI de navegación, fechas, tarjetas).
  - `src/components/mdx/`: Implementación de componentes tipográficos Neo-Brutalist para elementos HTML de Markdown (H1, H2, Pre, P, etc.).
  - `src/layouts/`: Plantilla maestra (`Layout.astro`) con TopAppBar, Sidebar y metadatos base.
  - `src/pages/`: Rutas del blog (`index.astro`, `[section]/index.astro`, `blog/[slug].astro`, `404.astro`).
  - `src/styles/`: Estilos globales y temas Tailwind (`global.css`).
  - `docs/`: Constitución del proyecto y documentación funcional de casos de uso (`docs/use-cases/`).
  - `specs/`: Ciclo de vida SDD (`*_spec.md`, `*_plan.md`, `*_verificador.md`).
- **Patrones Arquitectónicos:**
  - **Editorial Neo-Brutalism:**
    - Estructura rígida basada en el concepto "The Personal Manual".
    - Contenedores y componentes delimitados por bordes sólidos negros de 3px o 4px (`--color-neo-surface` / `#1b1c15`).
    - Sombras duras ("Hard Shadows") sin difuminado (`blur: 0px`, offset de 4px o 12px).
    - Paleta: fondo pergamino (`#fbfaee`), acento primario rojo industrial (`#b7102a`), secundarios (`#2a674c`, `#ffb702`).
    - Cero esquinas redondeadas: `rounded-none` / `border-radius: 0px` en todos los componentes.
  - **Tipografía:** Encabezados en Space Grotesk con espaciado denso (`tracking-[-0.02em]`), cuerpo en Inter, bloques de código en fuentes monoespaciadas (JetBrains Mono / Fira Code).
- **Convenciones de Nomenclatura e Idioma:**
  - Nomenclatura técnica, variables, funciones, clases, componentes y nombres de archivo en inglés.
  - Comentarios explicativos en el código fuente estrictamente en español.
  - Artículos y contenido editorial redactados en español.
  - Prohibido de forma absoluta el uso de emojis dentro de archivos o bloques de código fuente.
- **Prohibiciones de Diseño:**
  - Prohibido el uso de bordes redondeados (`border-radius > 0px`).
  - Prohibido el uso de sombras ambientales o degradados difusos (`box-shadow` con blur > 0px).
  - Prohibido el uso de divisores delgados (1px) o separadores de bajo contraste.

## E. Manejo de Errores y Validaciones

- **Estrategia de Errores:**
  - Detección temprana y fallos duros en tiempo de compilación ante esquemas de contenido inválidos.
  - Enrutamiento a página 404 personalizada (`src/pages/404.astro`) para URLs no encontradas, conservando la identidad Neo-Brutalist.
- **Validación de Entradas:**
  - Esquema Zod exhaustivo en `src/content.config.ts` para todo contenido Markdown/MDX entrante.
- **Observabilidad y Seguridad:**
  - No exponer variables de entorno sensibles o datos privados en el bundle cliente estático.
  - Configuración de cabeceras de proxy (`X-Forwarded-Proto https`) y redirección segura delegadas a Caddy y Nginx.

## F. Comportamiento del Agente de IA (Reglas SDD — `seb-harness`)

1. **La Spec Manda:** Ninguna funcionalidad se implementa sin un archivo `specs/<NNN>_<tarea>_spec.md` aprobado y sin etiquetas `[NECESITA ACLARACIÓN]`.
2. **Testabilidad Programática Obligatoria:** Ningún plan (`specs/<NNN>_<tarea>_plan.md`) es válido sin su correspondiente `specs/<NNN>_<tarea>_verificador.md` con comandos que devuelvan código de salida `0`.
3. **Anti-Reward-Hacking:** Está terminantemente prohibido modificar `docs/constitution.md`, `specs/*_spec.md` o `specs/*_verificador.md` durante la implementación, así como deshabilitar o relajar tests para forzar que pasen.
4. **Memoria Persistente (`MEMORY.md`):** Antes de planificar o codificar, el agente debe consultar `MEMORY.md` para evitar callejones sin salida ya documentados, y registrar allí cualquier nueva limitación técnica descubierta.
5. **Commits Protegidos:** Todo commit de código debe pasar la puerta determinista `.seb/bin/seb verify <tarea>`.
