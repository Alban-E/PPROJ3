import { useEffect, useState } from "react";
import GameCard from "../components/card/GameCard";
import { searchGames } from "../service/axios";
import styles from "./home.module.css";

export default function Home(){
    let [games, setGames] = useState([]);
    let [loading, setLoading] = useState(true);
    let [currentPage, setCurrentPage] = useState(1);
    let [filters,setFilters] = useState({platform: null, store: null, ordering: null});
    let [reverseOrdering, setReverseOrdering] = useState(true); 
    let [isNextPage, setIsNextPage] = useState(false);

    useEffect( () => { 
        async function loadGames() {                
            try {
                setLoading(true);

                const orderingParam = filters.ordering? (reverseOrdering? `-${filters.ordering}`: filters.ordering) : null;
                const payload = {
                  platforms: filters.platform,
                  stores: filters.store,
                  ordering: orderingParam,
                  page: currentPage,
                  publishers: null,
                  page_size: 40
                }
                const result = await searchGames(payload);
                console.log(result.data)

                setIsNextPage(Boolean(result.data.next))
                setGames(result.data.results);
            } catch (error) {
                console.error(`An error occured: ${error}`)
            }
            finally{ setLoading(false); }
        }   
        loadGames()
        } , [filters, currentPage, reverseOrdering]);
    

    return (
        <>
          <div className={styles.filters}>
                <select onChange={(e) => {setCurrentPage(1); setReverseOrdering(false); setFilters({...filters, platform: e.target.value || null})}} className={styles.platformFilterSelect}>
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

                <select onChange={(e) => {setCurrentPage(1); setReverseOrdering(false); setFilters({...filters, store: e.target.value ||null})}} className={styles.storeFilterSelect}>
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

                <select onChange={(e) => {setCurrentPage(1); setReverseOrdering(false); setFilters({...filters, ordering: e.target.value})}} className={styles.orderingFilterSelect}>
                    <option value="">Aucun</option>
                    <option value="name">Nom</option>
                    <option value="released">Date de Sortie</option>
                    <option value="rating">Note</option>
                    <option value="metacritic">Metacritique</option>
                </select>

                <button disabled={!filters.ordering} onClick={() => setReverseOrdering(prev => !prev)} className={styles.reverseOrderingButton}>⬇️⬆️</button>
          </div>
          
          <div className={styles.gamesContainer}>
            {loading ? (
              <p className={styles.loading}>Chargement ...</p>
            ) : (
              <>
                <div className={styles.gamesPageButtons}>
                  <button disabled={currentPage === 1} onClick={()=> {setCurrentPage(currentPage - 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesPreviousPage}>Page précédente</button>
                  <button disabled={!isNextPage} onClick={()=> {setCurrentPage(currentPage + 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesNextPage}>Page suivante</button>
                </div>


                <div className={styles.cardGameContainer}>
                  {games?.map(game => (
                    <GameCard key={game.id} id={game.id} name={game.name} releaseDate={game.released} rating={game.rating} tags={game.tags} developers={game.developers} publishers={game.publishers} imageURL={game.background_image}/>
                  ))}
                </div>
                    
                <div className={styles.gamesPageButtons}>
                  <button disabled={currentPage === 1} onClick={()=> {setCurrentPage(currentPage - 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesPreviousPage}>Page précédente</button>
                  <button disabled={!isNextPage} onClick={()=> {setCurrentPage(currentPage + 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.gamesNextPage}>Page suivante</button>
                </div>
              </>
            )}
          </div>
        </>
    );
}