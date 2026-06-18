# Master Prompt — Optimización de Performance: Delirio Gin
**Sitio:** https://delirio-one.vercel.app/  
**Stack:** Next.js (App Router) + Tailwind CSS + Vercel  
**Fecha del análisis:** 17 Jun 2026  
**Score actual:** Performance 70/100 | SEO 100 | Best Practices 100 | Accessibility 94

---

## Contexto para el agente

Sos un experto en performance web con Next.js 14+ (App Router). Tu tarea es optimizar el sitio de Delirio Gin para llevar el score de Lighthouse Performance de **70 a 90+**, sin romper estilos ni funcionalidad existente. El análisis Lighthouse detectó los siguientes problemas, ordenados por impacto:

---

## PROBLEMA 1 — Total Blocking Time: 990ms (CRÍTICO — Score 5/100)

**Causa raíz:** El main thread está bloqueado por 3.0 segundos totales, divididos en:
- "Other" / tareas no atribuidas: **1795ms**
- Script Evaluation: **467ms**
- Style & Layout: **447ms**
- Rendering/Compositing: **210ms**
- Script Parse & Compile: **50ms**

Hay 2 long tasks de ~555ms cada una marcadas como "Unattributable" (probablemente animaciones CSS, scroll listeners o efectos sin `will-change`).

**Acciones a implementar:**

1. **Auditar todos los `useEffect` del proyecto.** Mover cualquier lógica pesada a `requestIdleCallback` o `setTimeout(..., 0)`:
```js
useEffect(() => {
  const id = requestIdleCallback(() => {
    // lógica pesada: analytics, observers, etc.
  });
  return () => cancelIdleCallback(id);
}, []);
```

2. **Revisar animaciones CSS/Framer Motion.** Asegurarse de que todo lo que anime use solo `transform` y `opacity`. Agregar `will-change: transform` a elementos con animaciones continuas. Evitar animar `height`, `width`, `top`, `left` o propiedades que disparen layout.

3. **Lazy load de componentes pesados** que no estén en el viewport inicial:
```js
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div className="skeleton" />,
});
```

4. **Eliminar o diferir cualquier librería de animación** no crítica en el primer render (Framer Motion, GSAP, etc.). Si se usa Framer Motion, importar solo los componentes necesarios: `import { motion } from 'framer-motion'` → `import { motion } from 'framer-motion/react'` (solo en client components necesarios).

---

## PROBLEMA 2 — Hero Image: 110 KiB desperdiciados (Score 0/100)

**Causa raíz:** La imagen hero `hero-delirio.jpg` pesa **241 KB** transferidos y Lighthouse detecta **112 KB desperdiciados** por compresión insuficiente. Además está sirviendo un JPG en lugar de WebP/AVIF.

**Ruta de la imagen:** `/public/images/hero-delirio.jpg`

**Acciones a implementar:**

1. **Convertir la imagen hero a WebP con calidad optimizada:**
```bash
# Usando sharp o squoosh CLI
npx @squoosh/cli --webp '{"quality":75}' public/images/hero-delirio.jpg
# Guardar como hero-delirio.webp
```

2. **Actualizar el componente hero** para usar el componente `<Image>` de Next.js correctamente con prioridad:
```jsx
import Image from 'next/image';

// En el componente Hero:
<Image
  src="/images/hero-delirio.webp"
  alt="Vista de la destilería Delirio entre los cerros de Zonda, San Juan, Argentina"
  fill
  priority          // ← crítico: es LCP, siempre priority={true}
  quality={75}
  sizes="100vw"
  className="object-cover"
/>
```

3. **Verificar que `priority` esté en TRUE** para el hero (es el elemento LCP). Sin `priority`, Next.js lo lazy-loadea y penaliza el LCP.

4. **Bajar la calidad del favicon** `/public/images/favicon.png` que pesa **177 KB** (es excesivo para un favicon). Convertirlo a `.ico` de 32x32 o WebP de 64x64px. El favicon no debería superar 5-10 KB.
```js
// En app/layout.tsx:
export const metadata = {
  icons: {
    icon: '/favicon.ico', // versión comprimida
  }
}
```

---

## PROBLEMA 3 — CSS Render-Blocking (Score 0.5/100)

**Causa raíz:** Dos archivos CSS están bloqueando el renderizado inicial:
- `0fxfzagdy4_jf.css` — **13.8 KB** (CSS principal de Tailwind)
- `0~6rl58.gi6b7.css` — **1.1 KB** (CSS secundario)

La cadena de red más larga es: HTML (178ms) → CSS principal (296ms total). Nada puede renderizar hasta que el CSS esté descargado y procesado.

**Acciones a implementar:**

1. **Habilitar `optimizeCss` en Next.js** (experimental, usa Critters para inline del CSS crítico):
```js
// next.config.js / next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
};
```

2. **Asegurar que Tailwind purgue agresivamente** en producción. Verificar el `content` del `tailwind.config.js`:
```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // asegurarse que NO hay paths extras que aumenten el CSS generado
}
```

3. **No importar CSS de terceros en el layout raíz** sin necesidad. Si se importa algún CSS global extra (de librerías UI, fuentes, etc.), evaluar si se puede mover a lazy load.

---

## PROBLEMA 4 — JavaScript Bundle Pesado con mucho código sin usar

