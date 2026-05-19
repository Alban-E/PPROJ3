import { useAuth } from "../../service/AuthContext"

export default function Profile() {
  const { logout } = useAuth()

  return (
    <div>
      <h1>Profil</h1>
      <p>Bienvenue sur ton profil musical !</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  )
}