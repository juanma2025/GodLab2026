export type Principle = {
  number: string
  title: string
  description: string
  icon: string
}

export const principles: Principle[] = [
  {
    number: '01',
    title: 'Fondo negro absoluto',
    description:
      'El negro como escenario principal: presencia, contraste y autoridad visual en cada composicion.',
    icon: 'contrast',
  },
  {
    number: '02',
    title: 'Dorado metalico',
    description:
      'Acentos dorados en lineas, llamadas a la accion y detalles que transmiten lujo y exclusividad.',
    icon: 'sparkle',
  },
  {
    number: '03',
    title: 'Tipografia de presencia',
    description:
      'Mayusculas, tracking amplio y serif clasica para una voz de marca que impone y eleva.',
    icon: 'typography',
  },
  {
    number: '04',
    title: 'Espacio y precision',
    description:
      'Espacio generoso, detalles finos y brillo controlado. Cada elemento respira y comunica.',
    icon: 'precision',
  },
]

export type MethodStep = {
  value: string
  label: string
  description: string
}

export const methodSteps: MethodStep[] = [
  {
    value: '01',
    label: 'Diagnostico estetico',
    description:
      'Lectura facial, analisis de tono de piel, estructura osea y estilo personal para definir la base del look.',
  },
  {
    value: '02',
    label: 'Diseno de look',
    description:
      'Seleccion cromatica, intencion estetica y propuesta visual adaptada al contexto y la personalidad.',
  },
  {
    value: '03',
    label: 'Ejecucion premium',
    description:
      'Aplicacion de alto detalle con productos de linea profesional, precision editorial y acabado impecable.',
  },
]

export type PortfolioLineInfo = {
  category: string
  description: string
  productCount: number
}

export const portfolioLineDescriptions: Record<string, PortfolioLineInfo> = {
  'Editorial Beauty': {
    category: 'Editorial Beauty',
    description: 'Looks de impacto para editorial, pasarela y contenido visual de alto nivel.',
    productCount: 2,
  },
  'Luxury Bridal': {
    category: 'Luxury Bridal',
    description: 'Maquillaje nupcial premium con larga duracion y detalle excepcional.',
    productCount: 2,
  },
  'Social Prestige': {
    category: 'Social Prestige',
    description: 'Belleza social para eventos, galas, graduaciones y momentos especiales.',
    productCount: 2,
  },
  'Campaign Makeup': {
    category: 'Campaign Makeup',
    description: 'Direccion de maquillaje para campanas de marca y sesiones comerciales.',
    productCount: 2,
  },
}
