import { useEffect, useRef, useState } from 'react'
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

function CategoryIcon({ category }: { category: string }) {
  if (category === 'Editorial Beauty')
    return (
      <svg className="portfolio-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17l2 2 4-4" />
      </svg>
    )
  if (category === 'Luxury Bridal')
    return (
      <svg className="portfolio-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  if (category === 'Social Prestige')
    return (
      <svg className="portfolio-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    )
  // Campaign Makeup
  return (
    <svg className="portfolio-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  )
}

export function PortfolioLines({
  activeFilter,
  onSelectLine,
}: PortfolioLinesProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className={`portfolio-lines scroll-mt-24 px-5 py-24 sm:px-8 ${isVisible ? 'portfolio-visible' : 'portfolio-hidden'}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="portfolio-header mb-16 text-center">
          <div className="portfolio-header__label-row">
            <span className="portfolio-header__accent-line" />
            <p className="portfolio-header__label font-heading">
              Especialidades
            </p>
            <span className="portfolio-header__accent-line" />
          </div>
          <h2 className="portfolio-header__title mt-4 font-heading text-4xl uppercase tracking-[0.14em] sm:text-5xl">
            Líneas de Portafolio
          </h2>
          <p className="portfolio-header__subtitle mx-auto mt-5 max-w-2xl text-lg text-[#FFF9EF]/68">
            Explora nuestros servicios especializados diseñados para cada momento y exigencia visual.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="portfolio-grid grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {portfolioLines.map((line, index) => {
            const isActive = activeFilter === line
            const info = portfolioLineDescriptions[line]
            const animationDelay = `${index * 150}ms`

            return (
              <button
                key={line}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectLine(line)}
                style={{ animationDelay }}
                className={`portfolio-card group ${isActive ? 'portfolio-card--active' : ''}`}
              >
                {/* Background effects */}
                <div className="portfolio-card__bg" />
                <div className="portfolio-card__glow" />

                {/* Content */}
                <div className="portfolio-card__content relative z-10 flex h-full flex-col items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="portfolio-card__icon-wrapper mb-6">
                      <CategoryIcon category={line} />
                    </div>
                    <h3 className="portfolio-card__title font-heading text-lg uppercase tracking-[0.2em] transition-colors duration-300">
                      {line}
                    </h3>
                  </div>

                  {info ? (
                    <div className="portfolio-card__info mt-6 flex flex-col items-center">
                      <p className="portfolio-card__desc text-center text-sm leading-relaxed">
                        {info.description}
                      </p>
                      <div className="portfolio-card__action mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <span>Ver {info.productCount} looks</span>
                        <svg className="portfolio-card__arrow transition-transform duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ) : null}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
