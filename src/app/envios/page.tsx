import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

export const metadata: Metadata = {
  title: 'Política de Envíos — Delirio Destilería',
  description: 'Información sobre tiempos de entrega, costos de envío y cobertura de Delirio Destilería.',
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

export default function EnviosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.4em] text-primary font-condensed mb-2">LOGÍSTICA</p>
            <h1 className="text-3xl font-serif font-bold text-foreground uppercase tracking-widest">
              Política de Envíos
            </h1>
            <p className="text-foreground/30 font-sans text-xs mt-3">
              Última actualización: junio de 2025 {/* TODO: actualizar fecha con cliente */}
            </p>
          </div>

          <div className="w-full h-px bg-black/5 mb-10" />

          <Section title="1. EMPRESA DE LOGÍSTICA">
            <p>
              Todos los envíos se realizan a través de <strong className="text-foreground/80">OCA</strong> a cualquier punto del territorio argentino. Trabajamos con OCA E-Pak para garantizar el correcto manejo de productos frágiles.
            </p>
            {/* TODO: confirmar empresa de logística final con cliente */}
          </Section>

          <Section title="2. COBERTURA">
            <p>
              Realizamos envíos a todo el territorio de la República Argentina, incluyendo zona AMBA, interior del país e islas. Algunas localidades remotas pueden tener restricciones de entrega.
            </p>
          </Section>

          <Section title="3. TIEMPOS DE ENTREGA">
            <p>Los plazos estimados de entrega son:</p>
            <div className="border border-black/[0.08] rounded-sm overflow-hidden mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-black/[0.02] border-b border-black/5">
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.2em] font-condensed text-foreground/40">ZONA</th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.2em] font-condensed text-foreground/40">PLAZO ESTIMADO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="px-4 py-3 text-foreground/70">Capital Federal y GBA</td>
                    <td className="px-4 py-3 text-foreground/70">2–3 días hábiles</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground/70">Interior del país (principales ciudades)</td>
                    <td className="px-4 py-3 text-foreground/70">3–7 días hábiles</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-foreground/70">Localidades remotas</td>
                    <td className="px-4 py-3 text-foreground/70">5–10 días hábiles</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-foreground/40 text-xs mt-3">
              {/* TODO: confirmar tiempos reales con cliente y OCA */}
              Los plazos son estimativos y pueden variar por demanda o condiciones climáticas.
            </p>
          </Section>

          <Section title="4. COSTOS DE ENVÍO">
            <p>
              El costo de envío se calcula automáticamente al finalizar la compra según el peso del pedido y el código postal de destino.
            </p>
            <p>
              {/* TODO: confirmar si habrá envío gratis y a partir de qué monto */}
              Los pedidos que superen los <strong className="text-foreground/80">$XX.000 ARS</strong> tienen envío gratuito a todo el país.
            </p>
          </Section>

          <Section title="5. SEGUIMIENTO DEL PEDIDO">
            <p>
              Una vez despachado tu pedido, recibirás un correo electrónico con el número de seguimiento de OCA. Podés rastrear tu envío en el sitio oficial de OCA o desde tu cuenta en Delirio Destilería.
            </p>
          </Section>

          <Section title="6. PAQUETES DAÑADOS O FALTANTES">
            <p>
              Si tu pedido llega dañado o con productos faltantes, contactanos dentro de las <strong className="text-foreground/80">48 horas</strong> de recibida la entrega con fotos del estado del paquete. Gestionaremos el reclamo ante OCA y repondremos el producto sin costo adicional.
            </p>
            <p>
              Escribinos a{' '}
              <a href="mailto:envios@deliriogin.com" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                envios@deliriogin.com
              </a>
              . {/* TODO: confirmar email de envíos con cliente */}
            </p>
          </Section>

          <Section title="7. DIRECCIÓN INCORRECTA">
            <p>
              Es responsabilidad del comprador proveer una dirección de envío correcta al momento de la compra. En caso de devolución del paquete por dirección incorrecta, los costos de reenvío correrán por cuenta del comprador.
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
