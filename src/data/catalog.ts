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
  inStock: boolean
}

export const catalogProducts: CatalogProduct[] = []
