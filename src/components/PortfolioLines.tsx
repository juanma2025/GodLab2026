import { catalogFilters } from '../data/catalog'
import { portfolioLineDescriptions } from '../data/content'
import type { CatalogCategory, CatalogFilter } from '../data/catalog'

type PortfolioLinesProps = {
  activeFilter: CatalogFilter
  onSelectLine: (filter: CatalogCategory) => void
}

const portfolioLines = catalogFilters.filter(
  (filter): filter is CatalogCategory => filter !== 'Todos',
)

export function PortfolioLines({
  activeFilter,
  onSelectLine,
}: PortfolioLinesProps) {
  return (
    <section className="portfolio-lines px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <p className="font-heading text-xs uppercase tracking-[0.42em] text-[#EEC77F]">
            Especialidades
          </p>
          <h2 className="portfolio-lines__title mt-3 font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
            Lineas de portafolio
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#FFF9EF]/68">
            Explora nuestros servicios especializados disendos para cada momento y exigencia visual.
          </p>
        </header>

        <div className="portfolio-lines__grid mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#EEC77F]/20 bg-[#EEC77F]/20 md:grid-cols-4">
          {portfolioLines.map((line) => {
            const isActive = activeFilter === line
            const info = portfolioLineDescriptions[line]

            return (
              <button
                className={`portfolio-line-item group ${
                  isActive
                    ? 'text-[#EEC77F] shadow-[inset_0_0_0_1px_rgba(238,199,127,0.7)]'
                    : 'text-[#FFF9EF]/85'
                }`}
                key={line}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectLine(line)}
              >
                <span className="font-heading text-base uppercase tracking-[0.22em] transition duration-300 group-hover:text-[#EEC77F]">
                  {line}
                </span>

                {info ? (
                  <>
                    <p className="portfolio-line-item__desc">
                      {info.description}
                    </p>
                    <p className="portfolio-line-item__count">
                      {info.productCount} Looks Disponibles &rarr;
                    </p>
                  </>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
