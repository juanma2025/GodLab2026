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
    <header className="site-header fixed inset-x-0 top-0 z-50 transition-colors duration-200 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8"
        aria-label="Navegacion principal"
      >
        {/* ZONA 1: Logo (Izquierda) */}
        <div className="flex items-center">
          <a
            className="brand-link font-heading text-base font-bold uppercase tracking-[0.34em] transition-colors duration-200"
            href="#inicio"
            onClick={() => handleNavigate('inicio')}
          >
            GOD LAB
          </a>
        </div>

        {/* ZONA 2: Navegacion (Centro - Desktop) */}
        <ul className="nav-links hidden items-center gap-6 lg:gap-9 font-heading text-[0.7rem] uppercase tracking-[0.2em] md:flex">
          {navigationPages.map((page) => {
            const isActive = activePage === page.id

            return (
              <li key={page.id}>
                <a
                  className={`nav-link-item relative py-1 transition-colors duration-200 ${
                    isActive ? 'nav-link-item--active' : ''
                  }`}
                  href={`#${page.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleNavigate(page.id)}
                >
                  {page.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* ZONA 3: Acciones (Derecha) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Toggle Modo Oscuro: Boton circular pequeño 34x34px solo con icono */}
          <button
            className="theme-toggle-icon-btn flex h-[34px] w-[34px] items-center justify-center rounded-full border transition-all duration-200 cursor-pointer"
            type="button"
            aria-label={isLightMode ? 'Alternar modo oscuro' : 'Alternar modo claro'}
            aria-pressed={isLightMode}
            onClick={onToggleTheme}
          >
            {isLightMode ? (
              /* Icono Luna (para volver a modo oscuro) */
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Icono Sol (para activar modo claro) */
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Boton RESERVAR: CTA Principal con fondo dorado solido, border-radius 6px, padding 10px 22px */}
          <a
            className="reserve-cta-btn font-heading text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-all duration-200"
            href="#contacto"
            onClick={() => handleNavigate('contacto')}
          >
            Reservar
          </a>

          {/* Boton Hamburguesa Mobile */}
          <button
            type="button"
            className="mobile-menu-button flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#a5822f]/30 bg-transparent text-current transition-colors duration-200 md:hidden cursor-pointer"
            aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span
              className={`mobile-menu-icon ${menuOpen ? 'mobile-menu-icon--open' : ''}`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      {/* Menu desplegable Mobile */}
      {menuOpen ? (
        <div
          className={`mobile-menu-panel ${isLightMode ? 'mobile-menu-panel--light' : ''} border-t md:hidden`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8">
            <ul className="flex flex-col gap-4 font-heading text-xs uppercase tracking-[0.22em]">
              {navigationPages.map((page) => (
                <li key={page.id}>
                  <button
                    type="button"
                    className={`mobile-menu-link w-full text-left transition-colors duration-200 ${
                      activePage === page.id ? 'text-[#a5822f] font-bold' : ''
                    }`}
                    onClick={() => handleNavigate(page.id)}
                  >
                    {page.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  )
}
