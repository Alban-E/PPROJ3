import { useState } from "react"
import { useAuth } from "../../service/AuthContext"
import { getGamesFromList, getMyFeedbacks, getMyLists, updateUserById } from "../../service/axios"
import Lists from "../../pages/lists/Lists"
import styles from "./profile.module.css"
import { downloadAsJSON } from "../../service/DownloadAsJson"

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

  const updateBio = async () => {
    if(!newBio){
      setBioError("Nouvelle bio non définie")
      return
    }

    const payload = {bio: newBio}
    const res = await updateUser(payload)
    await checkAuth()
    setDisplayUpdateBioPart(!displayUpdateBioPart)
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

  const getPersonnalData = async () => {
    const userFeedbacks = await getMyFeedbacks()
    const userLists = await getMyLists()

    let userlistsData = []
    for (const list of userLists.data) {
      const params = {listId: list._id}
      const gamesInList = await getGamesFromList(params)
      
      let listData = {
        name: list.name,
      }
      listData.games = gamesInList.data.map((game) => ({
          rawgGameId: game
      }))

      userlistsData.push(listData)
    }

    const result = {
      user: user,
      feedbacks: userFeedbacks.data,
      lists: userlistsData
    }

    return result
  }

  const exportPersonnalData = async () => {
    const userPersonnalData = await getPersonnalData()
    const now = new Date()
    const currentDate = now.toLocaleDateString()
    const fileName = `${user.username}-profile-data-${currentDate}.json`
    downloadAsJSON(userPersonnalData, fileName)
  }

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Profil</h1>
      <div className={styles.profileInformations}>
        <div className={styles.welcomeContainer}>
          <h2 className={styles.welcomeTitle}>Bienvenue {user.username}</h2>
          
          {user?.avatar_url && <img src={user.avatar_url} alt={`${user.username}'s avatar`} className={styles.avatar}/>}
        </div>
          {avatarError && <p className={styles.avatarError}>{avatarError}</p>}

        <div className={styles.updateAvatarContainer}>
          {displayUpdateAvatarPart?
            <>
              <input type="text" placeholder="Avatar url" onChange={(e) => {setNewAvatarUrl(e.target.value)}} className={styles.avatarInput}/>
              <button onClick={() => {updateAvatar()}} className={styles.avatarButton}>Valider</button>
              <button onClick={() => {setDisplayUpdateAvatarPart(false); setAvatarError("")}} className={styles.avatarButton}>Annuler</button>

            </>
          :
            <button onClick={() => {setDisplayUpdateAvatarPart(true); setNewAvatar("")}} className={styles.avatarButton}>Modifier avatar</button>
          }
        </div>


        <div className={styles.bioPart}>
          <p>Bio:</p>
          {bioError && <p className={styles.bioError}>{bioError}</p>}

          <p className={styles.bio}>{user.bio}</p>
          {displayUpdateBioPart?
            <>
              <input type="text" placeholder="Nouvelle bio" onChange={(e) => {setNewBio(e.target.value)}} className={styles.bioInput}/>
              <button onClick={() => {updateBio()}} className={styles.bioButton}>Valider</button>
              <button onClick={() => {setDisplayUpdateBioPart(false); setBioError("")}} className={styles.bioButton}>Annuler</button>

            </>
          :
            <button onClick={() => {setDisplayUpdateBioPart(true); setNewBio("")}} className={styles.updateBioButton}>Modifier la bio</button>
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
              <button onClick={() => {setDisplayUpdatePasswordPart(false); setPasswordError("")}} className={styles.passwordButton}>Annuler</button>
            </>
          ):
            <>
              <button onClick={() => {setDisplayUpdatePasswordPart(true); setPasswordUpdated(false); setNewPassword("")}} className={styles.passwordButton}>Changer le mot de passe</button>
            </>
          }
        </div>

        <div className={styles.privatePart}>
          <p>Visibilité: {user.is_private? "privé" : "public"}</p>
          <button className={styles.privateButton} onClick={() => {updatePrivateState()}} >Passer en {user.is_private ? "public" : "privé"}</button>
        </div>
        
        <button onClick={exportPersonnalData} className={styles.exportPersonnalData}>Exporter mes données personnelles</button>

        <button onClick={logout} className={styles.disconnectButton}>Se déconnecter</button>
      </div>

      <Lists className={styles.listPart}/>
    </div>
  )
}