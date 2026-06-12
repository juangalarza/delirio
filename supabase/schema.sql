-- ============================================================
-- Delirio Gin — Supabase Schema
-- Idempotente: seguro de re-ejecutar
-- ============================================================

-- ─── Extensiones ─────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Enum de estado de orden (idempotente) ───────────────────
do $$ begin
  create type order_status as enum ('pending', 'paid', 'rejected');
exception when duplicate_object then null;
end $$;

-- ─── Tabla: products ─────────────────────────────────────────
create table if not exists products (
  id               integer     primary key,
  slug             text        not null unique,
  name             text        not null,
  description      text        not null default '',
  long_description text        not null default '',
  price            integer     not null,          -- ARS, sin decimales
  abv              text        not null default '',
  image            text        not null default '',
  stock            integer     not null default 0,
  active           boolean     not null default true,
  created_at       timestamptz not null default now()
);

-- ─── Tabla: orders ───────────────────────────────────────────
create table if not exists orders (
  id               uuid         primary key default gen_random_uuid(),
  user_id          uuid         references auth.users(id) on delete set null,
  email            text         not null,
  status           order_status not null default 'pending',
  subtotal         integer      not null,    -- ARS
  shipping_cost    integer      not null,    -- ARS
  total            integer      not null,    -- ARS
  contact          jsonb        not null default '{}',  -- { nombre, telefono }
  shipping_address jsonb        not null default '{}',  -- { calle, ciudad, provincia, codigoPostal }
  mp_payment_id    text,
  created_at       timestamptz  not null default now()
);

create index if not exists orders_email_idx    on orders (email);
create index if not exists orders_user_id_idx  on orders (user_id);
create index if not exists orders_status_idx   on orders (status);

-- ─── Tabla: order_items ──────────────────────────────────────
create table if not exists order_items (
  id          uuid    primary key default gen_random_uuid(),
  order_id    uuid    not null references orders(id) on delete cascade,
  product_id  integer not null,
  name        text    not null,
  price       integer not null,   -- precio al momento de la compra
  qty         integer not null check (qty > 0)
);

create index if not exists order_items_order_id_idx on order_items (order_id);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table products    enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

-- ─── products ────────────────────────────────────────────────
drop policy if exists "products_public_read"       on products;

create policy "products_public_read"
  on products for select
  using (active = true);

-- ─── orders ──────────────────────────────────────────────────
drop policy if exists "orders_insert_anon"         on orders;
drop policy if exists "orders_select_owner"        on orders;

-- Cualquiera puede insertar (checkout sin login)
create policy "orders_insert_anon"
  on orders for insert
  with check (true);

-- El dueño ve sus propias órdenes.
-- auth.uid() para usuarios autenticados; auth.email() para anónimos con sesión de email.
create policy "orders_select_owner"
  on orders for select
  using (
    auth.uid() = user_id
    or auth.email() = email
  );

-- ─── order_items ─────────────────────────────────────────────
drop policy if exists "order_items_insert_anon"    on order_items;
drop policy if exists "order_items_select_owner"   on order_items;

create policy "order_items_insert_anon"
  on order_items for insert
  with check (true);

create policy "order_items_select_owner"
  on order_items for select
  using (
    exists (
      select 1
      from   orders o
      where  o.id = order_items.order_id
        and  (
          auth.uid()   = o.user_id
          or auth.email() = o.email
        )
    )
  );

-- ============================================================
-- Seed: productos iniciales (sincronizado con constants.ts)
-- ============================================================

insert into products (id, slug, name, description, long_description, price, abv, image, stock, active)
values
  (
    1, 'london-dry', 'LONDON DRY',
    'Nuestra expresión más pura. Enebro intenso con notas cítricas de pomelo y un final especiado de pimienta rosa.',
    'La expresión más clásica de Delirio. Destilado en alambique de cobre con 12 botánicos seleccionados de la precordillera sanjuanina. El enebro domina desde el primer sorbo, seguido por notas cítricas brillantes de pomelo y limón, con un cierre especiado de pimienta rosa y cardamomo.',
    20000, '43%', '/images/generated-1778549057530.png', 50, true
  ),
  (
    2, 'roble-frances', 'ROBLE FRANCÉS',
    'Destilado reposado en barricas de roble, con matices de vainilla y especias.',
    'Nuestro gin más complejo e introspectivo. Reposado en barricas de roble francés durante tres meses, adquiere profundidad y redondez únicas. Los botánicos ceden protagonismo gradualmente a notas cálidas de vainilla, canela y fruta seca.',
    24000, '43%', '/images/generated-1778549058690.png', 50, true
  ),
  (
    3, 'montana-floral', 'MONTAÑA FLORAL',
    'Infusión de hierbas andinas y flores silvestres de la precordillera.',
    'Inspirado en la flora de la precordillera andina. Una cuidada selección de flores silvestres — lavanda de altura, rosa mosqueta y violeta — se combina con hierbas aromáticas para crear un destilado delicado y expresivo.',
    22000, '40%', '/images/generated-1778549057001.png', 50, true
  ),
  (
    4, 'individual-botanicos', 'INDIVIDUAL + BOTÁNICOS',
    'El set perfecto de destilación artesanal que incluye botella de 750ml con infusión de enebro y mix de botánicos desérticos.',
    'El set definitivo para los apasionados del gin artesanal. Incluye nuestra botella London Dry de 750ml junto a un estuche de seis botánicos desérticos seleccionados a mano: enebro, cardamomo, cáscara de naranja seca, orquídea de montaña, cilantro y pimienta blanca.',
    26000, '43%', '/images/generated-1778549072341.png', 30, true
  ),
  (
    5, 'box-4-en-1', 'BOX 4 EN 1',
    'Exclusiva selección de miniaturas de la destilería. 4 botellas combinadas en un empaque de roble premium.',
    'La colección completa en un empaque de roble premium. Cuatro miniaturas de 200ml — London Dry, Roble Francés, Montaña Floral y Negroni — presentadas en un estuche de madera artesanal con relieves dorados.',
    38000, '43%', '/images/generated-1778549076048.png', 20, true
  ),
  (
    6, 'negroni-750ml', 'NEGRONI 750ml',
    'Elaborado bajo receta tradicional con nuestro gin de barrica de roble, vermut dulce de la casa y bitter alpino.',
    'El Negroni de Delirio: elaborado bajo receta tradicional italiana con nuestro gin de barrica de roble, vermut dulce de producción propia y bitter alpino de hierbas andinas. Embotellado listo para servir, en su punto exacto de dilución.',
    29000, '25%', '/images/generated-1778549078456.png', 30, true
  )
on conflict (id) do update set
  slug             = excluded.slug,
  name             = excluded.name,
  description      = excluded.description,
  long_description = excluded.long_description,
  price            = excluded.price,
  abv              = excluded.abv,
  image            = excluded.image,
  active           = excluded.active;
