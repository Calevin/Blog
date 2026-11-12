/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Declaracion de modulo para permitir la importacion de componentes Astro en archivos TypeScript
declare module '*.astro' {
  const component: (props: any) => any;
  export default component;
}
