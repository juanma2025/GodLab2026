# 📄 GOD LAB — Documentación Técnica Completa

> **Portafolio de Belleza Premium** · Prestige Beauty Portfolio  
> Versión: `0.0.0` · Última actualización: Septiembre 2026

---

## 📑 Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Arquitectura de la Aplicación](#4-arquitectura-de-la-aplicación)
5. [Sistema de Navegación](#5-sistema-de-navegación)
6. [Componentes](#6-componentes)
7. [Capa de Datos](#7-capa-de-datos)
8. [Sistema de Estilos (CSS)](#8-sistema-de-estilos-css)
9. [Sistema de Temas (Claro / Oscuro)](#9-sistema-de-temas-claro--oscuro)
10. [Sistema de Animaciones](#10-sistema-de-animaciones)
11. [Tipografía e Identidad Visual](#11-tipografía-e-identidad-visual)
12. [Accesibilidad (a11y)](#12-accesibilidad-a11y)
13. [SEO](#13-seo)
14. [Comandos de Desarrollo](#14-comandos-de-desarrollo)
15. [Dependencias](#15-dependencias)
16. [Configuración de Build](#16-configuración-de-build)

---

## 1. Descripción General

**GOD LAB** es un portafolio web premium de maquillaje profesional. **No es una tienda física ni un e-commerce**, sino una vitrina digital diseñada para exhibir looks de maquillaje de alto nivel, transmitir la identidad de marca y permitir al usuario reservar asesorías personalizadas.

### Propósito

- Exhibir el catálogo de looks y servicios de maquillaje profesional.
- Comunicar la filosofía de marca (lujo, exclusividad, precisión editorial).
- Permitir a los usuarios explorar especialidades (Editorial, Bridal, Social, Campaign).
- Facilitar la reserva de asesorías mediante un formulario de contacto integrado con Gmail.

### Público Objetivo

Mujeres que valoran la excelencia en belleza profesional: novias, modelos, mujeres que asisten a eventos sociales, y marcas que buscan dirección de maquillaje para campañas.

---

## 2. Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| **React** | 19.2.7 | Framework de UI (componentes funcionales con Hooks) |
| **TypeScript** | ~6.0.2 | Tipado estático para seguridad y autocompletado |
| **Vite** | 8.1.1 | Bundler y servidor de desarrollo (HMR ultrarrápido) |
| **Tailwind CSS** | 4.3.3 | Clases utilitarias para layout y espaciado |
| **CSS Vanilla** | — | Estilos temáticos, animaciones y sistema de diseño (BEM) |
| **oxlint** | 1.71.0 | Linter de código JavaScript/TypeScript |
| **Google Fonts** | — | Tipografías: Cinzel (headings), EB Garamond (body) |

### Nota sobre CSS

El proyecto utiliza un enfoque **híbrido**:
- **Tailwind CSS v4**: Para layout estructural (grid, flex, spacing, responsive breakpoints).
- **CSS personalizado (BEM)**: Para la identidad visual, temas claro/oscuro, animaciones y efectos premium.

---

## 3. Estructura del Proyecto

```
GodLab2026/
├── index.html                  # Punto de entrada HTML
├── package.json                # Dependencias y scripts NPM
├── vite.config.ts              # Configuración de Vite + plugins
├── tsconfig.json               # Configuración raíz de TypeScript
├── tsconfig.app.json           # Configuración TS para código de la app
├── tsconfig.node.json          # Configuración TS para scripts de Node
├── .oxlintrc.json              # Configuración del linter
├── .gitignore                  # Archivos excluidos de Git
│
├── public/                     # Assets estáticos (servidos tal cual)
│   ├── favicon.svg             # Favicon del sitio
│   └── icons.svg               # Sprite de íconos SVG
│
├── src/                        # Código fuente
│   ├── main.tsx                # Punto de entrada de React
│   ├── App.tsx                 # Componente raíz y enrutador
│   ├── index.css               # Hoja de estilos global (~3090 líneas)
│   │
│   ├── assets/                 # Assets importados por el bundler
│   │   └── logo.png            # Logo original en formato PNG
│   │
│   ├── components/             # Componentes de React
│   │   ├── Header.tsx          # Barra de navegación fija
│   │   ├── HeroSection.tsx     # Sección hero con logo SVG animado
│   │   ├── CatalogSection.tsx  # Catálogo con filtros avanzados
│   │   ├── CatalogProductCard.tsx # Tarjeta de producto + modal de detalle
│   │   ├── BrandPrinciples.tsx # Sección de filosofía de marca
│   │   ├── MethodSection.tsx   # Proceso creativo con stepper interactivo
│   │   ├── PortfolioLines.tsx  # Líneas de portafolio (Bento cards)
│   │   ├── ContactSection.tsx  # Formulario de contacto/reserva
│   │   ├── Footer.tsx          # Pie de página
│   │   └── ScrollToTop.tsx     # Botón flotante "volver arriba"
│   │
│   └── data/                   # Datos estáticos (mock data)
│       ├── navigation.ts       # Definición de páginas y navegación
│       ├── catalog.ts          # Productos, filtros y tipos del catálogo
│       └── content.ts          # Contenido textual (principios, método, portafolio)
│
└── dist/                       # Build de producción (generado por Vite)
```

---

## 4. Arquitectura de la Aplicación

### Patrón General

La aplicación sigue una arquitectura **SPA (Single Page Application)** con navegación basada en hash (`#inicio`, `#catalogo`, etc.). No utiliza react-router; en su lugar, implementa un sistema de enrutamiento manual ligero.

### Flujo de Datos

```
main.tsx
  └─> App.tsx (Estado global: página activa, filtros, tema)
        ├─> Header (navegación, toggle de tema)
        ├─> [Página activa] (renderizado condicional)
        │     ├─ HeroSection      (inicio)
        │     ├─ CatalogSection   (catalogo)
        │     ├─ BrandPrinciples  (marca)
        │     ├─ MethodSection    (metodo)
        │     ├─ PortfolioLines   (portafolio)
        │     └─ ContactSection   (contacto)
        ├─> Footer (navegación secundaria)
        └─> ScrollToTop (botón flotante)
```

### Gestión de Estado

Todo el estado se gestiona con **React Hooks** (`useState`, `useEffect`) en el componente `App.tsx`. No se utiliza ningún estado global externo (Redux, Zustand, Context API).

| Estado | Tipo | Propósito |
|---|---|---|
| `activePage` | `PageId` | Página actualmente visible |
| `activeFilter` | `CatalogFilter` | Filtro de categoría del catálogo |
| `activeSort` | `CatalogSort` | Criterio de ordenación del catálogo |
| `contactMode` | `ContactMode` | Modo del formulario: contacto o reserva |
| `isLightMode` | `boolean` | Tema claro activado/desactivado |
| `pageKey` | `number` | Clave para forzar re-render con animación de entrada |

---

## 5. Sistema de Navegación

### Páginas Disponibles

| ID (`PageId`) | Label | Título de Pestaña | Descripción |
|---|---|---|---|
| `inicio` | — | `GOD LAB` | Landing page con hero |
| `catalogo` | Catalogo | `Catalogo / GOD LAB` | Catálogo de looks con filtros |
| `marca` | Marca | `Marca / GOD LAB` | Filosofía de marca (4 principios) |
| `metodo` | Metodo | `Metodo / GOD LAB` | Proceso creativo en 3 pasos |
| `portafolio` | Portafolio | `Portafolio / GOD LAB` | Líneas de especialidad |
| `contacto` | Contacto | `Contacto / GOD LAB` | Formulario de contacto/reserva |

### Mecanismo de Navegación

- **Hash-based routing**: La URL cambia a `#pagina` (ej: `#catalogo`).
- **`hashchange` listener**: Detecta cambios en el hash y actualiza `activePage`.
- **`history.pushState`**: Actualiza la URL cuando el usuario navega programáticamente.
- **Scroll to top**: Al cambiar de página, el scroll vuelve al inicio con animación suave.
- **Transición de página**: Cada cambio de página incrementa `pageKey`, lo que dispara la animación CSS `page-enter`.

---

## 6. Componentes

### 6.1 App (Raíz)

**Archivo**: [`App.tsx`](file:///c:/Users/juanm/GodLab2026/src/App.tsx) · **Líneas**: 143

Componente raíz que orquesta toda la aplicación.

**Responsabilidades**:
- Gestión centralizada del estado (página, filtros, tema).
- Renderizado condicional de la página activa vía `renderPage()`.
- Sincronización del título del documento con la página activa.
- Aplicación de clases de tema (`theme-light` / `theme-dark`) al `<body>`.
- Transiciones de página con `pageKey`.

**Props que distribuye**:

| A Componente | Props |
|---|---|
| `Header` | `activePage`, `isLightMode`, `onNavigate`, `onReserve`, `onToggleTheme` |
| `HeroSection` | `onNavigate`, `onReserve` |
| `CatalogSection` | `activeFilter`, `activeSort`, `onSelectFilter`, `onSelectSort` |
| `PortfolioLines` | `activeFilter`, `onSelectLine` |
| `ContactSection` | `mode`, `onModeChange` |
| `Footer` | `onNavigate` |

**Funciones clave**:

- [`handleNavigate(page)`](file:///c:/Users/juanm/GodLab2026/src/App.tsx#L66-L73) — Cambia de página y actualiza el hash de la URL.
- [`handleReserve()`](file:///c:/Users/juanm/GodLab2026/src/App.tsx#L75-L79) — Navega a contacto en modo "reserva".
- [`handleOpenCatalog(filter)`](file:///c:/Users/juanm/GodLab2026/src/App.tsx#L81-L84) — Abre el catálogo con un filtro preseleccionado.

---

### 6.2 Header

**Archivo**: [`Header.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/Header.tsx) · **Líneas**: 176

Barra de navegación fija en la parte superior con efecto `backdrop-blur`.

**Características**:
- Logo "GOD LAB" como enlace al inicio.
- Navegación desktop con indicador de página activa.
- Botón circular de toggle de tema (sol/luna, 34×34px).
- Botón CTA "Reservar" con gradiente dorado.
- Menú hamburguesa animado para móvil (3 líneas → X).
- Panel de menú desplegable en mobile con animación de entrada.

**Estado interno**: `menuOpen` (boolean) — Controla la visibilidad del menú mobile.

---

### 6.3 HeroSection

**Archivo**: [`HeroSection.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/HeroSection.tsx) · **Líneas**: 99

Sección principal de bienvenida con diseño full-height.

**Elementos visuales**:
- **Background**: Radial gradient dorado sobre negro.
- **Glow decorativo**: Conic gradient con border circular.
- **Ring decorativo**: Anillo semitransparente inferior.
- **Logo SVG animado**: Monograma "G/L" con gradientes dorados, estrellas decorativas, y anillos punteados. Centrado con `inset-0 m-auto`.
- **Animación `logoFloat`**: Flotación vertical suave (`translateY`) con escala (`scale`).
- **Hover del logo**: Escala a 1.08x con transición.

**CTAs**:
- "Iniciar experiencia" → Navega a contacto en modo reserva.
- "Ver catalogo" → Navega al catálogo.

---

### 6.4 CatalogSection

**Archivo**: [`CatalogSection.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/CatalogSection.tsx) · **Líneas**: 524

Sección más compleja del proyecto. Catálogo completo de looks con sistema avanzado de filtrado y ordenación.

**Funcionalidades**:
- **Filtros por categoría**: Todos, Editorial Beauty, Luxury Bridal, Social Prestige, Campaign Makeup.
- **Panel de filtros avanzados** (accordion desplegable):
  - Por color (swatches visuales con los 7 colores del catálogo).
  - Por acabado (Matte, Metallic, Glossy, Sheer, Natural).
  - Por cobertura (Full Color, High, Light).
  - Por valoración (4★ & up, 3★ & up, etc.).
- **Ordenación**: En primer plano, Superventas, Mejor valorados, Descuentos, Novedades, Precio (asc/desc).
- **Contador de resultados**: Muestra total de productos encontrados.
- **Grid responsivo**: 1 columna (mobile) → 2 columnas (tablet) → 3 columnas (desktop) → 4 columnas (wide).
- **Estado vacío**: Mensaje elegante cuando no hay resultados.

**Funciones de utilidad**:
- [`sortProducts(products, sort)`](file:///c:/Users/juanm/GodLab2026/src/components/CatalogSection.tsx#L35-L55) — Ordena productos según criterio seleccionado.
- [`filterProducts(products, filters)`](file:///c:/Users/juanm/GodLab2026/src/components/CatalogSection.tsx#L57-L77) — Filtra productos por color, acabado, cobertura y valoración.

**Estado interno**: Gestiona filtros pendientes (`pending*`) vs filtros aplicados (`appliedFilters`), menú de ordenación, secciones expandidas del accordion.

---

### 6.5 CatalogProductCard

**Archivo**: [`CatalogProductCard.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/CatalogProductCard.tsx) · **Líneas**: 227

Tarjeta individual de producto con modal interactivo de detalle.

**Vista de tarjeta**:
- Imagen del producto (o placeholder con ícono de cámara si no hay imagen).
- Badges: "Nuevo" y "-%Descuento".
- Categoría, título, descripción y tipo de acabado.
- Botón "Ver producto" que aparece con hover (translate + opacity).

**Modal de detalle** (se abre al hacer clic en "Ver producto"):
- **Animación de entrada cinemática**: Rotación 3D en perspectiva + blur + scale (700ms).
- **Backdrop**: Negro/blanco translúcido con blur.
- **Layout**: Grid 2 columnas (imagen + detalles).
- **Información mostrada**:
  - Categoría y título.
  - Descripción del look.
  - Panel de características: Cobertura y Acabado.
  - **Tonos disponibles**: Swatches circulares interactivos con tooltip al hover.
  - **Estado de stock**: Badge "Disponible" (verde parpadeante) o "Agotado" (rojo).
- **CTA dinámico**: "Reservar look" (dorado, activo) o "No disponible" (gris, deshabilitado).
- **Botón de cierre**: Circular con ícono X, esquina superior derecha.
- **Scroll lock**: `document.body.style.overflow = 'hidden'` cuando el modal está abierto.
- **Soporte temático**: Todos los elementos del modal responden al tema claro/oscuro vía clases CSS `.catalog-modal__*`.

---

### 6.6 BrandPrinciples

**Archivo**: [`BrandPrinciples.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/BrandPrinciples.tsx) · **Líneas**: 81

Sección de filosofía de marca con 4 principios fundamentales.

**Los 4 Principios**:

| # | Principio | Ícono | Descripción |
|---|---|---|---|
| 01 | Fondo negro absoluto | Contraste | Presencia, contraste y autoridad visual |
| 02 | Dorado metálico | Sparkle | Lujo y exclusividad en detalles |
| 03 | Tipografía de presencia | Typography | Mayúsculas, tracking amplio, serif clásica |
| 04 | Espacio y precisión | Precision | Cada elemento respira y comunica |

**Diseño**: Grid de 4 columnas con tarjetas estilizadas (`principle-card`), borde izquierdo dorado en el header, layout two-column en desktop.

---

### 6.7 MethodSection

**Archivo**: [`MethodSection.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/MethodSection.tsx) · **Líneas**: 220

Proceso creativo en 3 pasos con stepper interactivo y animaciones de entrada.

**Los 3 Pasos**:

| Paso | Label | Ícono | Tags |
|---|---|---|---|
| 01 | Diagnóstico estético | Scan (crosshair) | Lectura facial, Análisis cromático, Perfilado |
| 02 | Diseño de look | Palette | Color strategy, Mood board, Propuesta visual |
| 03 | Ejecución premium | Sparkle | Productos pro, Técnica editorial, Acabado HD |

**Características interactivas**:
- **IntersectionObserver**: Detecta cuando la sección entra en viewport y dispara animaciones de entrada.
- **Stepper navigation**: Barra de progreso animada con dots clickeables.
- **Cards expandibles**: Al hacer clic en una card, se expande para mostrar detalle extendido y tags.
- **Animación de timeline**: Progreso suave mediante `requestAnimationFrame`.
- **Glassmorphism**: Efecto de cristal en las tarjetas con bordes translúcidos.

**SVGs personalizados**: Cada paso tiene un ícono SVG inline único ([`StepIcon`](file:///c:/Users/juanm/GodLab2026/src/components/MethodSection.tsx#L5-L38) component) con estados activo/inactivo.

---

### 6.8 PortfolioLines

**Archivo**: [`PortfolioLines.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/PortfolioLines.tsx) · **Líneas**: 146

Tarjetas interactivas tipo Bento Box para las 4 líneas de especialidad.

**Las 4 Especialidades**:

| Línea | Ícono | Descripción |
|---|---|---|
| Editorial Beauty | Lista + check | Looks de impacto para editorial y pasarela |
| Luxury Bridal | Corazón | Maquillaje nupcial premium |
| Social Prestige | Estrella | Belleza social para eventos y galas |
| Campaign Makeup | Cámara | Dirección de maquillaje para campañas |

**Características**:
- **IntersectionObserver**: Animaciones de entrada en cascada con `animationDelay`.
- **Íconos SVG categorizados**: Componente [`CategoryIcon`](file:///c:/Users/juanm/GodLab2026/src/components/PortfolioLines.tsx#L15-L42) renderiza un ícono diferente por categoría.
- **Estado activo**: La tarjeta seleccionada muestra glow dorado permanente.
- **Hover effects**: Elevación, cambio de borde, glow radiante, ícono iluminado.
- **Acción**: Al hacer clic, navega al catálogo filtrado por esa categoría.
- **Grid responsivo**: 1 → 2 → 4 columnas.

---

### 6.9 ContactSection

**Archivo**: [`ContactSection.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/ContactSection.tsx) · **Líneas**: 379

Formulario dual de contacto y reserva, integrado con Gmail.

**Dos modos**:
- **Contacto** (`contact`): Campos nombre, email, teléfono, motivo, mensaje.
- **Reserva** (`reservation`): Campos nombre, email, teléfono, tipo de asesoría, fecha, hora, mensaje.

**Integración con Gmail**:
- Al enviar el formulario, construye una URL de Gmail Draft (`https://mail.google.com/mail/?view=cm&...`).
- Abre una nueva pestaña con el borrador pre-llenado en Gmail.
- Dirección destino: `goblab2026@gmail.com`.

**Información de contacto** (columna lateral):
- Email: contacto@godlab.com
- Teléfono: +52 (123) 456 7890
- Horario: Lun — Sab / 9:00 — 19:00
- Dirección física (solo referencia, no tienda).

**Estado de éxito**: Tras envío, muestra mensaje de confirmación con enlace al borrador de Gmail.

---

### 6.10 Footer

**Archivo**: [`Footer.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/Footer.tsx) · **Líneas**: 106

Pie de página con fondo oscuro y 4 columnas de contenido.

**Columnas**:
1. **Marca**: Logo "GOD LAB", tagline, redes sociales (Instagram, TikTok, WhatsApp).
2. **Navegación**: Links a todas las secciones.
3. **Servicios**: Las 4 líneas de especialidad.
4. **Contacto**: Email, teléfono, horarios.

**Nota**: El footer mantiene fondo oscuro incluso en modo claro, como decisión de diseño (contraste de anclaje visual).

---

### 6.11 ScrollToTop

**Archivo**: [`ScrollToTop.tsx`](file:///c:/Users/juanm/GodLab2026/src/components/ScrollToTop.tsx) · **Líneas**: 42

Botón flotante circular que aparece cuando el usuario ha scrolleado más de 300px.

- Usa `scroll` event listener con `{ passive: true }` para performance.
- Scroll suave al top con `window.scrollTo({ behavior: 'smooth' })`.
- Animación de aparición/desaparición con CSS (`scroll-to-top--hidden`).

---

## 7. Capa de Datos

### 7.1 navigation.ts

**Archivo**: [`navigation.ts`](file:///c:/Users/juanm/GodLab2026/src/data/navigation.ts)

Define las páginas disponibles y sus labels.

```typescript
type PageId = 'inicio' | 'catalogo' | 'marca' | 'metodo' | 'portafolio' | 'contacto'

const navigationPages: Array<{ id: PageId; label: string }>
```

---

### 7.2 catalog.ts

**Archivo**: [`catalog.ts`](file:///c:/Users/juanm/GodLab2026/src/data/catalog.ts)

Módulo principal de datos del catálogo. Contiene:

#### Constantes de Filtrado

| Constante | Valores |
|---|---|
| `catalogFilters` | Todos, Editorial Beauty, Luxury Bridal, Social Prestige, Campaign Makeup |
| `catalogSortOptions` | En primer plano, Superventas, Mejor valorados, Descuentos, Novedades, Precio ↑, Precio ↓ |
| `catalogColorOptions` | Rojo, Rosa, Coral, Borgoña, Marrón, Naranja, Natural (con hex color) |
| `catalogFinishOptions` | Matte, Metallic, Glossy, Sheer, Natural |
| `catalogCoverageOptions` | Full Color, High, Light |
| `catalogRatingOptions` | 4/5 & up, 3/5 & up, 2/5 & up, 1 & up |

#### Tipo CatalogProduct

```typescript
type CatalogProduct = {
  id: string              // Identificador único (slug)
  title: string           // Nombre del look
  category: CatalogCategory  // Línea de portafolio
  description: string     // Descripción del look
  finish: string          // Tipo de acabado (texto libre)
  imageUrl?: string       // URL de la imagen (opcional)
  colors: CatalogColorOption[]  // Tonos disponibles
  finishType: CatalogFinishOption  // Acabado (enum)
  coverage: CatalogCoverageOption  // Cobertura (enum)
  price: number           // Precio del servicio
  rating: number          // Valoración (1-5)
  popularity: number      // Índice de popularidad
  discount?: number       // Porcentaje de descuento
  isNew: boolean          // Producto nuevo
  inStock: boolean        // Disponibilidad
}
```

#### Productos (8 looks)

| ID | Título | Categoría | En Stock |
|---|---|---|---|
| `editorial-glow` | Editorial Glow | Editorial Beauty | ✅ |
| `runway-gold` | Runway Gold | Editorial Beauty | ❌ |
| `bride-prestige` | Bride Prestige | Luxury Bridal | ✅ |
| `soft-ceremony` | Soft Ceremony | Luxury Bridal | ✅ |
| `social-divinity` | Social Divinity | Social Prestige | ✅ |
| `night-prestige` | Night Prestige | Social Prestige | ❌ |
| `campaign-signature` | Campaign Signature | Campaign Makeup | ✅ |
| `brand-beauty` | Brand Beauty | Campaign Makeup | ✅ |

---

### 7.3 content.ts

**Archivo**: [`content.ts`](file:///c:/Users/juanm/GodLab2026/src/data/content.ts)

Contenido textual estructurado para las secciones de Marca, Método y Portafolio.

#### Tipos exportados

- `Principle` — Principio de marca (number, title, description, icon).
- `MethodStep` — Paso del método (value, label, description, icon, detail, tags).
- `PortfolioLineInfo` — Información de línea (category, description, productCount).

---

## 8. Sistema de Estilos (CSS)

**Archivo**: [`index.css`](file:///c:/Users/juanm/GodLab2026/src/index.css) · **~3090 líneas**

### Variables CSS (Design Tokens)

```css
:root {
  --font-heading: "Cinzel", "Playfair Display", serif;
  --font-serif: "EB Garamond", "Cormorant", serif;

  --gl-black: #000000;
  --gl-black-soft: #0a0a0a;
  --gl-gold-dark: #7b5527;
  --gl-gold: #976c35;
  --gl-gold-light: #eec77f;
  --gl-cream: #fff9ef;
  --gl-white: #ffffff;
  --gl-light-bg: #f8f1e6;
  --gl-light-panel: #fffaf2;
  --gl-light-panel-soft: #efe1cf;
  --gl-light-ink: #1b150f;
}
```

### Organización del CSS (por secciones)

| Líneas | Sección |
|---|---|
| 1–64 | Base, variables, reset |
| 65–95 | Accesibilidad (focus, skip-to-content) |
| 96–131 | Transiciones de página |
| 132–313 | Header (nav, CTA, toggle, hamburger, mobile menu) |
| 314–361 | Reserve & Theme Toggle |
| 362–491 | Hero Section (background, glow, ring, logo, hover) |
| 492–757 | Catalog Section (filtros, overlay, sorting, grid) |
| 758–864 | Catalog Cards (tarjetas, badges, estrellas) |
| 865–931 | Brand Principles (tarjetas de principios) |
| 932–1469 | Method Section (stepper, cards, glow, expand, counter) |
| 1470–1703 | Portfolio Lines (header, grid, cards, hover, active) |
| 1704–1941 | Contact Form (inputs, selects, submit) |
| 1942–2075 | Footer (grid, links, social, copyright) |
| 2076–2912 | **Light Theme Overrides** (todas las secciones) |
| 2915–3062 | Catalog Modal (dark + light) |
| 3063–3090 | Modal Animations (keyframes) |

### Metodología

- **BEM (Block Element Modifier)**: Para componentes complejos (ej: `.method-card__title`, `.portfolio-card--active`).
- **Tailwind utilities**: Para layout estructural inline (grid, flex, spacing).
- **CSS custom properties**: Para los design tokens compartidos.

---

## 9. Sistema de Temas (Claro / Oscuro)

### Mecanismo

1. El estado `isLightMode` en `App.tsx` controla el tema.
2. Se aplican clases al `<body>` y al wrapper raíz:
   - `theme-dark` (por defecto)
   - `theme-light` (activado por el usuario)
3. Los estilos del tema claro están definidos en la sección `.theme-light` del CSS (líneas ~2076–2912).

### Paleta de Colores

| Elemento | Modo Oscuro | Modo Claro |
|---|---|---|
| Fondo principal | `#000000` | `#f8f1e6` |
| Texto principal | `#fff9ef` (cream) | `#111827` (near-black) |
| Dorado primario | `#eec77f` | `#b8860b` / `#d4af37` |
| Dorado oscuro | `#976c35` | `#8b6508` |
| Bordes | `rgba(238,199,127, 0.2)` | `rgba(184,134,11, 0.25)` |
| Paneles | `rgba(238,199,127, 0.05)` | `#ffffff` |
| Texto secundario | `rgba(255,249,239, 0.7)` | `#374151` |

### Componentes con soporte temático completo

Todos los componentes tienen overrides `.theme-light`:
- ✅ Header, Hero, Catalog, Catalog Cards
- ✅ Brand Principles, Method Section
- ✅ Portfolio Lines, Contact Section
- ✅ Footer, ScrollToTop
- ✅ Catalog Modal (`.catalog-modal__*`)

---

## 10. Sistema de Animaciones

### Animaciones CSS (@keyframes)

| Nombre | Uso | Descripción |
|---|---|---|
| `pageEnter` | Transición de página | Fade-in + slide-up al cambiar de página |
| `logoFloat` | Logo del hero | Flotación suave vertical con escala |
| `methodFadeIn` | Method Section | Entrada con fade + slide para el contenido |
| `methodCardEnter` | Method cards | Entrada escalonada de tarjetas |
| `portfolioFadeIn` | Portfolio header | Fade + slide del título |
| `portfolioCardEnter` | Portfolio cards | Entrada en cascada con delay |
| `modalBackdropFadeIn` | Modal backdrop | Fade del fondo oscuro con blur progresivo |
| `modalContentCinematicIn` | Modal content | **Animación 3D cinemática**: perspective + rotateX + blur + scale (700ms) |

### Técnicas de Animación Utilizadas

- **IntersectionObserver**: Para animaciones de entrada al scroll (Method, Portfolio).
- **`requestAnimationFrame`**: Para la barra de progreso del stepper (suavizado manual).
- **CSS transitions**: Hover effects, theme toggle, expand/collapse.
- **CSS `perspective` + `rotateX`**: Efecto 3D cinemático en el modal.
- **`animation-delay`**: Entrada escalonada (cascada) de tarjetas.
- **`cubic-bezier(0.16, 1, 0.3, 1)`**: Curva de aceleración premium.

---

## 11. Tipografía e Identidad Visual

### Fuentes

| Fuente | Rol | Pesos | Uso |
|---|---|---|---|
| **Cinzel** | Heading (`--font-heading`) | 400, 600, 700 | Títulos, CTAs, labels de categoría |
| **EB Garamond** | Body (`--font-serif`) | 400, 500, 600 | Texto principal, descripciones |

### Estilo Tipográfico

- **Headings**: `text-transform: uppercase`, `letter-spacing: 0.14em–0.42em`.
- **Labels**: `font-size: 0.62rem–0.7rem`, `tracking: 0.2em+`.
- **Body text**: `font-size: 0.95rem–1.125rem`, `line-height: 1.5–2`.

### Paleta de la Marca

| Color | Hex | Uso |
|---|---|---|
| Negro Absoluto | `#000000` | Fondo principal |
| Negro Suave | `#0A0A0A` | Fondos de paneles |
| Dorado Oscuro | `#7B5527` | Gradientes, sombras |
| Dorado | `#976C35` | Acentos, bordes |
| Dorado Claro | `#EEC77F` | Títulos, CTAs, highlights |
| Crema | `#FFF9EF` | Texto principal |
| Blanco | `#FFFFFF` | Texto destacado |

---

## 12. Accesibilidad (a11y)

| Característica | Implementación |
|---|---|
| Skip to content | `<a class="skip-to-content">` oculto, visible con focus |
| ARIA labels | Todos los botones de ícono tienen `aria-label` |
| `aria-current="page"` | Link activo en navegación |
| `aria-expanded` | Menú mobile, cards expandibles |
| `aria-pressed` | Tarjetas de portafolio |
| `aria-modal` | Modal de producto |
| `role="dialog"` | Modal de producto |
| `role="button"` | Cards interactivas del método |
| Focus visible | Custom focus ring dorado (`box-shadow`) |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Alt text | Todas las imágenes tienen `alt` descriptivo |
| Color contrast | Dorado sobre negro cumple WCAG AA |
| `<figcaption>` + `sr-only` | Logo del hero |

---

## 13. SEO

| Elemento | Valor |
|---|---|
| `<html lang>` | `es` |
| `<title>` | `GOD LAB \| Prestige Beauty Portfolio` (dinámico por página) |
| `<meta description>` | "GOD LAB, portafolio de belleza premium con estética dorada, exclusiva y ceremonial." |
| `<meta viewport>` | `width=device-width, initial-scale=1.0` |
| Favicon | SVG vectorial (`/favicon.svg`) |
| Heading hierarchy | Un solo `<h1>` por página, `<h2>`, `<h3>` jerárquicos |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>` |
| Preconnect | Google Fonts (gstatic + googleapis) |

---

## 14. Comandos de Desarrollo

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo Vite (HMR) |
| `npm run build` | Compila TypeScript + Build de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta oxlint para análisis estático |

---

## 15. Dependencias

### Producción

| Paquete | Versión | Propósito |
|---|---|---|
| `react` | ^19.2.7 | Librería de UI |
| `react-dom` | ^19.2.7 | Renderizado DOM |
| `tailwindcss` | ^4.3.3 | Framework de utilidades CSS |
| `@tailwindcss/vite` | ^4.3.3 | Plugin de Vite para Tailwind |

### Desarrollo

| Paquete | Versión | Propósito |
|---|---|---|
| `typescript` | ~6.0.2 | Compilador TypeScript |
| `vite` | ^8.1.1 | Bundler y dev server |
| `@vitejs/plugin-react` | ^6.0.3 | Soporte React para Vite |
| `@types/react` | ^19.2.17 | Tipos TS para React |
| `@types/react-dom` | ^19.2.3 | Tipos TS para ReactDOM |
| `@types/node` | ^24.13.2 | Tipos TS para Node.js |
| `oxlint` | ^1.71.0 | Linter de JS/TS |

---

## 16. Configuración de Build

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### tsconfig.app.json (Principales opciones)

- **Target**: ES2020
- **Module**: ESNext
- **Strict**: true (tipado estricto completo)
- **JSX**: react-jsx
- **Includes**: `src/`

### Output de Build

```
dist/
├── index.html          (~0.96 KB)
├── assets/
│   ├── index-*.css     (~75 KB / ~14 KB gzip)
│   └── index-*.js      (~252 KB / ~75 KB gzip)
```

---

> 📝 **Nota**: Esta documentación refleja el estado del proyecto al 5 de septiembre de 2026. Para cambios posteriores, actualizar las secciones relevantes.
