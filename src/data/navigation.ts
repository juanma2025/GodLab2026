export type PageId = 'inicio' | 'catalogo' | 'metodo' | 'portafolio' | 'contacto'

export const navigationPages: Array<{ id: PageId; label: string }> = [
  { id: 'catalogo', label: 'Catalogo' },
  { id: 'metodo', label: 'Metodo' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'contacto', label: 'Contacto' },
]
