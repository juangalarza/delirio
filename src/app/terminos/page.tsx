import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Delirio Destilería',
  description: 'Leé los términos y condiciones de compra y uso del sitio de Delirio Destilería.',
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

export default function TerminosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar staticLogo />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.4em] text-primary font-condensed mb-2">LEGAL</p>
            <h1 className="text-3xl font-serif font-bold text-foreground uppercase tracking-widest">
              Términos y Condiciones
            </h1>
            <p className="text-foreground/30 font-sans text-xs mt-3">
              Última actualización: junio de 2025 {/* TODO: actualizar fecha con cliente */}
            </p>
          </div>

          <div className="w-full h-px bg-black/5 mb-10" />

          <Section title="1. ACEPTACIÓN DE LOS TÉRMINOS">
            <p>
              Al acceder y utilizar el sitio web de Delirio Destilería (en adelante, "el Sitio") y realizar compras a través de él, aceptás en su totalidad estos Términos y Condiciones. Si no estás de acuerdo, te pedimos que no uses el Sitio.
            </p>
            {/* TODO: validar con cliente */}
          </Section>

          <Section title="2. VERIFICACIÓN DE EDAD">
            <p>
              La venta y distribución de bebidas alcohólicas está <strong className="text-foreground/80">prohibida para menores de 18 años</strong>, conforme a la legislación argentina vigente. Al ingresar al Sitio y realizar una compra, confirmás ser mayor de 18 años.
            </p>
            <p>
              Delirio Destilería se reserva el derecho de cancelar cualquier pedido en caso de sospechar que el comprador es menor de edad.
            </p>
          </Section>

          <Section title="3. PRODUCTOS Y PRECIOS">
            <p>
              Todos los precios publicados en el Sitio están expresados en pesos argentinos (ARS) e incluyen IVA. Los precios pueden cambiar sin previo aviso. El precio que rige es el vigente al momento de confirmar el pedido.
            </p>
            <p>
              Las imágenes de los productos son de carácter ilustrativo. Delirio Destilería no garantiza que los colores mostrados en pantalla coincidan exactamente con el producto físico.
            </p>
            {/* TODO: confirmar política de precios con cliente */}
          </Section>

          <Section title="4. PROCESO DE COMPRA">
            <p>
              El proceso de compra se concreta cuando recibís la confirmación de pago por correo electrónico. Hasta ese momento, Delirio Destilería no asume ningún compromiso de entrega.
            </p>
            <p>
              Nos reservamos el derecho de rechazar o cancelar pedidos por razones de stock, errores en los precios publicados o detección de fraude.
            </p>
          </Section>

          <Section title="5. ENVÍOS">
            <p>
              Los envíos se realizan a través de OCA a todo el territorio nacional. Los plazos de entrega son estimativos y pueden variar según la zona geográfica y la disponibilidad del transportista.
            </p>
            <p>
              Consultá nuestra{' '}
              <a href="/envios" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                Política de Envíos
              </a>{' '}
              para más información.
            </p>
          </Section>

          <Section title="6. PROPIEDAD INTELECTUAL">
            <p>
              Todos los contenidos del Sitio (textos, imágenes, logotipos, diseños, marcas) son propiedad de Delirio Destilería o sus licenciantes y están protegidos por las leyes de propiedad intelectual argentinas e internacionales. Está prohibida su reproducción total o parcial sin autorización escrita.
            </p>
          </Section>

          <Section title="7. LIMITACIÓN DE RESPONSABILIDAD">
            <p>
              Delirio Destilería no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso del Sitio o de la imposibilidad de usarlo.
            </p>
          </Section>

          <Section title="8. LEY APLICABLE">
            <p>
              Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier controversia será sometida a los tribunales ordinarios de la Ciudad de Buenos Aires.
            </p>
            {/* TODO: confirmar jurisdicción con cliente */}
          </Section>

          <Section title="9. CONTACTO">
            <p>
              Para consultas sobre estos términos, escribinos a{' '}
              <a href="mailto:info@deliriogin.com" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                info@deliriogin.com
              </a>
              . {/* TODO: confirmar email de contacto con cliente */}
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
