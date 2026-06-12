import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Orbs } from '@/components/Orbs'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Delirio Destilería',
  description: 'Conocé cómo Delirio Destilería recopila, usa y protege tus datos personales.',
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

export default function PrivacidadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.4em] text-primary font-condensed mb-2">LEGAL</p>
            <h1 className="text-3xl font-serif font-bold text-foreground uppercase tracking-widest">
              Política de Privacidad
            </h1>
            <p className="text-foreground/30 font-sans text-xs mt-3">
              Última actualización: junio de 2025 {/* TODO: actualizar fecha con cliente */}
            </p>
          </div>

          <div className="w-full h-px bg-black/5 mb-10" />

          <Section title="1. RESPONSABLE DEL TRATAMIENTO">
            <p>
              Delirio Destilería (en adelante, "nosotros") es responsable del tratamiento de los datos personales que recopilamos a través de este Sitio, conforme a la Ley N° 25.326 de Protección de los Datos Personales de la República Argentina.
            </p>
            {/* TODO: completar con CUIT y domicilio del cliente */}
          </Section>

          <Section title="2. DATOS QUE RECOPILAMOS">
            <p>Recopilamos los siguientes datos personales:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground/70">Datos de registro:</strong> nombre, dirección de correo electrónico y contraseña.</li>
              <li><strong className="text-foreground/70">Datos de compra:</strong> nombre, teléfono, dirección de envío y datos de pago (procesados por MercadoPago — no almacenamos datos de tarjetas).</li>
              <li><strong className="text-foreground/70">Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia.</li>
            </ul>
          </Section>

          <Section title="3. FINALIDAD DEL TRATAMIENTO">
            <p>Utilizamos tus datos para:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Procesar y gestionar tus pedidos.</li>
              <li>Enviarte confirmaciones y actualizaciones sobre tus compras.</li>
              <li>Brindarte soporte y atención al cliente.</li>
              <li>Mejorar la experiencia de navegación en el Sitio.</li>
              <li>Enviarte comunicaciones comerciales, si nos diste tu consentimiento.</li>
            </ul>
          </Section>

          <Section title="4. COOKIES">
            <p>
              Utilizamos cookies propias y de terceros para mejorar la navegación y analizar el tráfico del Sitio. Las cookies de verificación de edad son necesarias para el funcionamiento legal del Sitio y no pueden desactivarse. Podés configurar tu navegador para rechazar cookies opcionales.
            </p>
          </Section>

          <Section title="5. CESIÓN DE DATOS">
            <p>
              No vendemos ni cedemos tus datos personales a terceros, salvo en los casos necesarios para ejecutar el servicio (procesador de pagos MercadoPago, empresa de logística OCA) o cuando lo exija la ley.
            </p>
          </Section>

          <Section title="6. RETENCIÓN DE DATOS">
            <p>
              Conservamos tus datos mientras mantengas una cuenta activa o sea necesario para cumplir con obligaciones legales. Podés solicitar la eliminación de tu cuenta y datos en cualquier momento.
            </p>
          </Section>

          <Section title="7. TUS DERECHOS">
            <p>
              Conforme a la Ley 25.326, tenés derecho a acceder, rectificar, actualizar y suprimir tus datos personales. Para ejercer estos derechos, escribinos a{' '}
              <a href="mailto:privacidad@deliriogin.com" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                privacidad@deliriogin.com
              </a>
              . {/* TODO: confirmar email de privacidad con cliente */}
            </p>
            <p>
              La Dirección Nacional de Protección de Datos Personales (DNPDP) es el organismo de control en la materia.
            </p>
          </Section>

          <Section title="8. SEGURIDAD">
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado, pérdida o alteración. Sin embargo, ninguna transmisión por internet es 100% segura.
            </p>
          </Section>

          <Section title="9. CONTACTO">
            <p>
              Para cualquier consulta sobre privacidad, escribinos a{' '}
              <a href="mailto:privacidad@deliriogin.com" className="text-primary underline underline-offset-4 hover:text-foreground transition-colors">
                privacidad@deliriogin.com
              </a>
              .
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
