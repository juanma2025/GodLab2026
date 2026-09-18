import { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminProductForm } from './AdminProductForm'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import type { FirestoreProduct } from '../hooks/useProducts'
import type { CatalogProduct } from '../data/catalog'
import { catalogProducts } from '../data/catalog'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function AdminPanel() {
  const { isAdmin, loading: authLoading, error: authError, login, logout } = useAuth()
  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct } = useProducts()
  const [editingProduct, setEditingProduct] = useState<FirestoreProduct | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [seeding, setSeeding] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSave = async (productData: CatalogProduct, imageFile?: File) => {
    try {
      // If there's an image file, convert to base64 data URL for storage
      // (Since Firebase Storage requires Blaze plan, we store as data URL in Firestore)
      if (imageFile) {
        const dataUrl = await fileToDataUrl(imageFile)
        productData.imageUrl = dataUrl
      }

      if (editingProduct?.firestoreId) {
        await updateProduct(editingProduct.firestoreId, productData)
        showNotification('success', `"${productData.title}" actualizado correctamente.`)
      } else {
        await addProduct(productData)
        showNotification('success', `"${productData.title}" creado correctamente.`)
      }
      setShowForm(false)
      setEditingProduct(null)
    } catch {
      showNotification('error', 'Error al guardar el producto.')
    }
  }

  const handleDelete = async (product: FirestoreProduct) => {
    if (!product.firestoreId) return
    try {
      await deleteProduct(product.firestoreId)
      showNotification('success', `"${product.title}" eliminado.`)
      setDeleteConfirm(null)
    } catch {
      showNotification('error', 'Error al eliminar el producto.')
    }
  }

  const handleToggleStock = async (product: FirestoreProduct) => {
    if (!product.firestoreId) return
    try {
      await updateProduct(product.firestoreId, { inStock: !product.inStock })
      showNotification('success', `Stock de "${product.title}" ${!product.inStock ? 'activado' : 'desactivado'}.`)
    } catch {
      showNotification('error', 'Error al actualizar stock.')
    }
  }

  const handleSeedProducts = async () => {
    setSeeding(true)
    try {
      // Check if products already exist
      const snapshot = await getDocs(collection(db, 'products'))
      if (!snapshot.empty) {
        showNotification('error', 'Ya existen productos en la base de datos.')
        setSeeding(false)
        return
      }

      for (const product of catalogProducts) {
        await addProduct(product)
      }
      showNotification('success', `${catalogProducts.length} productos cargados exitosamente.`)
    } catch {
      showNotification('error', 'Error al cargar productos iniciales.')
    }
    setSeeding(false)
  }

  if (authLoading) {
    return (
      <section className="admin-loading">
        <svg className="contact-spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <p>Verificando acceso...</p>
      </section>
    )
  }

  if (!isAdmin) {
    return <AdminLogin onLogin={login} error={authError} />
  }

  return (
    <section className="admin-section">
      {/* Notification Toast */}
      {notification && (
        <div className={`admin-toast admin-toast--${notification.type}`}>
          {notification.type === 'success' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="admin-header">
        <div>
          <h2 className="admin-title">Panel de Administración</h2>
          <p className="admin-subtitle">{products.length} productos en catálogo</p>
        </div>
        <div className="admin-header-actions">
          {products.length === 0 && (
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={handleSeedProducts}
              disabled={seeding}
            >
              {seeding ? 'Cargando...' : 'Cargar productos iniciales'}
            </button>
          )}
          <button
            type="button"
            className="admin-btn-primary"
            onClick={() => {
              setEditingProduct(null)
              setShowForm(true)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Agregar producto
          </button>
          <button type="button" className="admin-btn-logout" onClick={logout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Salir
          </button>
        </div>
      </div>

      {/* Products Table */}
      {productsLoading ? (
        <div className="admin-loading">
          <svg className="contact-spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <p>Cargando productos...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="admin-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <h3>No hay productos</h3>
          <p>Crea tu primer producto o carga los productos iniciales del catálogo.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.firestoreId ?? product.id}>
                  <td>
                    <div className="admin-thumb">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.title} />
                      ) : (
                        <div className="admin-thumb-placeholder">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="admin-product-name">{product.title}</div>
                    <div className="admin-product-desc">{product.description.slice(0, 60)}...</div>
                  </td>
                  <td>
                    <span className="admin-badge">{product.category}</span>
                  </td>
                  <td>
                    <span className="admin-price">
                      ${product.price}K
                      {product.discount ? (
                        <span className="admin-discount">-{product.discount}%</span>
                      ) : null}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`admin-stock-toggle ${product.inStock ? 'admin-stock-toggle--on' : 'admin-stock-toggle--off'}`}
                      onClick={() => handleToggleStock(product)}
                      title={product.inStock ? 'Marcar como agotado' : 'Marcar como disponible'}
                    >
                      <span className="admin-stock-dot" />
                      {product.inStock ? 'Disponible' : 'Agotado'}
                    </button>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-action-btn admin-action-btn--edit"
                        title="Editar"
                        onClick={() => {
                          setEditingProduct(product)
                          setShowForm(true)
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      {deleteConfirm === product.firestoreId ? (
                        <div className="admin-delete-confirm">
                          <button
                            type="button"
                            className="admin-action-btn admin-action-btn--confirm"
                            onClick={() => handleDelete(product)}
                          >
                            Sí
                          </button>
                          <button
                            type="button"
                            className="admin-action-btn admin-action-btn--cancel"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="admin-action-btn admin-action-btn--delete"
                          title="Eliminar"
                          onClick={() => setDeleteConfirm(product.firestoreId ?? null)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <AdminProductForm
          product={editingProduct ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}
    </section>
  )
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
