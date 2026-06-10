import { useEffect, useState } from "react";
import GameCard from "../components/card/GameCard";
import { getListByName, getUserByUsername, searchGames, updateFeedback } from "../service/axios";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

export default function Home(){
    const [titleToSearch, setTitleToSearch] = useState("")
    const [titleToSearchDebounce, setTitleToSearchDebounce] = useState("")

    const [displayPart, setDisplayPart] = useState("games")

    const [gameResultCount, setGameResultCount] = useState(0) 
    const [games, setGames] = useState([]);
    const [gameLoading, setGameLoading] = useState(true);
    const [currentGamePage, setCurrentGamePage] = useState(1);
    const [gameFilters,setGameFilters] = useState({platform: null, store: null, ordering: null});
    const [reverseOrdering, setReverseOrdering] = useState(true); 
    const [isNextPage, setIsNextPage] = useState(false);

    const [userResultCount, setUserResultCount] = useState(0)
    const [users, setUsers] = useState([])
    const [userLoading, setUserLoading] = useState(false)

    const [listResultCount, setListResultCount] = useState(0)
    const [lists, setLists] = useState([])
    const [listLoading, setListLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleToSearchDebounce(titleToSearch)
        }, 500);

        return () => {clearTimeout(timer)}
    }, [titleToSearch])

    useEffect( () => { 
        async function loadGames() {                
            try {
                setGameLoading(true);

                const orderingParam = gameFilters.ordering? (reverseOrdering? `-${gameFilters.ordering}`: gameFilters.ordering) : null;
                const title = titleToSearchDebounce.trim().split(" ").join("-")
                const payload = {
                  search: title,
                  search_exact: (titleToSearchDebounce? true : null),
                  platforms: gameFilters.platform,
                  stores: gameFilters.store,
                  ordering: orderingParam,
                  page: currentGamePage,
                  page_size: 40
                }
                const result = await searchGames(payload);

                setIsNextPage(Boolean(result.data.next))
                setGames(result.data.results)
                setGameResultCount(result.data.count)
            } catch (error) {
                console.error(`An error occured: ${error}`)
            } finally{ setGameLoading(false) }
        }

        loadGames()
        } , [gameFilters, currentGamePage, reverseOrdering, titleToSearchDebounce]);
    
    useEffect(()=>{
        if(!titleToSearchDebounce) {
          setUsers([])
          setLists([])
          return
        }

        async function loadUsers() {
          try {
            setUserLoading(true)
            const params = { username: titleToSearchDebounce}
            const result = await getUserByUsername(params)
            console.log("users: ", result.data)
            setUsers(result.data)
          } catch (error) {
            const status = error?.response?.status
            if(status===404){
              return
            }
            console.log("An error occurred in the get user by username part: ", error)
          } finally{ setUserLoading(false) }
        }
        
        async function loadLists() {
          try {
            setListLoading(true)
            const params = { listName: titleToSearchDebounce}
            const result = await getListByName(params)
            console.log("lists: ", result.data)
            setLists(result.data)
          } catch (error) {
            const status = error?.response?.status
            if(status===404){
              setLists([])
              return
            }
            console.log("An error occurred in the get list by name part: ", error)
          } finally { setListLoading(false) }
        }
        
        loadUsers()
        loadLists()
        }, [titleToSearchDebounce])

    return (
        <>
          <div className={styles.filtersContainer}>
            <input type="text" placeholder="Rechercher..." value={titleToSearch} onChange={(e) => {setTitleToSearch(e.target.value)}} className={styles.searchInput}/>
            <div className={styles.filters}>
                <select onChange={(e) => {setCurrentGamePage(1); setReverseOrdering(false); setGameFilters({...gameFilters, platform: e.target.value || null})}} className={styles.platformFilterSelect}>
                <option value="">Toutes les plateformes</option>
                    <option value="1">Xbox One</option>
                    <option value="3">iOS</option>
                    <option value="4">PC</option>
                    <option value="5">macOS</option>
                    <option value="6">Linux</option>
                    <option value="7">Nintendo Switch</option>
                    <option value="8">Nintendo 3DS</option>
                    <option value="9">Nintendo DS</option>
                    <option value="10">Wii U</option>
                    <option value="11">Wii</option>
                    <option value="12">Neo Geo</option>
                    <option value="13">Nintendo DSi</option>
                    <option value="14">Xbox 360</option>
                    <option value="15">PlayStation 2</option>
                    <option value="16">PlayStation 3</option>
                    <option value="17">PSP</option>
                    <option value="18">PlayStation 4</option>
                    <option value="19">PS Vita</option>
                    <option value="21">Android</option>
                    <option value="22">Atari Flashback</option>
                    <option value="23">Atari 2600</option>
                    <option value="24">Game Boy Advance</option>
                    <option value="25">Atari 8-bit</option>
                    <option value="26">Game Boy</option>
                    <option value="27">PlayStation</option>
                    <option value="28">Atari 7800</option>
                    <option value="31">Atari 5200</option>
                    <option value="34">Atari ST</option>
                    <option value="41">Apple II</option>
                    <option value="43">Game Boy Color</option>
                    <option value="46">Atari Lynx</option>
                    <option value="49">NES</option>
                    <option value="50">Atari XEGS</option>
                    <option value="55">Classic Macintosh</option>
                    <option value="74">SEGA Master System</option>
                    <option value="77">Game Gear</option>
                    <option value="79">SNES</option>
                    <option value="80">Xbox</option>
                    <option value="83">Nintendo 64</option>
                    <option value="105">GameCube</option>
                    <option value="106">Dreamcast</option>
                    <option value="107">SEGA Saturn</option>
                    <option value="111">3DO</option>
                    <option value="112">Jaguar</option>
                    <option value="117">SEGA 32X</option>
                    <option value="119">SEGA CD</option>
                    <option value="166">Commodore / Amiga</option>
                    <option value="167">Genesis</option>
                    <option value="186">Xbox Series S/X</option>
                    <option value="187">PlayStation 5</option>
                </select>

                <select onChange={(e) => {setCurrentGamePage(1); setReverseOrdering(false); setGameFilters({...gameFilters, store: e.target.value ||null})}} className={styles.storeFilterSelect}>
                    <option value="">Tous les stores</option>
                    <option value="1">Steam</option>
                    <option value="2">Xbox Store</option>
                    <option value="3">Playstation Store</option>
                    <option value="4">App Store</option>
                    <option value="5">GOG</option>
                    <option value="6">Nintendo Store</option>
                    <option value="7">Xbox 360 Store</option>
                    <option value="8">Google Play</option>
                    <option value="9">Itch.io</option>
                    <option value="11">Epic Games</option>
                </select>

                <select onChange={(e) => {setCurrentGamePage(1); setReverseOrdering(false); setGameFilters({...gameFilters, ordering: e.target.value})}} className={styles.orderingFilterSelect}>
                    <option value="">Aucun</option>
                    <option value="name">Nom</option>
                    <option value="released">Date de Sortie</option>
                    <option value="rating">Note</option>
                    <option value="metacritic">Metacritique</option>
                </select>

                <button disabled={!gameFilters.ordering} onClick={() => setReverseOrdering(prev => !prev)} className={styles.reverseOrderingButton}>⬇️⬆️</button>
            </div>
          </div>
          
          <div className={styles.selectResultContainer}>
            <div className={styles.selectResult}>
              <button className={styles.selectResultButton} onClick={() => {setDisplayPart("games")}}>Jeux</button>
              <button className={styles.selectResultButton} onClick={() => {setDisplayPart("users")}}>Utilisateurs</button>
              <button className={styles.selectResultButton} onClick={() => {setDisplayPart("lists")}}>Listes</button>
            </div>
          </div>
          
          {displayPart === "games" &&
            <div className={styles.gamesContainer}>
              {gameLoading ? (
                <p className={styles.loading}>Chargement ...</p>
              ) : (
                <>
                  <div className={styles.gamesPageButtons}>
                    <p className={styles.resultAmount}>{gameResultCount} jeux trouvés</p>
                    <div>
                      <button disabled={currentGamePage === 1} onClick={()=> {setCurrentGamePage(currentGamePage - 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesPreviousPage}>Page précédente</button>
                      <button disabled={!isNextPage} onClick={()=> {setCurrentGamePage(currentGamePage + 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesNextPage}>Page suivante</button>
                    </div>
                  </div>


                  <div className={styles.cardGameContainer}>
                    {games?.map(game => (
                      <GameCard key={game.id} id={game.id} name={game.name} releaseDate={game.released} rating={game.rating} tags={game.tags} developers={game.developers} publishers={game.publishers} imageURL={game.background_image}/>
                    ))}
                  </div>
                      
                  <div className={styles.gamesPageButtons}>
                    <div>
                      <button disabled={currentGamePage === 1} onClick={()=> {setCurrentGamePage(currentGamePage - 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesPreviousPage}>Page précédente</button>
                      <button disabled={!isNextPage} onClick={()=> {setCurrentGamePage(currentGamePage + 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesNextPage}>Page suivante</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          }

          {displayPart === "users" &&
            <div className={styles.userContainer}>
              {userLoading ?
                <p className={styles.loading}>Chargement...</p>
              :
                users.length === 0 ?
                  <p className={styles.noneResult}>Aucun utilisateur trouvé</p>
                : 
                  <div className={styles.userCardContainer}>
                      {users?.map((user, index) => {
                      return (
                        <div className={styles.userCard} key={index}>
                          <p className={styles.username}>{user.username}</p>
                        </div>
                      )
                    })}
                  </div>
              }
            </div>
          }

          {displayPart === "lists" &&
            <div className={styles.listContainer}>
              {listLoading?
                <p className={styles.loading}>Chargement...</p>
              :
                lists.length === 0 ?
                  <p className={styles.noneResult}>Aucune listes trouvés</p>
                :
                  <div className={styles.listCardContainer}>
                    {lists?.map((list, index) => {
                      return (
                        <Link to={`/List/details?id=${list._id}`} key={index} className={styles.listCard}>{list.name}</Link>
                      )
                    })}
                  </div>
              }
            </div>
          }
        </>
    );
}