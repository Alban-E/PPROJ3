import { useEffect, useState } from "react";
import { useAuth } from "../service/AuthContext";
import { getMyLists } from "../service/axios";
import styles from "./lists.module.css"

export default function Lists() {
  const { user } = useAuth()

  const [userLists, setUserLists] = useState([])

  const updateUserLists = async () => {
    if (!user) {
      return
    }

    try {
      const lists = await getMyLists()
      setUserLists(lists.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    updateUserLists()
  }, [])

  return (
    <div>
      <h1>Playlist</h1>
      <p>Tu trouveras tes playlists ici !</p>
      <div className={styles.listDiv}>
        {userLists.map((item, index) => (
          <button key={index} className={styles.listButton}>{item.name}</button>
        ))}
      </div>
    </div>
  );
}