**Causa raíz:** 15 chunks de JS con alto porcentaje de código no utilizado en el primer load:
- `01.9_z08ecm2z.js`: 222 KB total, **79.7 KB sin usar (36%)**
- `0kvx00wa8f.0c.js`: 147 KB total, **68.2 KB sin usar (46%)**
- `0yw28b.6bhldr.js`: 122 KB total, **68.2 KB sin usar (56%)**
- `0qc1sqmhdir1o.js`: 54 KB total, **46.6 KB sin usar (86%)**
- `00xu5rw__q86c.js`: 43 KB total, **36.5 KB sin usar (84%)**

**Acciones a implementar:**

1. **Auditar imports de librerías.** Buscar en todo el proyecto imports de librerías pesadas que se usen parcialmente (iconos, animaciones, UI kits) y reemplazar por imports específicos:
```js
// MAL — importa todo
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// BIEN — solo lo que usás
import { motion } from 'framer-motion/react';
```

2. **Revisar si hay librerías duplicadas** en el bundle. Correr `npx @next/bundle-analyzer`:
```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({ /* tu config */ });
// Luego: ANALYZE=true npm run build
```

3. **Mover componentes interactivos a `'use client'` solo donde sea necesario.** En App Router, todo es Server Component por default. Si un componente no necesita estado/eventos, eliminar `'use client'`.

4. **Verificar si se usa alguna librería de carousel, slider o galería** (Swiper, Embla, etc.) que podría estar sumando mucho JS. Si es así, lazy-loadearla.

---

## PROBLEMA 5 — Legacy JavaScript: polyfills innecesarios (Score 0.5/100)

**Causa raíz:** El chunk `01.9_z08ecm2z.js` incluye polyfills para APIs modernas que todos los browsers actuales ya soportan nativamente:
- `Array.prototype.at`
- `Array.prototype.flat` / `flatMap`
- `Object.fromEntries`
- `Object.hasOwn`
- `String.prototype.trimStart` / `trimEnd`

**Ahorro estimado: 14 KB**

**Acciones a implementar:**

1. **Actualizar el target de browserslist** en `package.json` para apuntar a browsers modernos:
```json
// package.json
{
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions",
    "not dead",
    "> 0.5%"
  ]
}
```

2. **Verificar `tsconfig.json`** — el `target` debe ser `ES2020` o superior:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

3. Si se usa **SWC** (default en Next.js 13+), verificar que no haya configuración de Babel personalizada que fuerce downcompilation agresiva. Si existe un `babel.config.js` o `.babelrc`, revisar que `@babel/preset-env` no tenga un target muy antiguo.

---

## PROBLEMA 6 — Network Dependency Tree / Critical Request Chain

**Causa raíz:** La cadena crítica de requests es: `HTML → CSS` (296ms de bloqueo), y no hay ningún origen en preconnect. Lighthouse también indica "no origins were preconnected" y sugiere analizar candidatos.

**Acciones a implementar:**

1. **Identificar si se usan recursos de terceros** (Google Fonts, CDNs, APIs externas). Si existe algún `<link>` a Google Fonts u otro CDN externo en el layout, agregar preconnect:
```jsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Si usás Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Si usás imágenes de Cloudinary u otro CDN */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

2. **Verificar que la fuente actual** (`83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2`, 47 KB) esté en `/public` y se sirva localmente (ya parece estar en `/_next/static/media/`). Si es así, agregar `<link rel="preload">` para la fuente principal en el `<head>`:
```jsx
<link
  rel="preload"
  href="/_next/static/media/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

---

## RESUMEN DE IMPACTO ESPERADO

| Problema | Score actual | Impacto estimado | Prioridad |
|---|---|---|---|
| Total Blocking Time (990ms) | 5/100 | +15 puntos | 🔴 Crítica |
| Hero image sin optimizar (110KB wasted) | 0/100 | +8 puntos | 🔴 Alta |
| CSS render-blocking | 50/100 | +5 puntos | 🟠 Alta |
| JS bundle con código sin usar | — | +5 puntos | 🟠 Media |
| Legacy JavaScript polyfills | 50/100 | +3 puntos | 🟡 Media |
| Network dependency / preconnect | 0/100 | +2 puntos | 🟡 Baja |

**Score proyectado post-optimización: 88–95/100**

---

## ORDEN DE EJECUCIÓN RECOMENDADO

1. `priority={true}` en la imagen hero + convertir a WebP → cambio de 5 minutos, impacto inmediato en LCP
2. Comprimir favicon a < 5 KB → cambio de 2 minutos
3. Auditar `useEffect` y lazy load de componentes pesados → mayor impacto en TBT
4. Habilitar `optimizeCss: true` en next.config → 1 línea de config
5. Actualizar browserslist target para eliminar polyfills legacy
6. Analizar bundle con `@next/bundle-analyzer` y eliminar imports no usados
7. Agregar `rel="preload"` para la fuente principal

---

## NOTAS PARA EL AGENTE

- El sitio usa **Next.js con App Router** (se ve por la estructura `_next/static/chunks/` y el uso de `data-nimg="fill"`)
- El stack confirma **Tailwind CSS** (CSS de 13.8 KB típico de Tailwind compilado)
- El servidor responde en **80ms** — Vercel está bien configurado, no hay nada para optimizar en server-side
- LCP (1.0s) y FCP (0.5s) ya son buenos. El problema está 100% en el **client-side JavaScript**
- NO tocar configuraciones de Supabase, autenticación ni rutas API
- Después de cada cambio, hacer `npm run build && npx lighthouse https://delirio-one.vercel.app/ --only-categories=performance` para medir progreso
