import { useState } from "react"
import { useAuth } from "../../service/AuthContext"
import { updateUserById } from "../../service/axios"
import Lists from "../../pages/lists/Lists"
import styles from "./profile.module.css"

export default function Profile() {
  const { user, logout, checkAuth } = useAuth()

  const updateUser = async (payload) => {
    try {
      setPasswordError("")
      const res = await updateUserById(user._id, payload)
      return res
    } catch (error) {
      console.error(`An error occured during the password update: ${error.message}`);
    }
  }

  // Avatar part
  const [displayUpdateAvatarPart, setDisplayUpdateAvatarPart] = useState(false)
  const [newAvatarUrl, setNewAvatarUrl] = useState("")
  const [avatarError, setAvatarError] = useState("")

  const updateAvatar = async () => {
    if(!newAvatarUrl){
      setAvatarError("Avatar non définit")
      return
    }

    const payload = {avatar_url: newAvatarUrl}
    const res = await updateUser(payload)
    await checkAuth()
    setDisplayUpdateAvatarPart(!displayUpdateBioPart)
  }

  // Bio Part
  const [displayUpdateBioPart, setDisplayUpdateBioPart] = useState(false)
  const [newBio, setNewBio] = useState("")
  const [bioError, setBioError] = useState("")
  const [bioUpdated, setBioUpdated] = useState(false)

  const updateBio = async () => {
    if(!newBio){
      setBioError("Nouvelle bio non définie")
      return
    }

    const payload = {bio: newBio}
    const res = await updateUser(payload)
    await checkAuth()
    setDisplayUpdateBioPart(!displayUpdateBioPart)
    setBioUpdated(true)
  }

  // Password Part
  const [displayUpdatePasswordPart, setDisplayUpdatePasswordPart] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  const updatePassword = async () => {
    if(!newPassword){
      setPasswordError("Nouveau mot de passe non définit")
      return 
    }
      const payload = {password: newPassword}
      const res = await updateUser(payload)
      setDisplayUpdatePasswordPart(!displayUpdatePasswordPart)
      setPasswordUpdated(true)
  }

  // Private state Part
  const updatePrivateState = async () => {
    const payload = {is_private: !user.is_private}
    const res = await updateUser(payload)
    await checkAuth()
  }

  console.log("User: ", user)
  
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Profil</h1>
      <div className={styles.profileInformations}>
        <div className={styles.welcomeContainer}>
          <h2 className={styles.welcomeTitle}>Bienvenue {user.username}</h2>
          
          {user?.avatar_url && <img src={user.avatar_url} alt={`${user.username}'s avatar`} className={styles.avatar}/>}
        </div>

        <div className={styles.updateAvatarContainer}>
          {displayUpdateAvatarPart?
            <>
              <input type="text" placeholder="Avatar url" onChange={(e) => {setNewAvatarUrl(e.target.value)}} className={styles.avatarInput}/>
              <button onClick={() => {updateAvatar()}} className={styles.avatarButton}>Valider</button>
              <button onClick={() => {setDisplayUpdateAvatarPart(false)}} className={styles.avatarButton}>Annuler</button>

            </>
          :
            <button onClick={() => {setDisplayUpdateAvatarPart(true); setNewAvatar("")}} className={styles.avatarButton}>Modifier avatar</button>
          }
        </div>


        <div className={styles.bioPart}>
          <p>Bio:</p>
          {bioUpdated && <p className={styles.bioUpdated}>Bio mise à jour</p>}
          {bioError && <p className={styles.bioError}>{bioError}</p>}

          <p className={styles.bio}>{user.bio}</p>
          {displayUpdateBioPart?
            <>
              <input type="text" placeholder="Bio" onChange={(e) => {setNewBio(e.target.value)}} className={styles.bioInput}/>
              <button onClick={() => {updateBio()}} className={styles.bioButton}>Valider</button>
              <button onClick={() => {setDisplayUpdateBioPart(false)}} className={styles.bioButton}>Annuler</button>

            </>
          :
            <button onClick={() => {setDisplayUpdateBioPart(true); setBioUpdated(false); setNewBio("")}} className={styles.updateBioButton}>Modifier la bio</button>
          }
        </div>

        <div className={styles.passwordPart}>
          <p>Mot de passe:</p>
          {passwordUpdated && <p className={styles.updatedPassword}>Mot de passe mis à jour</p>}
          {passwordError && <p className={styles.passwordError}>{passwordError}</p>}

          {displayUpdatePasswordPart ? (
            <>
              <input type="password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}} placeholder="Nouveau mot de passe" className={styles.passwordInput}/>
              <button onClick={() => {updatePassword()}} className={styles.passwordButton}>Valider</button>
              <button onClick={() => {setDisplayUpdatePasswordPart(false)}} className={styles.passwordButton}>Annuler</button>
            </>
          ):
            <>
              <button onClick={() => {setDisplayUpdatePasswordPart(true); setPasswordUpdated(false); setNewPassword("")}} className={styles.passwordButton}>Changer le mot de passe</button>
            </>
          }
        </div>

        <div className={styles.privatePart}>
          <p>Visibilité: {user.is_private? "privée" : "publique"}</p>
          <button className={styles.privateButton} onClick={() => {updatePrivateState()}} >Passer en {user.is_private ? "publique" : "privée"}</button>
        </div>

        <button onClick={logout} className={styles.disconnectButton}>Se déconnecter</button>
      </div>

      <Lists className={styles.listPart}/>
    </div>
  )
}