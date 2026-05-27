import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export class EmailService {
  static async sendConfirmation(email: string, orderId: string) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Delirio Gin <noreply@deliriogin.com>',
        to: [email],
        subject: `Confirmación de pedido #${orderId}`,
        html: `<p>¡Gracias por tu compra! Tu pedido <strong>#${orderId}</strong> está siendo procesado.</p>`
      })

      if (error) {
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }
  }
}
