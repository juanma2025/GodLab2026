import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import type { CatalogProduct } from '../data/catalog'
import { db } from '../lib/firebase'

const COLLECTION = 'products'

export type FirestoreProduct = CatalogProduct & {
  firestoreId?: string
}

export function useProducts() {
  const [products, setProducts] = useState<FirestoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTION),
      (snapshot) => {
        const items: FirestoreProduct[] = snapshot.docs.map((docSnap) => ({
          ...(docSnap.data() as CatalogProduct),
          firestoreId: docSnap.id,
        }))
        setProducts(items)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore error:', err)
        setError('Error al cargar productos.')
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const addProduct = async (product: Omit<CatalogProduct, 'id'> & { id: string }) => {
    await addDoc(collection(db, COLLECTION), product)
  }

  const updateProduct = async (firestoreId: string, data: Partial<CatalogProduct>) => {
    await updateDoc(doc(db, COLLECTION, firestoreId), data)
  }

  const deleteProduct = async (firestoreId: string) => {
    await deleteDoc(doc(db, COLLECTION, firestoreId))
  }

  return { products, loading, error, addProduct, updateProduct, deleteProduct }
}
