import type { PageId } from '../data/navigation'
import logo from '../assets/logo.png'

type HeroSectionProps = {
  onNavigate: (page: PageId) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
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
            Un laboratorio de belleza premium donde cada look se disena como
            una pieza de presencia, brillo y precision editorial.
          </p>
          <nav
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            aria-label="Acciones principales"
          >
            <a
              className="hero-action hero-action--primary"
              href="#contacto"
              onClick={() => onNavigate('contacto')}
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
          <img
            className="hero-visual__logo absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#EEC77F]/55 object-cover"
            src={logo}
            alt="Logo de GOD LAB"
          />
          <figcaption className="sr-only">
            Logo de GOD LAB dentro de un marco circular.
          </figcaption>
        </figure>
      </section>
    </section>
  )
}
