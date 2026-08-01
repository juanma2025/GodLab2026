import { CatalogProductCard } from './CatalogProductCard'
import { catalogFilters, catalogProducts } from '../data/catalog'
import type { CatalogFilter } from '../data/catalog'

type CatalogSectionProps = {
  activeFilter: CatalogFilter
  onSelectFilter: (filter: CatalogFilter) => void
}

export function CatalogSection({
  activeFilter,
  onSelectFilter,
}: CatalogSectionProps) {
  const visibleProducts =
    activeFilter === 'Todos'
      ? catalogProducts
      : catalogProducts.filter((product) => product.category === activeFilter)

  return (
    <section
      id="catalogo"
      className="catalog-section scroll-mt-24 border-y px-5 py-20 sm:px-8"
    >
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.38em] text-[#EEC77F]">
              Catalogo
            </p>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl uppercase tracking-[0.12em] text-[#FFF9EF] sm:text-5xl">
              Maquillaje por linea, acabado y momento de uso.
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-3"
            aria-label="Filtros de catalogo"
          >
            {catalogFilters.map((filter) => {
              const isActive = activeFilter === filter

              return (
                <button
                  className={`catalog-filter border px-4 py-3 font-heading text-[0.64rem] font-semibold uppercase tracking-[0.2em] transition ${
                    isActive
                      ? 'catalog-filter--active'
                      : 'border-[#EEC77F]/25 text-[#FFF9EF]/76 hover:border-[#EEC77F] hover:text-[#EEC77F]'
                  }`}
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelectFilter(filter)}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <CatalogProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
