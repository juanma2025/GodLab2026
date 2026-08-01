export const catalogFilters = [
  'Todos',
  'Editorial Beauty',
  'Luxury Bridal',
  'Social Prestige',
  'Campaign Makeup',
] as const

export type CatalogFilter = (typeof catalogFilters)[number]
export type CatalogCategory = Exclude<CatalogFilter, 'Todos'>

export type CatalogProduct = {
  id: string
  title: string
  category: CatalogCategory
  description: string
  finish: string
  imageUrl?: string
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'editorial-glow',
    title: 'Editorial Glow',
    category: 'Editorial Beauty',
    description:
      'Piel luminosa, acentos metalicos y estructura visual pensada para camara.',
    finish: 'Editorial / piel glow',
  },
  {
    id: 'runway-gold',
    title: 'Runway Gold',
    category: 'Editorial Beauty',
    description:
      'Maquillaje de impacto con brillo controlado, mirada definida y presencia escenica.',
    finish: 'Beauty editorial',
  },
  {
    id: 'bride-prestige',
    title: 'Bride Prestige',
    category: 'Luxury Bridal',
    description:
      'Look nupcial sofisticado con preparacion de piel, larga duracion y detalle fino.',
    finish: 'Novia premium',
  },
  {
    id: 'soft-ceremony',
    title: 'Soft Ceremony',
    category: 'Luxury Bridal',
    description:
      'Maquillaje romantico y pulido para ceremonia, retrato y celebracion nocturna.',
    finish: 'Bridal soft glam',
  },
  {
    id: 'social-divinity',
    title: 'Social Divinity',
    category: 'Social Prestige',
    description:
      'Belleza social elegante para eventos, graduaciones, galas y momentos especiales.',
    finish: 'Social glam',
  },
  {
    id: 'night-prestige',
    title: 'Night Prestige',
    category: 'Social Prestige',
    description:
      'Mirada protagonista, piel satinada y labios definidos para presencia nocturna.',
    finish: 'Glam nocturno',
  },
  {
    id: 'campaign-signature',
    title: 'Campaign Signature',
    category: 'Campaign Makeup',
    description:
      'Direccion de maquillaje para campanas, contenido de marca y sesiones comerciales.',
    finish: 'Campana / marca',
  },
  {
    id: 'brand-beauty',
    title: 'Brand Beauty',
    category: 'Campaign Makeup',
    description:
      'Look adaptable a producto, iluminacion y narrativa visual de cada pieza.',
    finish: 'Beauty comercial',
  },
]
