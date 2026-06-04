import Lists from "../../pages/lists/Lists"
import { useAuth } from "../../service/AuthContext"
import styles from "./profile.module.css"

export default function Profile() {
  const { user, logout } = useAuth()

  return (
    <div className={styles.mainContainer}>
      <h1>Profil</h1>
      <div className={styles.profileInformations}>
        <h2>Bienvenue {user.username}</h2>
        <p>Modifier les données etc etc etc</p>
        <button onClick={logout}>Se déconnecter</button>
      </div>

      <Lists className={styles.listPart}/>
    </div>
  )
}