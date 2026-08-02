import { useState } from 'react'
import { navigationPages } from '../data/navigation'
import type { PageId } from '../data/navigation'

type HeaderProps = {
  activePage: PageId
  isLightMode: boolean
  onNavigate: (page: PageId) => void
  onToggleTheme: () => void
}

export function Header({
  activePage,
  isLightMode,
  onNavigate,
  onToggleTheme,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (page: PageId) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Navegacion principal"
      >
        <a
          className="brand-link font-heading text-lg font-semibold uppercase tracking-[0.34em]"
          href="#inicio"
          onClick={() => handleNavigate('inicio')}
        >
          GOD LAB
        </a>
        <ul className="nav-links hidden items-center gap-8 text-xs uppercase tracking-[0.28em] md:flex">
          {navigationPages.map((page) => (
            <li key={page.id}>
              <a
                className={`transition hover:text-[#EEC77F] ${
                  activePage === page.id ? 'text-[#EEC77F]' : ''
                }`}
                href={`#${page.id}`}
                aria-current={activePage === page.id ? 'page' : undefined}
                onClick={() => handleNavigate(page.id)}
              >
                {page.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            className="theme-toggle inline-flex items-center gap-2 border font-heading text-[0.64rem] font-semibold uppercase tracking-[0.18em] transition"
            type="button"
            aria-label={isLightMode ? 'Activar modo oscuro' : 'Activar modo claro'}
            aria-pressed={isLightMode}
            onClick={onToggleTheme}
          >
            <span className="theme-toggle__icon" aria-hidden="true" />
            {isLightMode ? 'Oscuro' : 'Claro'}
          </button>
          <a
            className="reserve-link border px-4 py-2 font-heading text-[0.64rem] font-semibold uppercase tracking-[0.24em] transition hidden md:inline-flex"
            href="#contacto"
            onClick={() => handleNavigate('contacto')}
          >
            Reservar
          </a>
          <button
            type="button"
            className="mobile-menu-button inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FFF9EF] transition hover:border-[#EEC77F] hover:text-[#EEC77F] md:hidden"
            aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span className="mobile-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className={`mobile-menu-panel ${isLightMode ? 'mobile-menu-panel--light' : ''} border-t md:hidden`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8">
            <ul className="flex flex-col gap-4 text-sm uppercase tracking-[0.26em] text-[#FFF9EF]/90">
              {navigationPages.map((page) => (
                <li key={page.id}>
                  <button
                    type="button"
                    className={`mobile-menu-link w-full text-left transition hover:text-[#EEC77F] ${
                      activePage === page.id ? 'text-[#EEC77F]' : ''
                    }`}
                    onClick={() => handleNavigate(page.id)}
                  >
                    {page.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="reserve-link inline-flex items-center justify-center border px-4 py-3 font-heading text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition w-full"
                onClick={() => handleNavigate('contacto')}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
