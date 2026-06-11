export type Product = {
  id: number
  slug: string
  name: string
  description: string
  price: number
  abv: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'london-dry',
    name: 'LONDON DRY',
    description: 'Nuestra expresión más pura. Enebro intenso con notas cítricas de pomelo y un final especiado de pimienta rosa.',
    price: 20000, // TODO: confirmar precio real con cliente
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549057530.png'
  },
  {
    id: 2,
    slug: 'roble-frances',
    name: 'ROBLE FRANCÉS',
    description: 'Destilado reposado en barricas de roble, con matices de vainilla y especias.',
    price: 24000,
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549058690.png'
  },
  {
    id: 3,
    slug: 'montana-floral',
    name: 'MONTAÑA FLORAL',
    description: 'Infusión de hierbas andinas y flores silvestres de la precordillera.',
    price: 22000,
    abv: '40%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549057001.png'
  },
  {
    id: 4,
    slug: 'individual-botanicos',
    name: 'INDIVIDUAL + BOTÁNICOS',
    description: 'El set perfecto de destilación artesanal que incluye botella de 750ml con infusión de enebro y mix de botánicos desérticos.',
    price: 26000,
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549072341.png'
  },
  {
    id: 5,
    slug: 'box-4-en-1',
    name: 'BOX 4 EN 1',
    description: 'Exclusiva selección de miniaturas de la destilería. 4 botellas combinadas en un empaque de roble premium.',
    price: 38000,
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549076048.png'
  },
  {
    id: 6,
    slug: 'negroni-750ml',
    name: 'NEGRONI 750ml',
    description: 'Elaborado bajo receta tradicional con nuestro gin de barrica de roble, vermut dulce de la casa y bitter alpino.',
    price: 29000,
    abv: '25%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549078456.png'
  }
]
