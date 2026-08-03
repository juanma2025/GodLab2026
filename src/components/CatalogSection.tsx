import { useEffect, useMemo, useState } from 'react'
import { CatalogProductCard } from './CatalogProductCard'
import {
  catalogColorOptions,
  catalogCoverageOptions,
  catalogFilters,
  catalogFinishOptions,
  catalogProducts,
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

  useEffect(() => {
    setPendingSort(activeSort)
  }, [activeSort])

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
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="mt-4 max-w-4xl font-heading text-3xl uppercase tracking-[0.12em] text-[#FFF9EF] sm:text-5xl">
              Maquillaje por linea, acabado y momento de uso.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="catalog-filter-btn border px-4 py-3 text-[0.72rem] font-heading font-semibold uppercase tracking-[0.2em] text-[#FFF9EF] transition hover:border-[#EEC77F] hover:text-[#EEC77F]"
              aria-expanded={showFilters}
              onClick={() => {
                setShowFilters((current) => !current)
                setShowSortMenu(false)
              }}
            >
              Filtros
            </button>
            <button
              type="button"
              className="catalog-filter-btn border px-4 py-3 text-[0.72rem] font-heading font-semibold uppercase tracking-[0.2em] text-[#FFF9EF] transition hover:border-[#EEC77F] hover:text-[#EEC77F]"
              aria-expanded={showSortMenu}
              onClick={() => {
                setShowSortMenu((current) => !current)
                setShowFilters(false)
              }}
            >
              Ordenar por
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden sm:flex flex-wrap gap-3" aria-label="Filtros de catalogo">
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

          <p className="text-sm uppercase tracking-[0.18em] text-[#FFF9EF]/70">
            {sortedProducts.length} resultados · {activeSort}
          </p>
        </div>

        {showFilters && (
          <div className="catalog-panel mt-5">
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="catalog-panel__section">
                <div className="flex items-center justify-between gap-4">
                  <p className="mb-3 font-heading text-[0.72rem] uppercase tracking-[0.3em] text-[#EEC77F]">
                    Color
                  </p>
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
                <div className="grid auto-cols-max grid-flow-col gap-3 overflow-x-auto pb-3">
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

              <div className="grid gap-4">
                <div className="catalog-panel__section">
                  <div className="flex items-center justify-between gap-4">
                    <p className="mb-3 font-heading text-[0.72rem] uppercase tracking-[0.3em] text-[#EEC77F]">
                      Finish
                    </p>
                    {pendingFinish ? (
                      <button
                        type="button"
                        className="catalog-panel__clear"
                        onClick={clearFinish}
                      >
                        Borrar
                      </button>
                    ) : null}
                  </div>
                  <div className="grid gap-3">
                    {catalogFinishOptions.map((option) => {
                      const isActive = pendingFinish === option
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`catalog-filter border px-4 py-3 text-left font-heading text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition ${
                            isActive
                              ? 'catalog-filter--active'
                              : 'border-[#EEC77F]/25 text-[#FFF9EF]/76 hover:border-[#EEC77F] hover:text-[#EEC77F]'
                          }`}
                          onClick={() => setPendingFinish(option)}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="catalog-panel__section">
                  <div className="flex items-center justify-between gap-4">
                    <p className="mb-3 font-heading text-[0.72rem] uppercase tracking-[0.3em] text-[#EEC77F]">
                      Cobertura
                    </p>
                    {pendingCoverage ? (
                      <button
                        type="button"
                        className="catalog-panel__clear"
                        onClick={clearCoverage}
                      >
                        Borrar
                      </button>
                    ) : null}
                  </div>
                  <div className="grid gap-3">
                    {catalogCoverageOptions.map((option) => {
                      const isActive = pendingCoverage === option
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`catalog-filter border px-4 py-3 text-left font-heading text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition ${
                            isActive
                              ? 'catalog-filter--active'
                              : 'border-[#EEC77F]/25 text-[#FFF9EF]/76 hover:border-[#EEC77F] hover:text-[#EEC77F]'
                          }`}
                          onClick={() => setPendingCoverage(option)}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="catalog-panel__section">
                  <div className="flex items-center justify-between gap-4">
                    <p className="mb-3 font-heading text-[0.72rem] uppercase tracking-[0.3em] text-[#EEC77F]">
                      Calificación
                    </p>
                    {pendingRating ? (
                      <button
                        type="button"
                        className="catalog-panel__clear"
                        onClick={clearRating}
                      >
                        Borrar
                      </button>
                    ) : null}
                  </div>
                  <div className="grid gap-3">
                    {catalogRatingOptions.map((option) => {
                      const isActive = pendingRating === option.value
                      return (
                        <button
                          key={option.label}
                          type="button"
                          className={`catalog-filter border px-4 py-3 text-left font-heading text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition ${
                            isActive
                              ? 'catalog-filter--active'
                              : 'border-[#EEC77F]/25 text-[#FFF9EF]/76 hover:border-[#EEC77F] hover:text-[#EEC77F]'
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
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                className="catalog-panel__search-button"
                onClick={applyFilterSearch}
              >
                Buscar filtros
              </button>
              <button
                type="button"
                className="catalog-panel__clear"
                onClick={clearAllPendingFilters}
              >
                Limpiar selección
              </button>
            </div>
            {hasAdvancedFilters ? (
              <div className="mt-5 border-t border-[#EEC77F]/10 pt-5 text-sm text-[#FFF9EF]/75">
                <p>
                  Recomendado para: {appliedFilters.color ?? 'Cualquier color'} · {appliedFilters.finish ?? 'Cualquier acabado'} · {appliedFilters.coverage ?? 'Cualquier cobertura'} · {appliedFilters.rating ? `${appliedFilters.rating.toFixed(1)}+ estrellas` : 'Cualquier rating'}
                </p>
                <button
                  type="button"
                  className="catalog-panel__clear"
                  onClick={clearAllAppliedFilters}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="mt-5 border-t border-[#EEC77F]/10 pt-5 text-sm text-[#FFF9EF]/70">
                Selecciona un color, acabado, cobertura o rating para ver recomendaciones personalizadas.
              </div>
            )}
          </div>
        )}

        {showSortMenu && (
          <div className="catalog-panel mt-5">
            <p className="mb-3 font-heading text-[0.72rem] uppercase tracking-[0.3em] text-[#EEC77F]">
              Ordenar por
            </p>
            <div className="grid gap-3 lg:grid-cols-2">
              {catalogSortOptions.map((sortOption) => {
                const isActive = pendingSort === sortOption
                return (
                  <button
                    key={sortOption}
                    type="button"
                    className={`catalog-filter border px-4 py-3 text-left font-heading text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition ${
                      isActive
                        ? 'catalog-filter--active'
                        : 'border-[#EEC77F]/25 text-[#FFF9EF]/76 hover:border-[#EEC77F] hover:text-[#EEC77F]'
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
