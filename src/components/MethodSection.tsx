import { methodSteps } from '../data/content'

export function MethodSection() {
  return (
    <section
      id="metodo"
      className="method-section scroll-mt-24 bg-[linear-gradient(180deg,#0A0A0A_0%,#000000_100%)] px-5 py-20 sm:px-8"
    >
      <section className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-8 border-b border-[#EEC77F]/15 pb-10 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
            Metodo creado para verse impecable en vivo y en camara.
          </h2>
          <p className="max-w-md leading-7 text-[#FFF9EF]/68">
            Cada entrega combina lectura del rostro, intencion estetica,
            seleccion cromatica y ejecucion de alto detalle.
          </p>
        </header>
        <ol className="grid gap-5 pt-10 md:grid-cols-3">
          {methodSteps.map((step) => (
            <li className="method-step border border-[#EEC77F]/16 p-7" key={step.value}>
              <strong className="bg-[linear-gradient(135deg,#7B5527,#EEC77F,#FFF9EF)] bg-clip-text font-heading text-5xl font-semibold text-transparent">
                {step.value}
              </strong>
              <p className="mt-6 font-heading text-sm uppercase tracking-[0.24em] text-[#FFF9EF]">
                {step.label}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </section>
  )
}
