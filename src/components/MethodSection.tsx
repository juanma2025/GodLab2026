import { methodSteps } from '../data/content'

export function MethodSection() {
  return (
    <section
      id="metodo"
      className="method-section scroll-mt-24 bg-[linear-gradient(180deg,#0A0A0A_0%,#000000_100%)] px-5 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-8 border-b border-[#EEC77F]/15 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="font-heading text-xs uppercase tracking-[0.42em] text-[#EEC77F]">
              Proceso Editorial
            </p>
            <h2 className="mt-3 max-w-3xl font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
              Metodo creado para verse impecable en vivo y en camara.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#FFF9EF]/68">
            Cada entrega combina lectura del rostro, intencion estetica,
            seleccion cromatica y ejecucion de alto detalle.
          </p>
        </header>

        <div className="method-timeline pt-12">
          <ol className="grid gap-6 md:grid-cols-3">
            {methodSteps.map((step) => (
              <li
                className="method-step rounded-2xl border border-[#EEC77F]/20 bg-[#0A0A0A]/90 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                key={step.value}
              >
                <div className="flex items-center justify-between">
                  <strong className="bg-[linear-gradient(135deg,#7B5527,#EEC77F,#FFF9EF)] bg-clip-text font-heading text-5xl font-semibold text-transparent">
                    {step.value}
                  </strong>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEC77F]/30 bg-[#EEC77F]/10 text-[#EEC77F]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>

                <h3 className="mt-6 font-heading text-base uppercase tracking-[0.2em] text-[#FFF9EF]">
                  {step.label}
                </h3>
                <p className="method-step__description mt-3">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
