import { useState } from 'react'

export type ContactMode = 'contact' | 'reservation'

type ContactSectionProps = {
  mode: ContactMode
  onModeChange: (mode: ContactMode) => void
}

export function ContactSection({ mode, onModeChange }: ContactSectionProps) {
  const [submittedMode, setSubmittedMode] = useState<ContactMode | null>(null)
  const [gmailDraftUrl, setGmailDraftUrl] = useState('')
  const isReservation = mode === 'reservation'
  const submitted = submittedMode === mode

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const getValue = (field: string) => String(formData.get(field) ?? '').trim()
    const requestSelect = e.currentTarget.elements.namedItem(
      isReservation ? 'service' : 'subject',
    ) as HTMLSelectElement | null
    const requestType = requestSelect?.selectedOptions[0]?.text ?? ''
    const name = getValue('name')
    const message = getValue('message')
    const subject = isReservation
      ? `Solicitud de reserva - ${name}`
      : `Consulta desde GOD LAB - ${name}`
    const body = [
      `Tipo de solicitud: ${isReservation ? 'Reserva de asesoría' : 'Consulta'}`,
      `Nombre: ${name}`,
      `Email: ${getValue('email')}`,
      `Teléfono: ${getValue('phone') || 'No proporcionado'}`,
      `${isReservation ? 'Tipo de asesoría' : 'Motivo'}: ${requestType}`,
      isReservation ? `Fecha: ${getValue('date')}` : '',
      isReservation ? `Hora: ${getValue('time')}` : '',
      `Mensaje: ${message || 'Sin comentarios adicionales'}`,
    ].filter(Boolean).join('\n')
    const gmailParams = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: 'goblab2026@gmail.com',
      su: subject,
      body,
    })

    const draftUrl = `https://mail.google.com/mail/?${gmailParams.toString()}`

    setGmailDraftUrl(draftUrl)
    window.open(
      draftUrl,
      '_blank',
      'noopener,noreferrer',
    )
    setSubmittedMode(mode)
  }

  const handleModeChange = (nextMode: ContactMode) => {
    setSubmittedMode(null)
    setGmailDraftUrl('')
    onModeChange(nextMode)
  }

  return (
    <section id="contacto" className="scroll-mt-24 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <p className="font-heading text-xs uppercase tracking-[0.42em] text-[#EEC77F]">
            GOD LAB Atención
          </p>
          <h2 className="mt-4 font-heading text-3xl uppercase tracking-[0.14em] sm:text-5xl">
            Contacto y reservas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#FFF9EF]/70">
            Visítanos y descubre nuestra selección de maquillaje. Agenda una asesoría personalizada o escríbenos para consultar productos y disponibilidad.
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
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">Correo / Gmail</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=goblab2026%40gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribir a GOD LAB en Gmail"
                    className="text-base text-[#FFF9EF]/90 hover:text-[#EEC77F] transition"
                  >
                    goblab2026@gmail.com
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
                  <a
                    href="https://wa.me/573024993023?text=Hola%20GOD%20LAB%2C%20quiero%20recibir%20informaci%C3%B3n."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar a GOD LAB por WhatsApp"
                    className="text-base text-[#FFF9EF]/90 hover:text-[#EEC77F] transition"
                  >
                    +57 302 499 3023
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">Instagram</p>
                  <a
                    href="https://www.instagram.com/godlab_oficial/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base text-[#FFF9EF]/90 hover:text-[#EEC77F] transition"
                  >
                    @godlab_oficial
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.6 5.82a4.85 4.85 0 0 1-1.15-3.17h-3.28v13.12a2.76 2.76 0 1 1-2.39-2.73V9.72a6.06 6.06 0 1 0 5.67 6.05V9.12a8.1 8.1 0 0 0 4.74 1.52V7.36a4.88 4.88 0 0 1-3.59-1.54z" />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">TikTok</p>
                  <a
                    href="https://www.tiktok.com/@godlab_oficial"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base text-[#FFF9EF]/90 hover:text-[#EEC77F] transition"
                  >
                    @godlab_oficial
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-card border border-[#EEC77F]/35 p-8 sm:p-10 shadow-[0_0_80px_rgba(123,85,39,0.15)] rounded-2xl">
            <div className="mb-6">
              <p className="contact-form-kicker">¿Cómo podemos ayudarte?</p>
              <h3 className="mt-2 font-heading text-xl uppercase tracking-[0.16em] text-[#EEC77F]">
                {isReservation ? 'Agenda tu asesoría' : 'Habla con nosotros'}
              </h3>
            </div>

            <div className="contact-mode-switch" role="tablist" aria-label="Tipo de solicitud">
              <button
                id="contact-tab"
                type="button"
                role="tab"
                aria-selected={!isReservation}
                aria-controls="contact-request-panel"
                className={`contact-mode-button ${!isReservation ? 'contact-mode-button--active' : ''}`}
                onClick={() => handleModeChange('contact')}
              >
                Hacer una consulta
              </button>
              <button
                id="reservation-tab"
                type="button"
                role="tab"
                aria-selected={isReservation}
                aria-controls="contact-request-panel"
                className={`contact-mode-button ${isReservation ? 'contact-mode-button--active' : ''}`}
                onClick={() => handleModeChange('reservation')}
              >
                Reservar asesoría
              </button>
            </div>

            {submitted ? (
              <div
                id="contact-request-panel"
                role="tabpanel"
                aria-labelledby={isReservation ? 'reservation-tab' : 'contact-tab'}
                aria-live="polite"
                className="py-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#EEC77F] bg-[#EEC77F]/10 text-[#EEC77F]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl uppercase tracking-[0.14em] text-[#EEC77F]">
                  Solicitud preparada
                </h3>
                <p className="mt-4 text-base text-[#FFF9EF]/80">
                  Abrimos Gmail con tus datos y el destinatario listos. Revisa el mensaje y pulsa Enviar para completar tu solicitud.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4">
                  <a
                    href={gmailDraftUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-submit"
                  >
                    Abrir Gmail nuevamente
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedMode(null)
                      setGmailDraftUrl('')
                    }}
                    className="contact-secondary-action"
                  >
                    {isReservation ? 'Solicitar otra reserva' : 'Enviar otra consulta'}
                  </button>
                </div>
              </div>
            ) : (
              <form
                key={mode}
                id="contact-request-panel"
                role="tabpanel"
                aria-labelledby={isReservation ? 'reservation-tab' : 'contact-tab'}
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <p className="contact-required-note">
                  <span aria-hidden="true">*</span> Campos obligatorios
                </p>

                <div>
                  <label htmlFor="contact-name" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                    Nombre completo <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Ej. Valeria Mendoza"
                    className="contact-input"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="valeria@ejemplo.com"
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                      Teléfono {isReservation ? <span aria-hidden="true">*</span> : null}
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      autoComplete="tel"
                      required={isReservation}
                      placeholder="+57 302 499 3023"
                      className="contact-input"
                    />
                  </div>
                </div>

                {isReservation ? (
                  <>
                    <div>
                      <label htmlFor="reservation-service" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                        Tipo de asesoría <span aria-hidden="true">*</span>
                      </label>
                      <select id="reservation-service" name="service" required defaultValue="" className="contact-select">
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="products">Asesoría de productos</option>
                        <option value="shades">Prueba de tonos</option>
                        <option value="routine">Rutina de maquillaje personalizada</option>
                        <option value="pickup">Recogida de pedido en tienda</option>
                        <option value="other">Otra atención</option>
                      </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="reservation-date" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                          Fecha <span aria-hidden="true">*</span>
                        </label>
                        <input id="reservation-date" name="date" type="date" required className="contact-input" />
                      </div>
                      <div>
                        <label htmlFor="reservation-time" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                          Hora <span aria-hidden="true">*</span>
                        </label>
                        <input id="reservation-time" name="time" type="time" required className="contact-input" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label htmlFor="contact-subject" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                      Motivo de la consulta <span aria-hidden="true">*</span>
                    </label>
                    <select id="contact-subject" name="subject" required defaultValue="" className="contact-select">
                      <option value="" disabled>Selecciona una opción</option>
                      <option value="availability">Disponibilidad de productos</option>
                      <option value="recommendations">Recomendaciones de maquillaje</option>
                      <option value="order">Estado de un pedido</option>
                      <option value="other">Consulta general</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="contact-message" className="block mb-2 font-heading text-xs uppercase tracking-[0.2em] text-[#EEC77F]">
                    {isReservation ? 'Comentarios adicionales' : 'Mensaje'}{' '}
                    {!isReservation ? <span aria-hidden="true">*</span> : null}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required={!isReservation}
                    rows={4}
                    placeholder={isReservation
                      ? 'Cuéntanos si buscas algún producto, tono o atención específica...'
                      : 'Escribe aquí tu consulta y te ayudaremos...'}
                    className="contact-textarea"
                  />
                </div>

                <button type="submit" className="contact-submit w-full mt-2">
                  {isReservation ? 'Solicitar reserva' : 'Enviar consulta'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
