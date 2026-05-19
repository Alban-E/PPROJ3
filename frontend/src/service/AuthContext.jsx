import { createContext, useContext, useEffect, useState } from "react"
import { login, logout, checkConnexion } from "./axios"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const res = await checkConnexion()
      setUser(res.data)
    } catch {
      setUser(null)
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
    <AuthContext.Provider value={{ user, loading, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)