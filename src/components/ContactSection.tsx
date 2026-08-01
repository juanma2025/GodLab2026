export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-24 px-5 py-24 text-center sm:px-8">
      <article className="contact-card mx-auto max-w-4xl border border-[#EEC77F]/25 bg-[#0A0A0A] px-6 py-14 shadow-[0_0_80px_rgba(123,85,39,0.2)] sm:px-12">
        <p className="font-heading text-xs uppercase tracking-[0.38em] text-[#EEC77F]">
          GOD LAB Experience
        </p>
        <h2 className="mt-5 font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
          Agenda una experiencia de belleza con sello premium.
        </h2>
        <a
          className="mt-10 inline-flex border border-[#EEC77F] bg-[#EEC77F] px-7 py-3 font-heading text-xs font-bold uppercase tracking-[0.26em] text-black transition hover:bg-[#FFF9EF]"
          href="mailto:contacto@godlab.com"
        >
          contacto@godlab.com
        </a>
      </article>
    </section>
  )
}
