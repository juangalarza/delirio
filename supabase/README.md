# Supabase — Setup

## 1. Ejecutar el schema

En el **SQL Editor** de tu proyecto Supabase, pegá y ejecutá `schema.sql`.

Crea:
- Tabla `products` (con seed de los 6 productos)
- Tabla `orders`
- Tabla `order_items`
- RLS policies para cada tabla

## 2. Variables de entorno

En `.env.local`:

```env
# Supabase (claves en Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # solo server-side

# MercadoPago (clave en tu cuenta MP)
MERCADOPAGO_ACCESS_TOKEN=<access-token>
MERCADOPAGO_WEBHOOK_SECRET=<webhook-secret>    # opcional, activa validación de firma

# URL pública de la app (para back_urls de MP)
NEXT_PUBLIC_APP_URL=https://deliriogin.com

# Resend (para emails de confirmación)
RESEND_API_KEY=<resend-api-key>
```

## 3. Webhook MercadoPago

En tu panel MP → Configuración → Webhooks, registrá:

```
URL: https://deliriogin.com/api/webhooks/mercadopago
Eventos: Pagos (payment)
```

Copiá el `secret` generado y ponelo en `MERCADOPAGO_WEBHOOK_SECRET`.

## 4. Estructura de tablas

| Tabla | Descripción |
|-------|-------------|
| `products` | Catálogo. Se actualiza con `on conflict do update` al re-ejecutar el seed. |
| `orders` | Una fila por compra. `status`: `pending` → `paid` / `rejected` vía webhook. |
| `order_items` | Líneas de la orden. Cascaded delete con la orden. |

## RLS summary

| Tabla | Anon | Usuario autenticado |
|-------|------|---------------------|
| `products` | SELECT (solo activos) | igual |
| `orders` | INSERT | INSERT + SELECT (propias) |
| `order_items` | INSERT | INSERT + SELECT (de sus órdenes) |

El service role (usado en API routes server-side) bypasea RLS por defecto en Supabase.
