import type { PageId } from '../data/navigation'

type HeroSectionProps = {
  onNavigate: (page: PageId) => void
  onReserve: () => void
}

export function HeroSection({ onNavigate, onReserve }: HeroSectionProps) {
  return (
    <section id="inicio" className="hero-section relative isolate flex min-h-screen items-center px-5 pb-16 pt-28 sm:px-8">
      <span className="hero-section__background pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_74%_22%,rgba(238,199,127,0.22),transparent_28%),linear-gradient(120deg,#000000_0%,#0A0A0A_45%,#000000_100%)]" />
      <span className="hero-section__glow pointer-events-none absolute right-[-18rem] top-20 -z-20 h-[42rem] w-[42rem] rounded-full border border-[#EEC77F]/15 bg-[conic-gradient(from_120deg,transparent,#7B5527,#EEC77F,#976C35,transparent)] opacity-40 blur-[1px]" />
      <span className="hero-section__ring pointer-events-none absolute bottom-[-14rem] left-1/2 -z-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-[#976C35]/25" />

      <section className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <article className="max-w-3xl">
          <p className="font-heading text-xs uppercase tracking-[0.42em] text-[#EEC77F]">
            Prestige / Exclusividad / Beauty / Divinity / Makeup
          </p>
          <h1 className="mt-7 bg-[linear-gradient(135deg,#7B5527_0%,#976C35_34%,#EEC77F_72%,#FFF9EF_100%)] bg-clip-text font-heading text-5xl font-semibold uppercase leading-[0.95] tracking-[0.16em] text-transparent sm:text-7xl lg:text-8xl [-webkit-text-stroke:1px_rgba(238,199,127,0.38)]">
            GOD LAB
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#FFF9EF]/76 sm:text-xl">
            Belleza, calidad y prestigio en cada detalle. Diseñamos looks premium para la mujer que valora la excelencia, con el respaldo de una marca de referencia.
          </p>
          <nav
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            aria-label="Acciones principales"
          >
            <a
              className="hero-action hero-action--primary"
              href="#contacto"
              onClick={onReserve}
            >
              Iniciar experiencia
            </a>
            <a
              className="hero-action hero-action--secondary"
              href="#catalogo"
              onClick={() => onNavigate('catalogo')}
            >
              Ver catalogo
            </a>
          </nav>
        </article>

        <figure className="hero-visual relative mx-auto aspect-square w-full max-w-136">
          <span className="hero-visual__glow absolute inset-5 rounded-full border border-[#EEC77F]/20" />
          <span className="hero-visual__ring absolute inset-12 rounded-full border border-[#976C35]/35" />
          <span className="hero-visual__background absolute inset-0 rounded-full opacity-85 shadow-[0_0_80px_rgba(151,108,53,0.25)]" />
          <div className="hero-visual__logo absolute inset-0 m-auto flex h-56 w-56 items-center justify-center rounded-full border border-[#EEC77F]/55 bg-black shadow-[inset_0_0_20px_rgba(238,199,127,0.2)]">
            <svg viewBox="0 0 200 200" className="h-48 w-48 drop-shadow-[0_0_10px_rgba(238,199,127,0.3)]" aria-label="Logo de GOD LAB">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF9EF" />
                  <stop offset="30%" stopColor="#EEC77F" />
                  <stop offset="70%" stopColor="#976C35" />
                  <stop offset="100%" stopColor="#7B5527" />
                </linearGradient>
                <linearGradient id="goldGradientLight" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#976C35" />
                  <stop offset="50%" stopColor="#EEC77F" />
                  <stop offset="100%" stopColor="#FFF9EF" />
                </linearGradient>
              </defs>
              
              {/* Outer decorative ring */}
              <circle cx="100" cy="100" r="92" fill="none" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="url(#goldGradientLight)" strokeWidth="0.5" opacity="0.4" />
              
              {/* G and L monogram */}
              <g transform="translate(0, 10)">
                <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fill="url(#goldGradient)" fontFamily="Cinzel, serif" fontSize="82" fontWeight="400" letterSpacing="-2">
                  G
                </text>
                <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="url(#goldGradientLight)" fontFamily="Cinzel, serif" fontSize="72" fontWeight="300" letterSpacing="-4" opacity="0.9">
                  L
                </text>
              </g>

              {/* Lab text */}
              <text x="50%" y="85%" dominantBaseline="middle" textAnchor="middle" fill="url(#goldGradient)" fontFamily="Cinzel, serif" fontSize="14" fontWeight="600" letterSpacing="8" opacity="0.8">
                LAB
              </text>
              
              {/* Decorative stars */}
              <path d="M 30,100 L 33,103 L 40,103 L 35,108 L 37,115 L 30,111 L 23,115 L 25,108 L 20,103 L 27,103 Z" fill="url(#goldGradientLight)" transform="scale(0.5) translate(20, 95)" opacity="0.7" />
              <path d="M 30,100 L 33,103 L 40,103 L 35,108 L 37,115 L 30,111 L 23,115 L 25,108 L 20,103 L 27,103 Z" fill="url(#goldGradientLight)" transform="scale(0.5) translate(320, 95)" opacity="0.7" />
            </svg>
          </div>
          <figcaption className="sr-only">
            Logo de GOD LAB en formato vectorial interactivo.
          </figcaption>
        </figure>
      </section>
    </section>
  )
}
