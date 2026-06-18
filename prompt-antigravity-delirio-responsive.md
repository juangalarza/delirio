# PROMPT — Implementación Responsive (Mobile + Tablet) — Delirio Destilería

## Contexto
Este es el repo Next.js de **Delirio Destilería** (delirio-one.vercel.app). La versión desktop ya está aprobada por el cliente y es la fuente de verdad visual. Tu tarea es implementar los breakpoints **mobile** y **tablet** de TODOS los componentes existentes.

Adjunto un archivo de referencia (`delirio-mobile-tablet.html`) con la estructura y disposición sugerida para cada breakpoint. Úsalo como **guía de layout y jerarquía**, no como código a copiar literal — el sitio real es React/Next.js y debe seguir usando sus propios componentes, no HTML estático.

## Regla principal — NO TOCAR EL CONTENIDO NI LOS COMPONENTES
- No agregues componentes nuevos.
- No elimines componentes existentes.
- No cambies el orden de las secciones: Header → Hero → Stats bar (Botánicos/Destilados/Artesanal/Premios) → Filosofía → Destilados/Colección → CTA Revendedor → Premios/Reconocimiento Internacional → Contacto → Footer.
- No reescribas copys, textos, labels ni microcopy. El texto en mobile/tablet debe ser idéntico al de desktop, solo cambia cómo se acomoda visualmente.
- No reemplaces ni reduzcas imágenes. Todas las imágenes que existen en desktop (hero, foto de revendedor, medallas de premios, logo del footer) deben seguir presentes en mobile y tablet, en la misma calidad y mismo `src`, solo ajustando `width`/`height`/`object-fit` según el breakpoint.
- No cambies tipografías. Mantené exactamente las mismas familias ya usadas en desktop en todos los breakpoints. Solo se permite ajustar `font-size`, `line-height` y `letter-spacing` para que escalen bien en pantallas chicas — nunca cambiar la familia tipográfica ni el peso conceptual (qué elementos son display vs body).
- No cambies la paleta de colores (fondo blanco, texto oscuro, acento dorado/gold, líneas sutiles). La identidad visual debe ser 100% consistente entre desktop, tablet y mobile.

## Objetivo
La versión responsive debe ser un **reflejo fiel** de la versión desktop: mismo contenido, mismas imágenes, mismas fuentes, mismo tono visual — únicamente reorganizado para que funcione correctamente en pantallas chicas y medianas. Si alguien compara desktop vs mobile, debe sentir que es "el mismo sitio adaptado", no una versión distinta.

## Breakpoints a implementar
- **Mobile**: hasta 767px
- **Tablet**: 768px – 1023px
- Verificar que el breakpoint desktop existente (≥1024px) no se rompa con los cambios.

## Detalle componente por componente

### 1. Header
- Mobile: logo a la izquierda, ícono de menú hamburguesa a la derecha (sin texto de nav visible). Al tocar el hamburger, abrir un drawer/overlay fullscreen con los links de nav (Herencia, Destilados, Contacto, Carrito) en tipografía display grande, uno debajo del otro.
- Tablet: nav horizontal visible igual que desktop (Herencia / Destilados / Contacto / Carrito), ajustando solo espaciados.
- El botón de Carrito debe mantener su mismo comportamiento/funcionalidad en los tres breakpoints, solo cambia su representación visual si es necesario.

### 2. Hero
- La imagen de fondo (`hero-delirio.jpg`) se mantiene en los tres breakpoints, ajustando `object-fit: cover` para que no se recorte mal en mobile.
- Jerarquía idéntica: eyebrow ("Destilería artesanal de vanguardia") → H1 "Esencia" → párrafo descriptivo → CTA "Explorar".
- Reducir tamaño de fuente del H1 en mobile sin perder que sea el elemento dominante de la sección.
- El overlay/gradiente sobre la imagen debe mantenerse para legibilidad del texto en blanco.

