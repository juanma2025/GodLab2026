import { navigationPages } from '../data/navigation'
import type { PageId } from '../data/navigation'

type FooterProps = {
  onNavigate: (page: PageId) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand column */}
        <div>
          <p className="footer-brand">GOD LAB</p>
          <p className="footer-tagline">
            Laboratorio de belleza premium donde cada look se disena como una pieza de presencia, brillo y precision editorial.
          </p>
          <div className="footer-social">
            <a
              className="footer-social-link"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              className="footer-social-link"
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.89a8.28 8.28 0 004.76 1.52V6.96a4.84 4.84 0 01-1-.27z" />
              </svg>
            </a>
            <a
              className="footer-social-link"
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <p className="footer-heading">Navegacion</p>
          <nav aria-label="Navegacion del footer">
            {navigationPages.map((page) => (
              <a
                key={page.id}
                className="footer-link"
                href={`#${page.id}`}
                onClick={() => onNavigate(page.id)}
              >
                {page.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Services column */}
        <div>
          <p className="footer-heading">Servicios</p>
          <span className="footer-link">Editorial Beauty</span>
          <span className="footer-link">Luxury Bridal</span>
          <span className="footer-link">Social Prestige</span>
          <span className="footer-link">Campaign Makeup</span>
        </div>

        {/* Contact column */}
        <div>
          <p className="footer-heading">Contacto</p>
          <a className="footer-link" href="mailto:contacto@godlab.com">
            contacto@godlab.com
          </a>
          <a className="footer-link" href="tel:+521234567890">
            +52 (123) 456 7890
          </a>
          <span className="footer-link">Lun — Sab / 9:00 — 19:00</span>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copyright">
        &copy; {year} GOD LAB — Prestige Beauty Portfolio. Todos los derechos reservados.
      </p>
    </footer>
  )
}
