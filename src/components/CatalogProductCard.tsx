import { useState, useEffect } from 'react'
import type { CatalogProduct } from '../data/catalog'
import { catalogColorOptions } from '../data/catalog'

type CatalogProductCardProps = {
  product: CatalogProduct
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      <article className="catalog-card group grid h-full grid-rows-[auto_1fr] overflow-hidden border transition duration-300">
        <div className="catalog-card__media relative aspect-[5/4] overflow-hidden border-b">
          {/* Badges */}
          {product.isNew && (
            <span className="product-badge product-badge--new">Nuevo</span>
          )}
          {product.discount ? (
            <span className="product-badge product-badge--discount">
              -{product.discount}%
            </span>
          ) : null}

          {product.imageUrl ? (
            <img
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              src={product.imageUrl}
              alt={`Maquillaje ${product.title}`}
            />
          ) : (
            <div className="catalog-placeholder flex h-full flex-col items-center justify-center gap-3 px-6 text-center transition duration-300 group-hover:scale-[1.02]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EEC77F]/40 bg-[#EEC77F]/10 text-[#EEC77F]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <span className="font-heading text-xs uppercase tracking-[0.24em] text-[#EEC77F]/90">
                Look Editorial
              </span>
            </div>
          )}
          
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="catalog-card__overlay absolute inset-x-4 bottom-4 translate-y-2 border px-4 py-3 text-center font-heading text-[0.62rem] font-semibold uppercase tracking-[0.2em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#EEC77F] hover:text-black hover:border-transparent"
          >
            Ver producto
          </button>
        </div>

        <div className="catalog-card__body flex flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between">
              <p className="catalog-card__category font-heading text-[0.62rem] uppercase tracking-[0.24em]">
                {product.category}
              </p>
            </div>

            <h3 className="mt-2 font-heading text-base uppercase tracking-[0.18em] text-[#EEC77F]">
              {product.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-6 text-[#FFF9EF]/75">
              {product.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between border-t border-[#EEC77F]/15 pt-4">
            <p className="catalog-card__finish font-heading text-[0.68rem] uppercase tracking-[0.18em]">
              {product.finish}
            </p>
          </div>
        </div>
      </article>

      {/* Product Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity modal-backdrop-enter" 
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-[#EEC77F]/30 bg-[#0A0A0A] shadow-[0_30px_80px_rgba(0,0,0,0.8)] modal-content-enter"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${product.id}`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-[#FFF9EF]/70 hover:bg-[#EEC77F] hover:text-black transition-colors border border-[#EEC77F]/20"
              aria-label="Cerrar modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-square bg-[#EEC77F]/5 border-r border-[#EEC77F]/10">
                {product.imageUrl ? (
                  <img
                    className="h-full w-full object-cover"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#EEC77F]/40">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                )}
                
                {/* Stock Badge Overlay */}
                <div className="absolute bottom-4 left-4">
                  {product.inStock ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 border border-green-500/30 text-xs font-semibold text-green-400 backdrop-blur-md shadow-lg">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                      Disponible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 border border-red-500/30 text-xs font-semibold text-red-400 backdrop-blur-md shadow-lg">
                      <span className="h-2 w-2 rounded-full bg-red-400"></span>
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                    {product.category}
                  </p>
                  <h2 id={`modal-title-${product.id}`} className="mt-2 font-heading text-2xl uppercase tracking-widest text-[#FFF9EF] drop-shadow-md">
                    {product.title}
                  </h2>
                  
                  <div className="mt-4 border-t border-[#EEC77F]/10 pt-4">
                    <p className="text-sm leading-relaxed text-[#FFF9EF]/80">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3 bg-[#EEC77F]/5 p-4 rounded-lg border border-[#EEC77F]/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#FFF9EF]/50">Cobertura:</span>
                      <span className="font-semibold text-[#FFF9EF]">{product.coverage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#FFF9EF]/50">Acabado:</span>
                      <span className="font-semibold text-[#FFF9EF]">{product.finishType}</span>
                    </div>
                  </div>

                  {/* Colors Section */}
                  <div className="mt-6">
                    <span className="block text-xs uppercase tracking-wider text-[#FFF9EF]/50 mb-3">Tonos Disponibles</span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(colorLabel => {
                        const colorInfo = catalogColorOptions.find(c => c.label === colorLabel)
                        return (
                          <div 
                            key={colorLabel}
                            className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#FFF9EF]/20 transition-all hover:scale-110 hover:border-[#EEC77F] hover:shadow-[0_0_10px_rgba(238,199,127,0.4)]"
                            style={{ backgroundColor: colorInfo?.color || '#333' }}
                            title={colorLabel}
                          >
                            <span className="absolute -top-8 hidden whitespace-nowrap rounded bg-[#0A0A0A] px-2 py-1 text-[10px] text-white group-hover:block border border-[#EEC77F]/40 shadow-lg">
                              {colorLabel}
                            </span>
                          </div>
                        )
                      })}
                      {product.colors.length === 0 && (
                        <span className="text-sm text-[#FFF9EF]/40 italic">Tono único</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8 pt-4 border-t border-[#EEC77F]/10">
                  <button 
                    disabled={!product.inStock}
                    className={`w-full rounded-full py-3.5 font-heading text-sm font-bold uppercase tracking-widest transition-all ${
                      product.inStock 
                        ? 'bg-gradient-to-r from-[#EEC77F] to-[#976C35] text-black shadow-lg shadow-[#EEC77F]/20 hover:scale-[1.02] hover:shadow-[#EEC77F]/40' 
                        : 'cursor-not-allowed bg-[#222] text-[#666] opacity-60 border border-[#333]'
                    }`}
                  >
                    {product.inStock ? 'Reservar look' : 'No disponible'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
