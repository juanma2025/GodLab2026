import { useEffect, useState } from 'react'
import { BrandPrinciples } from './components/BrandPrinciples'
import { CatalogSection } from './components/CatalogSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { MethodSection } from './components/MethodSection'
import { PortfolioLines } from './components/PortfolioLines'
import { ScrollToTop } from './components/ScrollToTop'
import type { CatalogFilter, CatalogSort } from './data/catalog'
import type { PageId } from './data/navigation'

const pageTitles: Record<PageId, string> = {
  inicio: 'GOD LAB',
  catalogo: 'Catalogo / GOD LAB',
  marca: 'Marca / GOD LAB',
  metodo: 'Metodo / GOD LAB',
  portafolio: 'Portafolio / GOD LAB',
  contacto: 'Contacto / GOD LAB',
}

const pageIds = Object.keys(pageTitles) as PageId[]

function getPageFromHash(): PageId {
  const hashPage = window.location.hash.replace('#', '') as PageId

  return pageIds.includes(hashPage) ? hashPage : 'inicio'
}

function App() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash)
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>('Todos')
  const [activeSort, setActiveSort] = useState<CatalogSort>('En primer plano')
  const [isLightMode, setIsLightMode] = useState(false)
  const [pageKey, setPageKey] = useState(0)

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = pageTitles[activePage]
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setPageKey((prev) => prev + 1)
  }, [activePage])

  useEffect(() => {
    document.body.classList.toggle('theme-light', isLightMode)
    document.body.classList.toggle('theme-dark', !isLightMode)
  }, [isLightMode])

  const handleNavigate = (page: PageId) => {
    setActivePage(page)
    window.history.pushState(null, '', `#${page}`)
  }

  const handleOpenCatalog = (filter: CatalogFilter = 'Todos') => {
    setActiveFilter(filter)
    handleNavigate('catalogo')
  }

  const renderPage = () => {
    switch (activePage) {
      case 'catalogo':
        return (
          <CatalogSection
            activeFilter={activeFilter}
            activeSort={activeSort}
            onSelectFilter={setActiveFilter}
            onSelectSort={setActiveSort}
          />
        )
      case 'marca':
        return <BrandPrinciples />
      case 'metodo':
        return <MethodSection />
      case 'portafolio':
        return (
          <PortfolioLines
            activeFilter={activeFilter}
            onSelectLine={handleOpenCatalog}
          />
        )
      case 'contacto':
        return <ContactSection />
      case 'inicio':
      default:
        return <HeroSection onNavigate={handleNavigate} />
    }
  }

  return (
    <div className={isLightMode ? 'theme-light' : 'theme-dark'}>
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <Header
        activePage={activePage}
        isLightMode={isLightMode}
        onNavigate={handleNavigate}
        onToggleTheme={() => setIsLightMode((currentMode) => !currentMode)}
      />

      <main id="main-content" className="site-shell min-h-screen overflow-hidden pt-20">
        <div key={pageKey} className="page-enter">
          {renderPage()}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />
      <ScrollToTop />
    </div>
  )
}

export default App
