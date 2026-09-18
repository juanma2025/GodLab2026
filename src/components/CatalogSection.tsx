import { useEffect, useMemo, useState } from 'react'
import { CatalogProductCard } from './CatalogProductCard'
import { useProducts } from '../hooks/useProducts'
import {
  catalogColorOptions,
  catalogCoverageOptions,
  catalogFilters,
  catalogFinishOptions,
  catalogProducts as staticProducts,
  catalogRatingOptions,
  catalogSortOptions,
} from '../data/catalog'
import type {
  CatalogColorOption,
  CatalogCoverageOption,
  CatalogFilter,
  CatalogFinishOption,
  CatalogProduct,
  CatalogSort,
} from '../data/catalog'

type CatalogSectionProps = {
  activeFilter: CatalogFilter
  activeSort: CatalogSort
  onSelectFilter: (filter: CatalogFilter) => void
  onSelectSort: (sort: CatalogSort) => void
}

type ProductFilters = {
  color: CatalogColorOption | null
  finish: CatalogFinishOption | null
  coverage: CatalogCoverageOption | null
  rating: number | null
}

function sortProducts(products: CatalogProduct[], sort: CatalogSort) {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'Superventas':
        return b.popularity - a.popularity
      case 'Mejor valorados':
        return b.rating - a.rating
      case 'Descuentos':
        return (b.discount ?? 0) - (a.discount ?? 0)
      case 'Novedades':
        return Number(b.isNew) - Number(a.isNew)
      case 'Precio: de más alto a más bajo':
        return b.price - a.price
      case 'Precio: de más bajo a más alto':
        return a.price - b.price
      case 'En primer plano':
      default:
        return 0
    }
  })
}

function filterProducts(products: CatalogProduct[], filters: ProductFilters) {
  return products.filter((product) => {
    if (filters.color && !product.colors.includes(filters.color)) {
      return false
    }

    if (filters.finish && product.finishType !== filters.finish) {
      return false
    }

    if (filters.coverage && product.coverage !== filters.coverage) {
      return false
    }

    if (filters.rating && product.rating < filters.rating) {
      return false
    }

    return true
  })
}

