import { useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../lib/firebase'

// Only this email can access the admin panel
const ADMIN_EMAIL = 'godlab280@gmail.com'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      if (credential.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await signOut(auth)
        setError('No tienes permisos de administrador.')
        return false
      }
      return true
    } catch (err: unknown) {
      console.error('Login error details:', err)
      const firebaseError = err as { code?: string }
      switch (firebaseError.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
        case 'auth/invalid-login-credentials':
          setError('Correo o contraseña incorrectos.')
          break
        case 'auth/too-many-requests':
          setError('Demasiados intentos. Espera un momento.')
          break
        default:
          setError(`Error: ${firebaseError.code || 'Error desconocido'}`)
      }
      return false
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return { user, isAdmin, loading, error, login, logout }
}
