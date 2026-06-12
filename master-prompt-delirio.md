# MASTER PROMPT — Delirio Gin: Feedback del cliente + Circuito Ecommerce Completo

Estás trabajando sobre el repositorio `delirio` (Next.js App Router + TypeScript + Tailwind v4 + Framer Motion + Supabase + MercadoPago + Resend + OCA). Lee `AGENTS.md` y la documentación de Next.js en `node_modules/next/dist/docs/` antes de tocar código.

El trabajo tiene dos fases. Ejecutalas en orden y commiteá por fase.

---

## FASE 1 — Cambios solicitados por el cliente

### 1.1 Rediseño cromático: blanco como color principal

El sitio hoy usa fondo oscuro (`#0C0C0C`) con acento dorado (`#C5A059`). El cliente quiere **blanco como color principal**. Invertí el esquema completo manteniendo la estética premium/lujo:

- En `src/app/globals.css`, bloque `@theme`: cambiar `--color-background` a `#FFFFFF`, `--color-foreground` a un negro suave (`#111111` o `#0C0C0C`). Mantener el dorado `#C5A059` como color de acento (`--color-primary`) — funciona perfecto sobre blanco para el look premium.
- Reemplazar los `bg-[#0C0C0C]` hardcodeados en `src/app/page.tsx`, `src/app/destilados/page.tsx` y cualquier otra página.
- Auditar TODOS los componentes (`Hero`, `StatsBanner`, `Manifesto`, `Collection`, `B2B`, `Rewards`, `Contact`, `Footer`, `Navbar`, `Orbs`, login, register) y migrar:
  - `text-white` / `text-white/XX` → `text-foreground` / opacidades oscuras equivalentes
  - `border-white/XX` → `border-black/XX` o `border-border`
  - Gradientes `from-black` en cards de producto: revisar contraste; si las fotos de producto son oscuras, las cards pueden mantener interior oscuro como elemento de contraste deliberado, pero el fondo general de página, secciones y navbar debe ser blanco.
  - Clase `.glass`: ajustar para que funcione sobre fondo claro (blur con tinte claro, borde sutil oscuro).
  - `Orbs.tsx`: bajar opacidad o adaptar los colores para que no ensucien el fondo blanco.
  - Hero: el overlay `bg-black/50` sobre la imagen puede quedarse (es sobre foto), pero verificar legibilidad del texto.
- Verificar contraste AA en todos los textos sobre blanco.

### 1.2 Eliminar referencias a "cava"

El cliente no quiere que el flujo de login/registro hable de "cava". Reemplazar:

- `src/app/login/page.tsx` línea ~119: "Acceso verificado. Redirigiendo a tu cava privada..." → **"Acceso verificado. Redirigiendo a tu cuenta..."**
- `src/app/login/page.tsx` línea ~194: botón "INGRESAR A LA CAVA" → **"INGRESAR"**
- `src/app/register/page.tsx` línea ~149: "Accediendo a la cava premium de Delirio..." → **"Creando tu cuenta en Delirio..."**
- Hacer un grep global de "cava" por si hay más ocurrencias.

### 1.3 Eliminar la medalla del costado del Hero

En `src/components/Hero.tsx` hay un bloque "Trust Badge" (motion.div absolute top-right con la imagen `/images/medalla gwa-2026.png`). **Eliminar el bloque completo** (el `motion.div` con la `Image` de la medalla). No eliminar la sección Rewards/Distinciones de la home — solo la medalla flotante del Hero.

### 1.4 Nueva sección "Esencia"

Agregar una sección **ESENCIA** en la home, antes del Manifesto (Filosofía), con el mismo lenguaje visual (label con tracking amplio + texto serif grande). Texto exacto del cliente:

> Delirio es una destilería que desafía lo convencional, creando destilados con calidad reconocida mundialmente e identidad propia que brindan experiencias únicas.

Crear `src/components/Esencia.tsx` siguiendo el patrón de `Manifesto.tsx` e importarla en `src/app/page.tsx` entre `StatsBanner` y `Manifesto`.

### 1.5 Reemplazar texto de Filosofía

En `src/components/Manifesto.tsx`, reemplazar la cita actual ("Delirio es un viaje...") por el texto exacto del cliente:

> En Delirio creemos que cada destilado debe contar una historia. Nos impulsa la pasión por crear experiencias auténticas, combinando tradición artesanal, innovación y carácter para ofrecer productos que inspiren y sorprendan en cada copa.

Mantener el label "NUESTRA FILOSOFÍA" y el estilo existente.

### 1.6 ABV variable por producto

El `StatsBanner` muestra "ABV 43%" como dato global, pero los productos tienen graduaciones distintas. Cambios:

1. En `src/components/StatsBanner.tsx`: eliminar el stat `{ label: 'ABV', value: 43, suffix: '%' }` y reemplazarlo por otro dato (ej. `{ label: 'BOTÁNICOS', value: 12, suffix: '+' }` — confirmar valor con el cliente, dejar comentario `// TODO: confirmar valor`).
2. En `src/lib/constants.ts`: agregar campo `abv: string` a cada producto (ej. `abv: '43%'` — usar placeholders razonables 40–47% con comentario `// TODO: confirmar ABV real con cliente`).
3. Mostrar el ABV en las cards de `Collection.tsx` y `destilados/page.tsx` (badge pequeño junto al nombre o precio, ej. "43% VOL").

---

## FASE 2 — Circuito ecommerce completo (estilo WooCommerce)

Las libs ya existen: `lib/mercadopago.ts` (crea preferencias con back_urls a `/checkout/success|failure|pending`), `lib/supabase.ts`, `lib/resend.ts` (email de confirmación), `lib/oca.ts` (stub de envíos). El navbar tiene un texto "CARRITO" sin funcionalidad. Construir:

