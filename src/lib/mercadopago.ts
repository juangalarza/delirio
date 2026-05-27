import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: { timeout: 5000 }
})

export const mpPreference = new Preference(client)

export class MercadoPagoService {
  static async createPreference(items: any[], externalReference: string) {
    try {
      const response = await mpPreference.create({
        body: {
          items,
          external_reference: externalReference,
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
            failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
            pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
          },
          auto_return: 'approved',
        }
      })
      return response
    } catch (error) {
      console.error('MercadoPago error:', error)
      throw error
    }
  }
}