### 3. Stats bar (Botánicos / Destilados / Artesanal / Premios)
- Desktop: 4 columnas en fila.
- Tablet: mantener 4 columnas en fila (solo ajustar padding).
- Mobile: pasar a grid 2x2, conservando los mismos 4 datos, mismo orden, mismos números y labels.

### 4. Filosofía
- Sección centrada con eyebrow + cita en tipografía display itálica. Mantener centrado y el mismo texto de la cita en los tres breakpoints, ajustando solo `font-size` y ancho máximo del bloque de texto.

### 5. Destilados / Colección
- Desktop: grid de productos en múltiples columnas.
- Tablet: grid de 2 columnas.
- Mobile: 1 columna, productos en stack vertical.
- Cada card de producto debe conservar exactamente los mismos elementos que en desktop: imagen de botella, nombre, ABV, descripción, precio, CTA de agregar al carrito — sin quitar ningún dato visible en desktop.
- Las imágenes de botella deben mantener su calidad/resolución, ajustando solo el tamaño del contenedor.

### 6. CTA Revendedor
- Imagen de fondo (`generated-1778549080715.png` o el asset real del repo) se mantiene en los tres breakpoints con overlay oscuro para legibilidad.
- Mismo copy: eyebrow "¿Tenés un negocio?" → H2 "Convertite en revendedor" → texto → botón "Solicitar información".
- En mobile, reducir altura mínima de la sección si es necesario, pero sin recortar el copy.

### 7. Premios / Reconocimiento Internacional
- Desktop: carrusel/grid de medallas.
- Tablet y mobile: convertir a **carrusel horizontal con scroll táctil** (snap scroll), mostrando las cards de medalla en fila con scroll lateral, sin perder ninguna medalla de las que están en desktop ni cambiar su orden.
- Cada card debe seguir mostrando: imagen de medalla, nombre del premio, detalle (puntaje/categoría), año/edición — igual que en desktop.

### 8. Contacto
- Desktop: layout en dos columnas (info de contacto + formulario) o el layout que ya exista.
- Tablet: mantener dos columnas si el ancho lo permite, o pasar a una columna con buen espaciado si el componente actual lo requiere — pero el formulario debe seguir teniendo los mismos 4 campos (Nombre completo, Correo electrónico, Asunto, Mensaje) y el mismo botón "Enviar mensaje".
- Mobile: una sola columna, primero el copy + info de contacto (dirección, email, teléfono/WhatsApp), después el formulario. Sin quitar ningún campo ni dato de contacto.

### 9. Footer
- Mantener logo, los 3 links sociales (Instagram, Facebook, WhatsApp), los 4 links legales (Términos y condiciones, Privacidad, Envíos, Devoluciones), el texto de advertencia ("Beber con moderación...") y el copyright — en los tres breakpoints, solo ajustando si van en fila o en columna según el ancho disponible.

## Checklist de validación antes de dar por terminado
- [ ] Ningún componente del desktop fue eliminado en mobile/tablet.
- [ ] Ningún componente nuevo fue agregado que no exista en desktop.
- [ ] Todas las imágenes de desktop siguen presentes y con el mismo `src` en mobile/tablet.
- [ ] El orden de las secciones es idéntico en los tres breakpoints.
- [ ] Todo el copy/texto es idéntico al de desktop (no se reescribió nada).
- [ ] La paleta de colores (blanco, texto oscuro, dorado, líneas sutiles) es la misma en los tres breakpoints.
- [ ] El menú mobile (hamburguesa) da acceso a los mismos links que el nav desktop.
- [ ] El carrusel de premios en mobile/tablet muestra todas las medallas que muestra desktop.
- [ ] El formulario de contacto tiene los mismos 4 campos en los tres breakpoints.
- [ ] Probado visualmente en al menos 375px (mobile), 768px (tablet) y 1024px+ (desktop) sin overflow horizontal ni elementos cortados.