export function CatalogSection({
  activeFilter,
  activeSort,
  onSelectFilter,
  onSelectSort,
}: CatalogSectionProps) {
  const { products: firestoreProducts, loading: productsLoading } = useProducts()
  const [showFilters, setShowFilters] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [pendingColor, setPendingColor] = useState<CatalogColorOption | null>(null)
  const [pendingFinish, setPendingFinish] = useState<CatalogFinishOption | null>(null)
  const [pendingCoverage, setPendingCoverage] = useState<CatalogCoverageOption | null>(null)
  const [pendingRating, setPendingRating] = useState<number | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<ProductFilters>({
    color: null,
    finish: null,
    coverage: null,
    rating: null,
  })
  const [pendingSort, setPendingSort] = useState<CatalogSort>(activeSort)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    setPendingSort(activeSort)
  }, [activeSort])

  // Use Firestore products if available, otherwise fall back to static data
  const catalogProducts = firestoreProducts.length > 0 ? firestoreProducts : (productsLoading ? [] : staticProducts)

  const categoryProducts =
    activeFilter === 'Todos'
      ? catalogProducts
      : catalogProducts.filter((product) => product.category === activeFilter)

  const filteredProducts = useMemo(
    () => filterProducts(categoryProducts, appliedFilters),
    [categoryProducts, appliedFilters],
  )

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, activeSort),
    [filteredProducts, activeSort],
  )

  const hasAdvancedFilters =
    Boolean(
      appliedFilters.color ||
        appliedFilters.finish ||
        appliedFilters.coverage ||
        appliedFilters.rating,
    )

  const clearColor = () => setPendingColor(null)
  const clearFinish = () => setPendingFinish(null)
  const clearCoverage = () => setPendingCoverage(null)
  const clearRating = () => setPendingRating(null)
  const clearAllPendingFilters = () => {
    setPendingColor(null)
    setPendingFinish(null)
    setPendingCoverage(null)
    setPendingRating(null)
  }
  const clearAllAppliedFilters = () => {
    setAppliedFilters({
      color: null,
      finish: null,
      coverage: null,
      rating: null,
    })
  }
  const resetCatalog = () => {
    clearAllPendingFilters()
    clearAllAppliedFilters()
    onSelectFilter('Todos')
  }

  const applyFilterSearch = () => {
    setAppliedFilters({
      color: pendingColor,
      finish: pendingFinish,
      coverage: pendingCoverage,
      rating: pendingRating,
    })
    setShowFilters(false)
  }

  const applySortSearch = () => {
    onSelectSort(pendingSort)
    setShowSortMenu(false)
  }

  return (
    <section
      id="catalogo"
      className="catalog-section scroll-mt-24 border-y px-5 py-20 sm:px-8"
    >
      <section className="mx-auto max-w-7xl catalog-inner relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl uppercase tracking-[0.12em] text-[#FFF9EF] sm:text-5xl">
              Maquillaje por linea, acabado y momento de uso.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[0.75rem] font-heading font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-md border ${
                hasAdvancedFilters || showFilters
                  ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_15px_rgba(238,199,127,0.3)]'
                  : 'bg-white/5 text-[#FFF9EF] border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              aria-expanded={showFilters}
              onClick={() => {
                setShowFilters((current) => !current)
                setShowSortMenu(false)
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filtros
            </button>
            <button
              type="button"
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[0.75rem] font-heading font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-md border ${
                showSortMenu
                  ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_15px_rgba(238,199,127,0.3)]'
                  : 'bg-white/5 text-[#FFF9EF] border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              aria-expanded={showSortMenu}
              onClick={() => {
                setShowSortMenu((current) => !current)
                setShowFilters(false)
              }}
            >
              Ordenar por
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden sm:flex flex-wrap gap-2" aria-label="Filtros de catalogo">
            {catalogFilters.map((filter) => {
              const isActive = activeFilter === filter

              return (
                <button
                  className={`rounded-full px-5 py-2 text-[0.68rem] font-heading font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm border ${
                    isActive
                      ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_10px_rgba(238,199,127,0.2)]'
                      : 'bg-white/5 text-[#FFF9EF]/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#EEC77F]'
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

          <p className="text-sm uppercase tracking-[0.18em] text-[#FFF9EF]/70">
            {sortedProducts.length} resultados · {activeSort}
          </p>
        </div>

        {showFilters && (
          <div className="catalog-panel mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="catalog-panel__header col-span-1 md:col-span-4">
              <span className="catalog-panel__header-label">Filtros</span>
              <button
                type="button"
                className="catalog-panel__close"
                onClick={() => setShowFilters(false)}
                aria-label="Cerrar filtros"
              >
                ×
              </button>
            </div>

            <div className="catalog-panel__section">
              <button
                type="button"
                className="catalog-panel__section-header"
                onClick={() => setExpandedSection((current) => (current === 'color' ? null : 'color'))}
                aria-expanded={expandedSection === 'color'}
              >
                <span>Color</span>
                <span className={`catalog-panel__section-icon ${expandedSection === 'color' ? 'catalog-panel__section-icon--open' : ''}`}>
                  ▾
                </span>
              </button>
              <div className={`catalog-panel__section-content ${expandedSection === 'color' ? 'block' : 'hidden'} md:block`}>
                <div className="flex items-center justify-end gap-4">
                  {pendingColor ? (
                    <button
                      type="button"
                      className="catalog-panel__clear"
                      onClick={clearColor}
                    >
                      Borrar
                    </button>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3 pb-3">
                  {catalogColorOptions.map((option) => {
                    const isActive = pendingColor === option.label
                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={`catalog-color-chip ${isActive ? 'catalog-color-chip--active' : ''}`}
                        style={{ backgroundColor: option.color }}
                        onClick={() => setPendingColor(option.label)}
                        aria-pressed={isActive}
                      >
                        <span className="sr-only">{option.label}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {pendingColor ? (
                    <span className="catalog-chip">Color: {pendingColor}</span>
                  ) : (
                    <span className="catalog-chip catalog-chip--muted">Selecciona un color para ver recomendaciones</span>
                  )}
                </div>
              </div>
            </div>

            <div className="catalog-panel__section">
              <button
                type="button"
                className="catalog-panel__section-header"
                onClick={() => setExpandedSection((current) => (current === 'finish' ? null : 'finish'))}
                aria-expanded={expandedSection === 'finish'}
              >
                <span>Finish</span>
                <span className={`catalog-panel__section-icon ${expandedSection === 'finish' ? 'catalog-panel__section-icon--open' : ''}`}>
                  ▾
                </span>
              </button>
              <div className={`catalog-panel__section-content ${expandedSection === 'finish' ? 'block' : 'hidden'} md:block`}>
                {pendingFinish && (
                  <div className="flex items-center justify-end mb-2">
                    <button type="button" className="catalog-panel__clear" onClick={clearFinish}>
                      Borrar
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {catalogFinishOptions.map((option) => {
                    const isActive = pendingFinish === option
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`rounded-full px-5 py-2.5 text-left font-heading text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm border ${
                          isActive
                            ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_10px_rgba(238,199,127,0.2)]'
                            : 'bg-white/5 text-[#FFF9EF]/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#EEC77F]'
                        }`}
                        onClick={() => setPendingFinish(option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="catalog-panel__section">
              <button
                type="button"
                className="catalog-panel__section-header"
                onClick={() => setExpandedSection((current) => (current === 'coverage' ? null : 'coverage'))}
                aria-expanded={expandedSection === 'coverage'}
              >
                <span>Cobertura</span>
                <span className={`catalog-panel__section-icon ${expandedSection === 'coverage' ? 'catalog-panel__section-icon--open' : ''}`}>
                  ▾
                </span>
              </button>
              <div className={`catalog-panel__section-content ${expandedSection === 'coverage' ? 'block' : 'hidden'} md:block`}>
                {pendingCoverage && (
                  <div className="flex items-center justify-end mb-2">
                    <button type="button" className="catalog-panel__clear" onClick={clearCoverage}>
                      Borrar
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {catalogCoverageOptions.map((option) => {
                    const isActive = pendingCoverage === option
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`rounded-full px-5 py-2.5 text-left font-heading text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm border ${
                          isActive
                            ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_10px_rgba(238,199,127,0.2)]'
                            : 'bg-white/5 text-[#FFF9EF]/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#EEC77F]'
                        }`}
                        onClick={() => setPendingCoverage(option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="catalog-panel__section">
              <button
                type="button"
                className="catalog-panel__section-header"
                onClick={() => setExpandedSection((current) => (current === 'rating' ? null : 'rating'))}
                aria-expanded={expandedSection === 'rating'}
              >
                <span>Calificación</span>
                <span className={`catalog-panel__section-icon ${expandedSection === 'rating' ? 'catalog-panel__section-icon--open' : ''}`}>
                  ▾
                </span>
              </button>
              <div className={`catalog-panel__section-content ${expandedSection === 'rating' ? 'block' : 'hidden'} md:block`}>
                {pendingRating && (
                  <div className="flex items-center justify-end mb-2">
                    <button type="button" className="catalog-panel__clear" onClick={clearRating}>
                      Borrar
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {catalogRatingOptions.map((option) => {
                    const isActive = pendingRating === option.value
                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={`rounded-full px-5 py-2.5 text-left font-heading text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm border ${
                          isActive
                            ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_10px_rgba(238,199,127,0.2)]'
                            : 'bg-white/5 text-[#FFF9EF]/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#EEC77F]'
                        }`}
                        onClick={() => setPendingRating(option.value)}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/5 pt-5">
              <button
                type="button"
                className="catalog-panel__clear px-4 py-2"
                onClick={clearAllPendingFilters}
              >
                Borrar todo
              </button>
              <button
                type="button"
                className="catalog-panel__search-button"
                onClick={applyFilterSearch}
              >
                Ver resultados
              </button>
            </div>
            {hasAdvancedFilters ? (
              <div className="col-span-4 mt-5 border-t border-[#EEC77F]/10 pt-5 text-sm text-[#FFF9EF]/75">
                <p>
                  Recomendado para: {appliedFilters.color ?? 'Cualquier color'} · {appliedFilters.finish ?? 'Cualquier acabado'} · {appliedFilters.coverage ?? 'Cualquier cobertura'} · {appliedFilters.rating ? `${appliedFilters.rating.toFixed(1)}+ estrellas` : 'Cualquier rating'}
                </p>
                <button
                  type="button"
                  className="catalog-panel__clear mt-3"
                  onClick={clearAllAppliedFilters}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="col-span-4 mt-5 border-t border-[#EEC77F]/10 pt-5 text-sm text-[#FFF9EF]/70">
                Selecciona un color, acabado, cobertura o rating para ver recomendaciones personalizadas.
              </div>
            )}
          </div>
        )}

        {showSortMenu && (
          <div className="catalog-panel mt-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-heading text-[0.72rem] uppercase tracking-[0.3em] text-[#EEC77F]">
                Ordenar por
              </p>
              <button
                type="button"
                className="catalog-panel__close"
                onClick={() => setShowSortMenu(false)}
                aria-label="Cerrar ordenar"
              >
                ×
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {catalogSortOptions.map((sortOption) => {
                const isActive = pendingSort === sortOption
                return (
                  <button
                    key={sortOption}
                    type="button"
                    className={`rounded-full px-5 py-3 text-center font-heading text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-all duration-300 backdrop-blur-sm border ${
                      isActive
                        ? 'bg-[#EEC77F] text-[#1A120A] border-[#EEC77F] shadow-[0_0_10px_rgba(238,199,127,0.2)]'
                        : 'bg-white/5 text-[#FFF9EF]/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-[#EEC77F]'
                    }`}
                    onClick={() => setPendingSort(sortOption)}
                  >
                    {sortOption}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              className="catalog-panel__search-button mt-4"
              onClick={applySortSearch}
            >
              Buscar orden
            </button>
          </div>
        )}

        {sortedProducts.length === 0 ? (
          <div className="mt-12 rounded-[1.5rem] border border-[#EEC77F]/15 bg-[#0a0a0a]/50 p-10 text-center text-[#FFF9EF]/80">
            <p className="mb-4 font-heading text-lg uppercase tracking-[0.18em] text-[#EEC77F]">
              No se encontraron resultados
            </p>
            <p className="max-w-2xl mx-auto mb-6 text-sm leading-7 text-[#FFF9EF]/70">
              Ajusta los filtros o vuelve al catálogo principal para ver todos los looks sin filtros.
            </p>
            <button
              type="button"
              className="catalog-panel__search-button"
              onClick={resetCatalog}
            >
              Volver al catálogo
            </button>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <li key={product.id}>
                <CatalogProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
