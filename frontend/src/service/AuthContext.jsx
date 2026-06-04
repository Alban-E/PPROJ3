import { createContext, useContext, useEffect, useState } from "react"
import { login, logout, checkConnexion } from "./axios"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      setLoading(true)
      const res = await checkConnexion()
      setUser(res.data)
    } catch (error) {
      const status = error.response?.status
      if (status === 401 || status === 403) {
        setUser(null)
        console.log('Check connexion: User not logged')
      } else {
        console.error("Erreur checkAuth:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const loginUser = async (payload) => {
    await login(payload)
    await checkAuth()
  }

  const logoutUser = async () => {
    await logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login: loginUser, logout: logoutUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)