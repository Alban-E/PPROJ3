import { useState } from "react"
import { useAuth } from "../../service/AuthContext"
import { updateUserById } from "../../service/axios"
import Lists from "../../pages/lists/Lists"
import styles from "./profile.module.css"

export default function Profile() {
  const { user, logout, checkAuth } = useAuth()

  const [displayPasswordPart, setDisplayPasswordPart] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const updateUser = async (payload) => {
    try {
      setPasswordError("")
      console.log("Payload: ", payload)
      const res = await updateUserById(user._id, payload)
      console.log("Response:", res.status, res.data?.message);
      await checkAuth()
      return res
    } catch (error) {
      console.error(`An error occured during the password update: ${error.message}`);
    }
  }

  const updatePassword = async () => {
    if(!newPassword){
      setPasswordError("Nouveau mot de passe non définit")
      return 
    }
      const payload = {password: newPassword}
      const res = await updateUser(payload)
      setDisplayPasswordPart(!displayPasswordPart)
  }

  const updatePrivateState = async () => {
    const payload = {is_private: !user.is_private}
    const res = await updateUser(payload)
  }

  return (
    <div className={styles.mainContainer}>
      <h1>Profil</h1>
      <div className={styles.profileInformations}>
        <h2>Bienvenue {user.username}</h2>
        <p>Nom d'utilisateur: {user.username}</p>


        <div className={styles.passwordPart}>
          {displayPasswordPart ? (
            <>
              {passwordError && <p className={styles.passwordError}>{passwordError}</p>}
              <input type="password" value={newPassword} onChange={(e) => {setNewPassword(event.target.value)}} placeholder="Nouveau mot de passe" className={styles.passwordButton}/>
              <button onClick={() => {updatePassword()}} className={styles.passwordButton}>Valider</button>
              <button onClick={() => {setDisplayPasswordPart(!displayPasswordPart)}} className={styles.passwordButton}>Annuler</button>
            </>
          ):
            <button onClick={() => {setDisplayPasswordPart(!displayPasswordPart)}} className={styles.passwordButton}>Changer le mot de passe</button>
          }
        </div>

        <div className={styles.privatePart}>
          <p>Confidentialité: {user.is_private? "privé" : "public"}</p>
          <button className={styles.privateButton} onClick={() => {updatePrivateState()}} >Passer en {user.is_private ? "public" : "privé"}</button>
        </div>
        <p>Modifier les données etc etc etc</p>
        <button onClick={logout} className={styles.passwordButton}>Se déconnecter</button>
      </div>

      <Lists className={styles.listPart}/>
    </div>
  )
}