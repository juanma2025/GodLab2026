import { useEffect, useRef, useState, useCallback } from 'react'
import { methodSteps } from '../data/content'

/* ── SVG icons per step ── */
function StepIcon({ icon, isActive }: { icon: string; isActive: boolean }) {
  const cls = `method-icon ${isActive ? 'method-icon--active' : ''}`

  if (icon === 'scan')
    return (
      <svg className={cls} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 24h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M6 14V8a2 2 0 012-2h6M36 6h4a2 2 0 012 2v6M42 34v6a2 2 0 01-2 2h-4M12 42H8a2 2 0 01-2-2v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )

  if (icon === 'palette')
    return (
      <svg className={cls} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20c2.2 0 4-.9 4-3 0-.78-.34-1.5-.88-2.06-.52-.56-.86-1.28-.86-2.06 0-1.66 1.34-3 3-3h3.54c5.52 0 10-4.48 10-10C43.8 12.26 35.06 4 24 4z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="20" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="12" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="36" cy="20" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    )

  /* sparkle */
  return (
    <svg className={cls} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 2l4.5 14.5L43 21l-14.5 4.5L24 40l-4.5-14.5L5 21l14.5-4.5L24 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M37 4l1.5 5L44 10.5 38.5 12 37 17l-1.5-5L30 10.5 35.5 9 37 4z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
      <path d="M10 32l1.2 4L15 37.2 11.2 39 10 43l-1.2-4L5 37.2 8.8 36 10 32z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}

export function MethodSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [timelineProgress, setTimelineProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<(HTMLLIElement | null)[]>([])

  /* Intersection Observer: trigger entrance animations */
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  /* Animate timeline progress when visible */
  useEffect(() => {
    if (!isVisible) return
    const target = ((activeStep + 1) / methodSteps.length) * 100
    let current = timelineProgress
    const step = () => {
      current += (target - current) * 0.08
      if (Math.abs(current - target) < 0.5) {
        setTimelineProgress(target)
        return
      }
      setTimelineProgress(current)
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
    // eslint-disable-next-line
  }, [activeStep, isVisible])

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index)
  }, [])

  return (
    <section
      id="metodo"
      ref={sectionRef}
      className="method-section scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <div className={`mx-auto max-w-7xl ${isVisible ? 'method-visible' : 'method-hidden'}`}>
        {/* ── Header ── */}
        <header className="method-header">
          <div className="method-header__label-row">
            <span className="method-header__accent-line" />
            <p className="method-header__label font-heading">
              Proceso Editorial
            </p>
            <span className="method-header__accent-line" />
          </div>
          <h2 className="method-header__title font-heading">
            Metodo creado para verse impecable<br className="hidden sm:block" /> en vivo y en camara.
          </h2>
          <p className="method-header__subtitle">
            Cada entrega combina lectura del rostro, intencion estetica,
            seleccion cromatica y ejecucion de alto detalle.
          </p>
        </header>

        {/* ── Stepper navigation (desktop) ── */}
        <nav className="method-stepper" aria-label="Etapas del metodo">
          {/* Timeline bar background */}
          <div className="method-stepper__track">
            <div
              className="method-stepper__progress"
              style={{ width: `${timelineProgress}%` }}
            />
          </div>

          <ol className="method-stepper__dots">
            {methodSteps.map((step, i) => (
              <li key={step.value} className="method-stepper__dot-wrapper">
                <button
                  type="button"
                  className={`method-stepper__dot ${i === activeStep ? 'method-stepper__dot--active' : ''} ${i < activeStep ? 'method-stepper__dot--completed' : ''}`}
                  onClick={() => handleStepClick(i)}
                  aria-label={`Paso ${step.value}: ${step.label}`}
                  aria-current={i === activeStep ? 'step' : undefined}
                >
                  <span className="method-stepper__dot-number">{step.value}</span>
                  {i < activeStep && (
                    <svg className="method-stepper__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <span className={`method-stepper__dot-label ${i === activeStep ? 'method-stepper__dot-label--active' : ''}`}>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Cards grid ── */}
        <div className="method-cards">
          <ol className="method-cards__list">
            {methodSteps.map((step, i) => {
              const isActive = i === activeStep
              const delay = `${i * 120}ms`

              return (
                <li
                  key={step.value}
                  ref={(el) => { stepsRef.current[i] = el }}
                  className={`method-card ${isActive ? 'method-card--active' : ''}`}
                  style={{ animationDelay: delay }}
                  onClick={() => handleStepClick(i)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStepClick(i)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                >
                  {/* Glow effect on active */}
                  <div className="method-card__glow" />

                  {/* Top row: number + icon */}
                  <div className="method-card__top">
                    <div className="method-card__number-container">
                      <strong className="method-card__number">{step.value}</strong>
                      <div className="method-card__pulse" />
                    </div>
                    <div className="method-card__icon-wrapper">
                      <StepIcon icon={step.icon} isActive={isActive} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="method-card__title font-heading">{step.label}</h3>

                  {/* Description */}
                  <p className="method-card__desc">{step.description}</p>

                  {/* Expanded content (only visible when active) */}
                  <div className={`method-card__expand ${isActive ? 'method-card__expand--open' : ''}`}>
                    <div className="method-card__divider" />
                    <p className="method-card__detail">{step.detail}</p>
                    <div className="method-card__tags">
                      {step.tags.map((tag) => (
                        <span key={tag} className="method-card__tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className={`method-card__arrow ${isActive ? 'method-card__arrow--up' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* ── Step counter ── */}
        <div className="method-counter">
          <span className="method-counter__current">{String(activeStep + 1).padStart(2, '0')}</span>
          <span className="method-counter__separator">/</span>
          <span className="method-counter__total">{String(methodSteps.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}
