import { principles } from '../data/content'

function PrincipleIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'contrast':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 18a6 6 0 0 0 0-12v12z" fill="currentColor" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
        </svg>
      )
    case 'typography':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      )
    case 'precision':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
      )
    default:
      return null
  }
}

export function BrandPrinciples() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div className="border-l-2 border-[#EEC77F] pl-6">
            <p className="font-heading text-xs uppercase tracking-[0.42em] text-[#EEC77F]">
              Filosofia de Marca
            </p>
            <h2 className="mt-3 font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
              Negro absoluto, oro metalico, precision visual.
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#FFF9EF]/70">
            Nuestros principios rectores definen la experiencia GOD LAB: una combinacion entre la estetica ceremonial del lujo clasico y la vanguardia editorial moderna.
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <li key={principle.number} className="principle-card rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="principle-card__number">{principle.number} / 04</span>
                <div className="principle-card__icon">
                  <PrincipleIcon icon={principle.icon} />
                </div>
              </div>
              <h3 className="principle-card__title mt-6">
                {principle.title}
              </h3>
              <p className="principle-card__description mt-3">
                {principle.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
