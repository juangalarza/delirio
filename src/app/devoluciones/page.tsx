import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

export const metadata: Metadata = {
  title: 'Política de Devoluciones — Delirio Destilería',
  description: 'Conocé las condiciones y el proceso de devolución y reembolso de Delirio Destilería.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[11px] tracking-[0.3em] font-condensed text-primary mb-4">{title}</h2>
      <div className="text-foreground/60 font-sans text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

export default function DevolucionesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.4em] text-primary font-condensed mb-2">POSTVENTA</p>
            <h1 className="text-3xl font-serif font-bold text-foreground uppercase tracking-widest">
              Política de Devoluciones
            </h1>
            <p className="text-foreground/30 font-sans text-xs mt-3">
              Última actualización: junio de 2025 {/* TODO: actualizar fecha con cliente */}
            </p>
          </div>

          <div className="w-full h-px bg-black/5 mb-10" />

          <Section title="1. PLAZO DE DEVOLUCIÓN">
            <p>
              Aceptamos devoluciones dentro de los <strong className="text-foreground/80">30 días corridos</strong> desde la fecha de entrega del pedido, siempre que se cumplan las condiciones detalladas en esta política.
            </p>
            {/* TODO: confirmar plazo con cliente */}
          </Section>

          <Section title="2. CONDICIONES PARA LA DEVOLUCIÓN">
            <p>Para poder procesar una devolución, el producto debe:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Estar en su embalaje original, sin abrir y sin daños.</li>
              <li>No haber sido consumido (parcial o totalmente).</li>
              <li>Incluir todos los accesorios y documentos originales.</li>
            </ul>
            <p className="text-foreground/40 text-xs mt-3">
              No aceptamos devoluciones de productos abiertos, consumidos o dañados por mal uso.
            </p>
          </Section>

          <Section title="3. CAUSAS VÁLIDAS PARA DEVOLUCIÓN">
            <p>Aceptamos devoluciones en los siguientes casos:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Producto recibido defectuoso o con daños de fábrica.</li>
              <li>Producto recibido diferente al solicitado (error de envío).</li>
              <li>Producto con fecha de vencimiento próxima (menos de 6 meses).</li>
              <li>Derecho de arrepentimiento según la Ley 24.240 de Defensa del Consumidor (solo para compras online, dentro de los 10 días hábiles de recibido el producto).</li>
            </ul>
          </Section>

          <Section title="4. PROCESO DE DEVOLUCIÓN">
            <p>Para iniciar una devolución, seguí estos pasos:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>
                Envianos un correo a{' '}
                <a href="mailto:devoluciones@deliriogin.com" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                  devoluciones@deliriogin.com
                </a>{' '}
                {/* TODO: confirmar email con cliente */}
                con tu número de pedido y el motivo de la devolución.
              </li>
              <li>En un plazo de 48 horas hábiles te confirmaremos si la devolución procede y te enviaremos instrucciones para el retiro del producto.</li>
              <li>Una vez que recibamos el producto y verificamos su estado, procesaremos el reembolso.</li>
            </ol>
          </Section>

          <Section title="5. REEMBOLSOS">
            <p>
              Los reembolsos se acreditan en el mismo medio de pago utilizado en la compra dentro de los <strong className="text-foreground/80">5 a 10 días hábiles</strong> de aprobada la devolución. Los plazos pueden variar según el banco o procesador de pago.
            </p>
            {/* TODO: confirmar tiempos de reembolso con MercadoPago */}
          </Section>

          <Section title="6. COSTOS DE DEVOLUCIÓN">
            <p>
              Si la devolución es por error nuestro (producto incorrecto o defectuoso), cubrimos el costo del flete de devolución. En los demás casos (incluyendo el derecho de arrepentimiento), el costo del envío de devolución corre por cuenta del comprador.
            </p>
          </Section>

          <Section title="7. CAMBIOS">
            <p>
              Por el momento no ofrecemos cambios directos. Para cambiar un producto, debés realizar la devolución y luego hacer una nueva compra.
            </p>
            {/* TODO: revisar si el cliente quiere habilitar cambios */}
          </Section>

          <Section title="8. CONTACTO">
            <p>
              Para dudas sobre devoluciones, escribinos a{' '}
              <a href="mailto:devoluciones@deliriogin.com" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                devoluciones@deliriogin.com
              </a>{' '}
              o a través del chat en el Sitio.
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
