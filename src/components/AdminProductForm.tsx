import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import type { CatalogProduct } from '../data/catalog'
import {
  catalogColorOptions,
  catalogFinishOptions,
  catalogCoverageOptions,
} from '../data/catalog'
import type {
  CatalogColorOption,
  CatalogFinishOption,
  CatalogCoverageOption,
  CatalogCategory,
} from '../data/catalog'

type AdminProductFormProps = {
  product?: CatalogProduct & { firestoreId?: string }
  onSave: (product: CatalogProduct, imageFile?: File) => Promise<void>
  onCancel: () => void
}

const categories: CatalogCategory[] = [
  'Editorial Beauty',
  'Luxury Bridal',
  'Social Prestige',
  'Campaign Makeup',
]

export function AdminProductForm({ product, onSave, onCancel }: AdminProductFormProps) {
  const isEditing = Boolean(product)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(product?.imageUrl ?? '')
  const [imageError, setImageError] = useState<string | null>(null)
  const [selectedColors, setSelectedColors] = useState<CatalogColorOption[]>(product?.colors ?? [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (file: File) => {
    if (file.size > 500 * 1024) {
      setImageError('La imagen es demasiado grande. El límite de seguridad es de 500 KB.')
      setImageFile(null)
      setImagePreview('')
      return
    }
    setImageError(null)
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) {
      handleImageChange(file)
    }
  }

  const toggleColor = (color: CatalogColorOption) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    )
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const form = e.currentTarget
    const get = (name: string) => String(new FormData(form).get(name) ?? '').trim()

    const productData: CatalogProduct = {
      id: product?.id || get('title').toLowerCase().replace(/\s+/g, '-'),
      title: get('title'),
      category: get('category') as CatalogCategory,
      description: get('description'),
      finish: get('finish'),
      imageUrl: product?.imageUrl ?? '',
      colors: selectedColors,
      finishType: get('finishType') as CatalogFinishOption,
      coverage: get('coverage') as CatalogCoverageOption,
      price: Number(get('price')) || 0,
      rating: Number(get('rating')) || 4.5,
      popularity: Number(get('popularity')) || 50,
      discount: Number(get('discount')) || 0,
      isNew: get('isNew') === 'on',
      inStock: get('inStock') === 'on',
    }

    try {
      await onSave(productData, imageFile ?? undefined)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-form-overlay" onClick={onCancel}>
      <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-form-header">
          <h3 className="admin-form-title">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button type="button" className="admin-form-close" onClick={onCancel} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form-body">
          {/* Image Upload */}
          <div
            className={`admin-image-upload ${imagePreview ? 'admin-image-upload--has-image' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="admin-image-preview" />
            ) : (
              <div className="admin-image-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p>Arrastra una imagen aquí o haz click para seleccionar</p>
                <span>JPG, PNG, WebP — Max 500KB</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageChange(file)
              }}
            />
          </div>
          {imageError && (
            <p className="text-red-500 text-xs mt-2 text-center" style={{ color: '#ff4d4f', fontSize: '13px' }}>
              {imageError}
            </p>
          )}

          <div className="admin-form-grid">
            {/* Title */}
            <div className="admin-form-field admin-form-field--full">
              <label htmlFor="prod-title" className="admin-label">Nombre del producto *</label>
              <input
                id="prod-title"
                name="title"
                type="text"
                required
                defaultValue={product?.title ?? ''}
                placeholder="Ej. Editorial Glow"
                className="admin-input"
              />
            </div>

            {/* Category & Finish */}
            <div className="admin-form-field">
              <label htmlFor="prod-category" className="admin-label">Categoría *</label>
              <select id="prod-category" name="category" required defaultValue={product?.category ?? ''} className="admin-select">
                <option value="" disabled>Selecciona</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="admin-form-field">
              <label htmlFor="prod-finish" className="admin-label">Finish / Estilo *</label>
              <input
                id="prod-finish"
                name="finish"
                type="text"
                required
                defaultValue={product?.finish ?? ''}
                placeholder="Ej. Editorial / piel glow"
                className="admin-input"
              />
            </div>

            {/* Description */}
            <div className="admin-form-field admin-form-field--full">
              <label htmlFor="prod-description" className="admin-label">Descripción *</label>
              <textarea
                id="prod-description"
                name="description"
                required
                rows={3}
                defaultValue={product?.description ?? ''}
                placeholder="Descripción del look..."
                className="admin-textarea"
              />
            </div>

            {/* Price, Discount, Rating, Popularity */}
            <div className="admin-form-field">
              <label htmlFor="prod-price" className="admin-label">Precio (COP miles) *</label>
              <input
                id="prod-price"
                name="price"
                type="number"
                min="0"
                required
                defaultValue={product?.price ?? ''}
                placeholder="180"
                className="admin-input"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="prod-discount" className="admin-label">Descuento %</label>
              <input
                id="prod-discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                defaultValue={product?.discount ?? 0}
                className="admin-input"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="prod-rating" className="admin-label">Rating (1-5)</label>
              <input
                id="prod-rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                defaultValue={product?.rating ?? 4.5}
                className="admin-input"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="prod-popularity" className="admin-label">Popularidad (0-100)</label>
              <input
                id="prod-popularity"
                name="popularity"
                type="number"
                min="0"
                max="100"
                defaultValue={product?.popularity ?? 50}
                className="admin-input"
              />
            </div>

            {/* Finish Type & Coverage */}
            <div className="admin-form-field">
              <label htmlFor="prod-finishType" className="admin-label">Tipo de acabado *</label>
              <select id="prod-finishType" name="finishType" required defaultValue={product?.finishType ?? ''} className="admin-select">
                <option value="" disabled>Selecciona</option>
                {catalogFinishOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="admin-form-field">
              <label htmlFor="prod-coverage" className="admin-label">Cobertura *</label>
              <select id="prod-coverage" name="coverage" required defaultValue={product?.coverage ?? ''} className="admin-select">
                <option value="" disabled>Selecciona</option>
                {catalogCoverageOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Colors */}
            <div className="admin-form-field admin-form-field--full">
              <label className="admin-label">Colores disponibles</label>
              <div className="admin-color-grid">
                {catalogColorOptions.map((opt) => {
                  const isSelected = selectedColors.includes(opt.label)
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      className={`admin-color-chip ${isSelected ? 'admin-color-chip--selected' : ''}`}
                      onClick={() => toggleColor(opt.label)}
                    >
                      <span className="admin-color-dot" style={{ backgroundColor: opt.color }} />
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Toggles */}
            <div className="admin-form-field">
              <label className="admin-toggle-label">
                <input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} className="admin-checkbox" />
                <span>En stock / Disponible</span>
              </label>
            </div>

            <div className="admin-form-field">
              <label className="admin-toggle-label">
                <input type="checkbox" name="isNew" defaultChecked={product?.isNew ?? false} className="admin-checkbox" />
                <span>Marcar como Nuevo</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="admin-btn-primary" disabled={saving}>
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="contact-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Guardando...
                </span>
              ) : (
                isEditing ? 'Guardar cambios' : 'Crear producto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
