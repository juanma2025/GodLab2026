import type { CatalogProduct } from '../data/catalog'

type CatalogProductCardProps = {
  product: CatalogProduct
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="star-rating" title={`${rating} de 5 estrellas`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {hasHalfStar && <span>★</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="star-rating__empty">
          ☆
        </span>
      ))}
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </div>
  )
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  return (
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
        <span className="catalog-card__overlay absolute inset-x-4 bottom-4 translate-y-2 border px-4 py-3 text-center font-heading text-[0.62rem] font-semibold uppercase tracking-[0.2em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Ver producto
        </span>
      </div>

      <div className="catalog-card__body flex flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between">
            <p className="catalog-card__category font-heading text-[0.62rem] uppercase tracking-[0.24em]">
              {product.category}
            </p>
            <StarRating rating={product.rating} />
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
          <div className="flex items-center gap-2">
            {product.discount ? (
              <span className="text-xs text-[#FFF9EF]/40 line-through">
                ${Math.round(product.price * (1 + product.discount / 100))}
              </span>
            ) : null}
            <span className="font-semibold text-[#FFF9EF]">${product.price}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
