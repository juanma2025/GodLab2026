import { useEffect, useState } from 'react'
import { BrandPrinciples } from './components/BrandPrinciples'
import { CatalogSection } from './components/CatalogSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { MethodSection } from './components/MethodSection'
import { PortfolioLines } from './components/PortfolioLines'
import type { CatalogFilter } from './data/catalog'
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
  const [isLightMode, setIsLightMode] = useState(false)

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
            onSelectFilter={setActiveFilter}
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
      <Header
        activePage={activePage}
        isLightMode={isLightMode}
        onNavigate={handleNavigate}
        onToggleTheme={() => setIsLightMode((currentMode) => !currentMode)}
      />

      <main className="site-shell min-h-screen overflow-hidden">{renderPage()}</main>

      <Footer />
    </div>
  )
}

export default App
