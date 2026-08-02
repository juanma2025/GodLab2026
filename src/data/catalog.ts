export const catalogFilters = [
  'Todos',
  'Editorial Beauty',
  'Luxury Bridal',
  'Social Prestige',
  'Campaign Makeup',
] as const

export const catalogSortOptions = [
  'En primer plano',
  'Superventas',
  'Mejor valorados',
  'Descuentos',
  'Novedades',
  'Precio: de más alto a más bajo',
  'Precio: de más bajo a más alto',
] as const

export const catalogColorOptions = [
  { label: 'Rojo', color: '#d62828' },
  { label: 'Rosa', color: '#f48fb1' },
  { label: 'Coral', color: '#ff7f50' },
  { label: 'Borgoña', color: '#7d1128' },
  { label: 'Marrón', color: '#6b4423' },
  { label: 'Naranja', color: '#f39c12' },
  { label: 'Natural', color: '#d2b48c' },
] as const

export const catalogFinishOptions = [
  'Matte',
  'Metallic',
  'Glossy',
  'Sheer',
  'Natural',
] as const

export const catalogCoverageOptions = [
  'Full Color',
  'High',
  'Light',
] as const

export const catalogRatingOptions = [
  { label: '4/5 & up', value: 4 },
  { label: '3/5 & up', value: 3 },
  { label: '2/5 & up', value: 2 },
  { label: '1 & up', value: 1 },
] as const

export type CatalogFilter = (typeof catalogFilters)[number]
export type CatalogSort = (typeof catalogSortOptions)[number]
export type CatalogColorOption = (typeof catalogColorOptions)[number]['label']
export type CatalogFinishOption = (typeof catalogFinishOptions)[number]
export type CatalogCoverageOption = (typeof catalogCoverageOptions)[number]
export type CatalogCategory = Exclude<CatalogFilter, 'Todos'>

export type CatalogProduct = {
  id: string
  title: string
  category: CatalogCategory
  description: string
  finish: string
  imageUrl?: string
  colors: CatalogColorOption[]
  finishType: CatalogFinishOption
  coverage: CatalogCoverageOption
  price: number
  rating: number
  popularity: number
  discount?: number
  isNew: boolean
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'editorial-glow',
    title: 'Editorial Glow',
    category: 'Editorial Beauty',
    description:
      'Piel luminosa, acentos metalicos y estructura visual pensada para camara.',
    finish: 'Editorial / piel glow',
    colors: ['Rojo', 'Rosa', 'Coral'],
    finishType: 'Sheer',
    coverage: 'High',
    price: 180,
    rating: 4.8,
    popularity: 86,
    discount: 15,
    isNew: false,
  },
  {
    id: 'runway-gold',
    title: 'Runway Gold',
    category: 'Editorial Beauty',
    description:
      'Maquillaje de impacto con brillo controlado, mirada definida y presencia escenica.',
    finish: 'Beauty editorial',
    colors: ['Borgoña', 'Marrón'],
    finishType: 'Glossy',
    coverage: 'Full Color',
    price: 210,
    rating: 4.6,
    popularity: 72,
    discount: 0,
    isNew: true,
  },
  {
    id: 'bride-prestige',
    title: 'Bride Prestige',
    category: 'Luxury Bridal',
    description:
      'Look nupcial sofisticado con preparacion de piel, larga duracion y detalle fino.',
    finish: 'Novia premium',
    colors: ['Rosa', 'Natural'],
    finishType: 'Matte',
    coverage: 'Light',
    price: 245,
    rating: 4.9,
    popularity: 91,
    discount: 10,
    isNew: false,
  },
  {
    id: 'soft-ceremony',
    title: 'Soft Ceremony',
    category: 'Luxury Bridal',
    description:
      'Maquillaje romantico y pulido para ceremonia, retrato y celebracion nocturna.',
    finish: 'Bridal soft glam',
    colors: ['Rosa', 'Coral'],
    finishType: 'Natural',
    coverage: 'Light',
    price: 205,
    rating: 4.7,
    popularity: 64,
    discount: 0,
    isNew: true,
  },
  {
    id: 'social-divinity',
    title: 'Social Divinity',
    category: 'Social Prestige',
    description:
      'Belleza social elegante para eventos, graduaciones, galas y momentos especiales.',
    finish: 'Social glam',
    colors: ['Rojo', 'Borgoña'],
    finishType: 'Metallic',
    coverage: 'Full Color',
    price: 170,
    rating: 4.5,
    popularity: 55,
    discount: 20,
    isNew: false,
  },
  {
    id: 'night-prestige',
    title: 'Night Prestige',
    category: 'Social Prestige',
    description:
      'Mirada protagonista, piel satinada y labios definidos para presencia nocturna.',
    finish: 'Glam nocturno',
    colors: ['Marrón', 'Naranja'],
    finishType: 'Glossy',
    coverage: 'High',
    price: 190,
    rating: 4.7,
    popularity: 78,
    discount: 5,
    isNew: false,
  },
  {
    id: 'campaign-signature',
    title: 'Campaign Signature',
    category: 'Campaign Makeup',
    description:
      'Direccion de maquillaje para campanas, contenido de marca y sesiones comerciales.',
    finish: 'Campana / marca',
    colors: ['Coral', 'Naranja'],
    finishType: 'Natural',
    coverage: 'Light',
    price: 200,
    rating: 4.4,
    popularity: 48,
    discount: 0,
    isNew: true,
  },
  {
    id: 'brand-beauty',
    title: 'Brand Beauty',
    category: 'Campaign Makeup',
    description:
      'Look adaptable a producto, iluminacion y narrativa visual de cada pieza.',
    finish: 'Beauty comercial',
    colors: ['Rosa', 'Coral', 'Natural'],
    finishType: 'Metallic',
    coverage: 'High',
    price: 175,
    rating: 4.3,
    popularity: 52,
    discount: 25,
    isNew: false,
  },
]
