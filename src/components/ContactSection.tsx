import { useState } from 'react'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="font-heading text-xs uppercase tracking-[0.42em] text-[#EEC77F]">
            GOD LAB Experience
          </p>
          <h2 className="mt-4 font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
            Reserva una experiencia exclusiva
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#FFF9EF]/70">
            Agenda una sesion personalizada de belleza editorial, nupcial o para eventos especiales.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Information Column */}
          <div className="contact-card border border-[#EEC77F]/35 p-8 sm:p-10 shadow-[0_0_80px_rgba(123,85,39,0.15)] rounded-2xl">
            <h3 className="font-heading text-xl uppercase tracking-[0.18em] text-[#EEC77F] mb-6">
              Informacion de contacto
            </h3>

            <div className="space-y-4">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">Email</p>
                  <a href="mailto:contacto@godlab.com" className="text-base text-[#FFF9EF]/90 hover:text-[#EEC77F] transition">
                    contacto@godlab.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">Telefono / WhatsApp</p>
                  <a href="tel:+521234567890" className="text-base text-[#FFF9EF]/90 hover:text-[#EEC77F] transition">
                    +52 (123) 456 7890
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">Atelier Studio</p>
                  <p className="text-base text-[#FFF9EF]/90">
                    Av. de la Primavera 1420, Polanco, CDMX
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">Horarios</p>
                  <p className="text-base text-[#FFF9EF]/90">
                    Lunes a Sabado: 9:00 — 19:00 hrs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-card border border-[#EEC77F]/35 p-8 sm:p-10 shadow-[0_0_80px_rgba(123,85,39,0.15)] rounded-2xl">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#EEC77F] bg-[#EEC77F]/10 text-[#EEC77F]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl uppercase tracking-[0.14em] text-[#EEC77F]">
                  Solicitud Recibida
                </h3>
                <p className="mt-4 text-base text-[#FFF9EF]/80">
                  Gracias por contactar a GOD LAB. Nos comunicaremos contigo a la brevedad para coordinar los detalles de tu experiencia.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="contact-submit mt-8"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div>
                  <label htmlFor="name" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Ej. Valeria Mendoza"
                    className="contact-input"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="valeria@ejemplo.com"
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+52 55 1234 5678"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                    Servicio de Interes
                  </label>
                  <select id="service" className="contact-select">
                    <option value="editorial">Editorial Beauty</option>
                    <option value="bridal">Luxury Bridal</option>
                    <option value="social">Social Prestige</option>
                    <option value="campaign">Campaign Makeup</option>
                    <option value="other">Consulta General</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                    Detalles del evento o mensaje *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Cuentanos la fecha, tipo de evento o concepto que buscas..."
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" className="contact-submit w-full mt-2">
                  Enviar Solicitud
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