### 2.1 Estado global del carrito

- Crear store con **Zustand** (`src/store/cart.ts`) con persistencia en localStorage: items (id, slug, name, price numérico, image, abv, qty), `addItem`, `removeItem`, `updateQty`, `clearCart`, selectores de subtotal y cantidad total.
- **Refactor de precios**: en `constants.ts` los precios son strings (`'$20.000'`). Migrar a `price: number` (ej. `20000`) + helper `formatPrice()` con `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })`. Actualizar todos los componentes que rendericen precio.
- Agregar `slug` e `id` a cada producto en `constants.ts`.

### 2.2 Cart Drawer + página de carrito

- `src/components/CartDrawer.tsx`: panel deslizante desde la derecha (Framer Motion), lista de items con thumbnail, controles de cantidad +/-, eliminar, subtotal, CTA "FINALIZAR COMPRA" → `/checkout` y link "ver carrito" → `/carrito`.
- Navbar: el texto "CARRITO" pasa a ser botón que abre el drawer, con badge contador de items.
- `src/app/carrito/page.tsx`: vista completa del carrito (tabla de items, resumen de orden, estado vacío con CTA a `/destilados`).
- Botones "VER PRODUCTO" de las cards pasan a tener también "AGREGAR AL CARRITO" con feedback visual (toast o animación).

### 2.3 Página de producto individual

- `src/app/destilados/[slug]/page.tsx`: imagen grande, nombre, ABV, descripción extendida, precio, selector de cantidad, "AGREGAR AL CARRITO", sección "También te puede interesar" con otros productos.
- Linkear las cards de `Collection.tsx` y `/destilados` a esta página.

### 2.4 Checkout

- `src/app/checkout/page.tsx`: formulario en pasos o single-page con: datos de contacto (email, nombre, teléfono), dirección de envío (calle, ciudad, provincia, CP), método de envío (integrar `OCAService.calculateShipping` — si sigue en stub, mostrar tarifa plana con TODO), resumen de orden, y botón "PAGAR CON MERCADO PAGO".
- `src/app/api/checkout/route.ts` (route handler POST): valida items contra `constants.ts`/Supabase (nunca confiar en precios del cliente), crea la orden en Supabase con estado `pending`, llama a `MercadoPagoService.createPreference` con `external_reference = orderId`, devuelve `init_point` y redirige.

### 2.5 Páginas de retorno de pago

Las back_urls ya configuradas en `mercadopago.ts` exigen estas tres páginas:

- `src/app/checkout/success/page.tsx` — **"¡Gracias por tu compra!"**: número de orden, resumen, mensaje de email enviado, CTA "Seguir explorando". Limpiar el carrito al montar.
- `src/app/checkout/failure/page.tsx` — pago rechazado, CTA reintentar (volver a `/checkout` con carrito intacto).
- `src/app/checkout/pending/page.tsx` — pago pendiente (ej. transferencia), explicación de qué sigue.

### 2.6 Webhook de MercadoPago

- `src/app/api/webhooks/mercadopago/route.ts`: recibe notificación IPN/webhook, consulta el pago en MP, actualiza la orden en Supabase (`approved` / `rejected` / `pending`), y si fue aprobado dispara `EmailService.sendConfirmation`. Validar firma del webhook si está disponible.

### 2.7 Esquema Supabase

Generar archivo `supabase/schema.sql` con tablas: `products` (id, slug, name, description, price, abv, image, stock, active), `orders` (id, user_id nullable, email, status, subtotal, shipping_cost, total, shipping_address jsonb, mp_payment_id, created_at), `order_items` (order_id, product_id, name, price, qty). RLS: lectura pública de products activos; orders solo accesibles por su dueño o service role.

### 2.8 Mi cuenta

- `src/app/cuenta/page.tsx`: requiere sesión Supabase (redirigir a `/login` si no hay), muestra datos del usuario e historial de pedidos con estado.
- `src/app/cuenta/pedidos/[id]/page.tsx`: detalle de pedido (items, totales, estado, dirección).
- Login/register: tras autenticar, redirigir a `/cuenta`.

### 2.9 Páginas complementarias del circuito

- **Age gate**: modal de verificación +18 al primer ingreso (cookie/localStorage), obligatorio para venta de alcohol en Argentina. Diseño acorde a la marca.
- `src/app/terminos/page.tsx`, `src/app/privacidad/page.tsx`, `src/app/envios/page.tsx`, `src/app/devoluciones/page.tsx`: páginas legales con contenido placeholder estructurado (TODO: validar textos con cliente). Linkear desde el Footer (hoy todos los links están en `#`).
- `src/app/not-found.tsx`: 404 personalizada con la estética de la marca.

### 2.10 Detalles transversales

- Metadata SEO por página (`generateMetadata`): título, descripción, OG image.
- Todos los textos de UI en español (es-AR).
- Responsive mobile-first en todo lo nuevo.
- Mantener la estética actualizada de la Fase 1 (fondo blanco, acento dorado, tipografía serif para títulos).
- `npm run build` debe pasar sin errores ni warnings de tipos al final.

---

## Orden de ejecución sugerido

1. Fase 1 completa → commit `feat: feedback cliente ronda 1 (paleta blanca, esencia, filosofia, abv, sin cava ni medalla)`
2. Refactor de precios + store de carrito + drawer → commit
3. Página de producto + página carrito → commit
4. Checkout + API + páginas de retorno + webhook → commit
5. Schema Supabase + Mi cuenta → commit
6. Age gate + legales + 404 + SEO → commit

## Variables de entorno necesarias (verificar `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
MERCADOPAGO_ACCESS_TOKEN=
NEXT_PUBLIC_APP_URL=
RESEND_API_KEY=
```
