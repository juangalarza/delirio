import { readdirSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const dir = join(process.cwd(), 'public', 'images', 'productos')
    const files = readdirSync(dir).filter((f) =>
      /\.(png|jpg|jpeg|webp|gif|avif)$/i.test(f)
    )
    return Response.json({ images: files })
  } catch {
    return Response.json({ images: [] })
  }
}
