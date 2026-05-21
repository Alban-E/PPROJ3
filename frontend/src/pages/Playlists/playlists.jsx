import { Fragment, useEffect, useState } from "react";
import { useAuth } from "../../service/AuthContext";
import { createList, getMyLists } from "../../service/axios";
import styles from "./playlists.module.css"
import { NavLink } from "react-router-dom";

export default function Playlists() {
  const { user } = useAuth()

  const [userLists, setUserLists] = useState([])

  const [showNewListPopup, setShowNewListPopUp] = useState(false)
  const [listData, setListData] = useState({listName: '', private: true});

  const newList = async () => {
    if (listData.listName){
      console.log("Treat the datas provided: ", listData); 
      try {
        const res = await createList(listData)
        await updateUserLists()
        closeListCreation()
        
      } catch (error) {
        const status = error.response?.status 
        if (status === 409) {
          alert(`Une liste avec ce nom (${listData.listName}) existe déjà.`)
        } else {
          console.log(error)
        }
      }

    } else {
      alert("Veuillez Entrer un nom de playlist")
    }
  }

  const closeListCreation = async () => {
    setListData({listName: '', private: true})
    setShowNewListPopUp(false)
  }

  const updateUserLists = async () => {
    if (!user) {
      return
    }

    try {
      const lists = await getMyLists()
      setUserLists(lists.data)
      console.log(lists.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    updateUserLists()
  }, [user])

  return (
    <div>
      <h2>Playlist</h2>
      {user ? 
        <>
          <button onClick={() => setShowNewListPopUp(true)}>Créer une playlist</button>

          {showNewListPopup && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <div className={styles.popupField}>
                  <p>Nom de la playlist:</p>
                  <input type="text" value={listData.listName} onChange={(value) => setListData({...listData, listName: value.target.value})} required/>
                </div>

                <div className={styles.popupField}>
                  <p>Rendre publique:</p>
                  <input type="checkBox" value={listData.private} onChange={(value) => setListData({ ...listData, private: !listData.private})}/>
                </div>

                <div className={styles.popupField}>
                  <button onClick={newList}>Créer</button>
                  <button onClick={closeListCreation}>Annuler</button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.listDiv}>
            {userLists.map((list, index) => (
              <NavLink to={`/Playlist/details?id=${list._id}`} key={index} className={styles.listButton}>{list.name}</NavLink>
            ))}
          </div>
        </>
      :
        <p>Veuillez vous connecter pour accedez a vos playlist !</p>
      }

    </div>
  );
}
