export type Product = {
  id: number
  slug: string
  name: string
  description: string
  longDescription: string
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
    longDescription: 'La expresión más clásica de Delirio. Destilado en alambique de cobre con 12 botánicos seleccionados de la precordillera sanjuanina. El enebro domina desde el primer sorbo, seguido por notas cítricas brillantes de pomelo y limón, con un cierre especiado de pimienta rosa y cardamomo. Perfecto para gin & tonic con tónica premium y un twist de pomelo. También se luce en un Martini seco o Gimlet.', // TODO: confirmar copy con cliente
    price: 20000, // TODO: confirmar precio real con cliente
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549057530.png'
  },
  {
    id: 2,
    slug: 'roble-frances',
    name: 'ROBLE FRANCÉS',
    description: 'Destilado reposado en barricas de roble, con matices de vainilla y especias.',
    longDescription: 'Nuestro gin más complejo e introspectivo. Reposado en barricas de roble francés durante tres meses, adquiere profundidad y redondez únicas. Los botánicos ceden protagonismo gradualmente a notas cálidas de vainilla, canela y fruta seca. El resultado es un destilado de carácter que puede disfrutarse solo, en las rocas o como base de cocktails sofisticados como un Negroni o un Old Fashioned gin.', // TODO: confirmar copy con cliente
    price: 24000,
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549058690.png'
  },
  {
    id: 3,
    slug: 'montana-floral',
    name: 'MONTAÑA FLORAL',
    description: 'Infusión de hierbas andinas y flores silvestres de la precordillera.',
    longDescription: 'Inspirado en la flora de la precordillera andina. Una cuidada selección de flores silvestres — lavanda de altura, rosa mosqueta y violeta — se combina con hierbas aromáticas para crear un destilado delicado y expresivo. De color cristalino con aromas florales persistentes, es el gin favorito de quienes buscan una experiencia diferente. Ideal para preparar con tónica floral y pétalos frescos.', // TODO: confirmar copy con cliente
    price: 22000,
    abv: '40%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549057001.png'
  },
  {
    id: 4,
    slug: 'individual-botanicos',
    name: 'INDIVIDUAL + BOTÁNICOS',
    description: 'El set perfecto de destilación artesanal que incluye botella de 750ml con infusión de enebro y mix de botánicos desérticos.',
    longDescription: 'El set definitivo para los apasionados del gin artesanal. Incluye nuestra botella London Dry de 750ml junto a un estuche de seis botánicos desérticos seleccionados a mano: enebro, cardamomo, cáscara de naranja seca, orquídea de montaña, cilantro y pimienta blanca. Una experiencia de aromatización en casa, guiada por las notas de nuestros maestros destiladores. El regalo perfecto para el curioso del gin.', // TODO: confirmar copy con cliente
    price: 26000,
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549072341.png'
  },
  {
    id: 5,
    slug: 'box-4-en-1',
    name: 'BOX 4 EN 1',
    description: 'Exclusiva selección de miniaturas de la destilería. 4 botellas combinadas en un empaque de roble premium.',
    longDescription: 'La colección completa en un empaque de roble premium. Cuatro miniaturas de 200ml — London Dry, Roble Francés, Montaña Floral y Negroni — presentadas en un estuche de madera artesanal con relieves dorados. El regalo ideal para el amante del gin fino que quiere explorar toda la gama Delirio. Edición limitada, disponible mientras dure el stock.', // TODO: confirmar copy con cliente
    price: 38000,
    abv: '43%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549076048.png'
  },
  {
    id: 6,
    slug: 'negroni-750ml',
    name: 'NEGRONI 750ml',
    description: 'Elaborado bajo receta tradicional con nuestro gin de barrica de roble, vermut dulce de la casa y bitter alpino.',
    longDescription: 'El Negroni de Delirio: elaborado bajo receta tradicional italiana con nuestro gin de barrica de roble, vermut dulce de producción propia y bitter alpino de hierbas andinas. Embotellado listo para servir, en su punto exacto de dilución. Solo hay que verter sobre hielo y decorar con una rodaja de naranja. Perfecto para quien aprecia la complejidad sin el proceso.', // TODO: confirmar copy con cliente
    price: 29000,
    abv: '25%', // TODO: confirmar ABV real con cliente
    image: '/images/generated-1778549078456.png'
  }
]
