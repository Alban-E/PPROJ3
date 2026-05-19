import { useAuth } from "../../service/AuthContext"

export default function Profile() {
  const user = useAuth()
  const { logout } = useAuth()

  return (
    <div>
      <h1>Profil</h1>
      <p>Bienvenue {user.usernam}</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  )
}