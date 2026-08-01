import { catalogFilters } from '../data/catalog'
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
  const handleSelectLine = (line: CatalogCategory) => {
    onSelectLine(line)
  }

  return (
    <section className="portfolio-lines px-5 py-20 sm:px-8">
      <section className="mx-auto max-w-7xl">
        <h2 className="portfolio-lines__title font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
          Lineas de portafolio
        </h2>
        <div className="portfolio-lines__grid mt-10 grid gap-px overflow-hidden border border-[#EEC77F]/18 bg-[#EEC77F]/18 md:grid-cols-4">
          {portfolioLines.map((line) => {
            const isActive = activeFilter === line

            return (
              <button
                className={`portfolio-lines__item bg-black px-6 py-10 text-center font-heading text-sm uppercase tracking-[0.26em] transition ${
                  isActive
                    ? 'text-[#EEC77F] shadow-[inset_0_0_0_1px_rgba(238,199,127,0.7)]'
                    : 'text-[#FFF9EF]/82 hover:bg-[#0A0A0A] hover:text-[#EEC77F]'
                }`}
                key={line}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectLine(line)}
              >
                {line}
              </button>
            )
          })}
        </div>
      </section>
    </section>
  )
}
