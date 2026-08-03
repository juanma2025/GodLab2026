import { principles } from '../data/content'

export function BrandPrinciples() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="border-l border-[#EEC77F]/35 pl-6">
          <h2 className="mt-5 font-heading text-3xl uppercase tracking-[0.14em] sm:text-4xl">
            Negro absoluto, oro metalico, precision visual.
          </h2>
        </aside>
        <ul className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <li
              className="border border-[#976C35]/30 bg-[#0A0A0A]/78 p-6 text-lg leading-7 text-[#FFF9EF]/76"
              key={principle}
            >
              {principle}
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
