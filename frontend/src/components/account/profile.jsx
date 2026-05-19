import { useAuth } from "../../service/AuthContext"

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <>
      <div>
        <h1>Profil</h1>
        <h2>Bienvenue {user.username}</h2>
        <p>Modifier les données etc etc etc</p>
        <button onClick={logout}>Se déconnecter</button>
      </div>
    </>
  )
}