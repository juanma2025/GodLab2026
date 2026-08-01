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
  const handleNavigate = (page: PageId) => {
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
            className="reserve-link border px-4 py-2 font-heading text-[0.64rem] font-semibold uppercase tracking-[0.24em] transition"
            href="#contacto"
            onClick={() => handleNavigate('contacto')}
          >
            Reservar
          </a>
        </div>
      </nav>
    </header>
  )
}
