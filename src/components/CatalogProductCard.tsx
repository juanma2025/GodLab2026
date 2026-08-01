import type { CatalogProduct } from '../data/catalog'

type CatalogProductCardProps = {
  product: CatalogProduct
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  return (
    <article className="catalog-card group grid h-full grid-rows-[auto_1fr] overflow-hidden border transition duration-300">
      <div className="catalog-card__media relative aspect-[5/4] overflow-hidden border-b">
        {product.imageUrl ? (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={product.imageUrl}
            alt={`Maquillaje ${product.title}`}
          />
        ) : (
          <div className="catalog-placeholder flex h-full flex-col items-center justify-center gap-3 px-6 text-center transition duration-300 group-hover:scale-[1.02]">
            <span className="catalog-placeholder__mark" />
            <span className="font-heading text-xs uppercase tracking-[0.24em]">
              Cargar imagen
            </span>
          </div>
        )}
        <span className="catalog-card__overlay absolute inset-x-4 bottom-4 translate-y-2 border px-4 py-3 text-center font-heading text-[0.62rem] font-semibold uppercase tracking-[0.2em] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Ver producto
        </span>
      </div>

      <div className="catalog-card__body p-5">
        <p className="catalog-card__category font-heading text-[0.62rem] uppercase tracking-[0.24em]">
          {product.category}
        </p>
        <h3 className="mt-3 font-heading text-base uppercase tracking-[0.18em] text-[#EEC77F]">
          {product.title}
        </h3>
        <p className="mt-4 text-[0.98rem] leading-7">
          {product.description}
        </p>
        <p className="catalog-card__finish mt-5 border-t pt-4 font-heading text-[0.68rem] uppercase tracking-[0.18em]">
          {product.finish}
        </p>
      </div>
    </article>
  )
}
