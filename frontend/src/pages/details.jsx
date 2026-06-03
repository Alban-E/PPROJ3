import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getMyLists, addGameToList, searchGameAchievements, searchGameById, searchGameTrailer } from "../service/axios";
import reformatDate from "../service/ReformatDate";
import { useEffect, useState } from "react";
import styles from "./Details.module.css";
import { useAuth } from "../service/AuthContext";

export default function Details(){
    const { user } = useAuth()

    const [queryParam] = useSearchParams();
    const id = queryParam.get("id")
    const navigate = useNavigate();

    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        async function loadGame() {
            try{
                setLoading(true);
                const payload = {gameId: id}
                const result = await searchGameById(payload);
                setGame(result.data);
            }catch(error){
                navigate('/NotFound');
                console.error(`An error occured during the game loading: ${error}`);
            }
            finally{setLoading(false);}
        }

        loadGame();
        } , [id]);
    
    const [achievements, setAchievements] = useState([]);
    const [achievementsPage, setAchievementsPage] = useState(1);
    const [isNextAchievementsNextPage, setIsNextAchievementsNextPage] = useState(false);
    const [achievementsLoading, setAchievementsLoading] = useState(true);

    useEffect( ()=> {
        async function loadAchievements() {
            try{
                setAchievementsLoading(true);
                const payload = {gameId: id, page: achievementsPage}
                const result = await searchGameAchievements(payload);
                setAchievements(result.data.results);
                setIsNextAchievementsNextPage(Boolean(result.data.next));
            }
            catch (error) {
                console.error(`An error occured during the achievement loading: ${error}`);
            }
            finally{setAchievementsLoading(false);}
        }

        loadAchievements();

    }, [id, achievementsPage]);

    const [trailers, setTrailers] = useState([]);
    const [trailersPage, setTrailersPage] = useState(1);
    const [isNextTrailersNextPage, setIsNextTrailersNextPage] = useState(false);
    const [TrailersLoading, setTrailersLoading] = useState(true);

    useEffect(() => {
        async function loadTrailers() {
            try {
                setTrailersLoading(true);
                const payload = {gameId: id}
                const result = await searchGameTrailer(payload);
                setTrailers(result.data.results);
                setIsNextTrailersNextPage(Boolean(result.data.next))
                
            } catch (error) {
                console.error(`An error occured during the trailers loading: ${error}`);
            }
            finally{setTrailersLoading(false);}
        }
        loadTrailers();
    }, [id, trailersPage])

    const [displayAddToPlaylistPopup, setDisplayAddToPlaylistPopup] = useState(false)
    const [userLists, setUserLists] = useState([])
    const [listTarget, setListTarget] = useState("")
    const [addGameError, setAddGameError] = useState("")

    const handleGetUserLists = async () => {
        if (!user) {
            return
        }

        try {
            const lists = await getMyLists()
            setUserLists(lists.data)
            console.log(lists.data)
        } catch (error) {
            setAddGameError(error)
            console.error(`An error occured during the list loading: ${error}`);

        }
    }

    useEffect(() => {
        handleGetUserLists()
    }, [user])

    const handleAddGametoList = async () => {
        if (!listTarget) {
            return
        }

        try {
            const payload = {
                listId: listTarget,
                gameId: id
            }
            console.log(payload)
            const result = await addGameToList(payload)
            console.log(result)
            setDisplayAddToPlaylistPopup(!displayAddToPlaylistPopup)
        } catch (error) {
            console.error(`An error occured during the list loading: ${error}`);
        }
    }

    return (
        loading ? (
            <div className={styles.mainLoading}>
                <h2>Chargement ...</h2>
            </div>
        ) : (
            <div className={styles.mainContainer}>
                <h1 className={styles.Title}>{game.name}</h1>
                <img src={game.background_image} height={1080/2} className={styles.gameCover} alt={`${game.name} cover image`}/>

                <div className={styles.addToPlaylistContainer}>
                    {user?
                            <>
                                <button onClick={() => {setDisplayAddToPlaylistPopup(!displayAddToPlaylistPopup)}} className={styles.addToPlaylistButton}>Ajouter à une playlist</button>
                                {displayAddToPlaylistPopup && 
                                    <div className={styles.addToPlaylistPopup}>
                                        <div className={styles.popup}>
                                            <select onChange={(event) => {setListTarget(event.target.value)}} className={styles.listselecter}>
                                                <option value="">Selectionner une playlist</option>    
                                                {userLists?.map((list, index) => { return (
                                                    <option key={index} value={list._id}>{list.name}</option>
                                                )})}
                                            </select>
                                            
                                            <div className={styles.validPart}>
                                                <button onClick={handleAddGametoList} className={styles.addToPlaylistButton}>Ajouter</button>
                                                <button className={styles.addToPlaylistButton} onClick={() => {setDisplayAddToPlaylistPopup(!displayAddToPlaylistPopup)}} className={styles.echapButton}>X</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        :
                            <Link to={'/Account'} className={styles.addToPlaylistText}>Pour ajouter le jeu a une playlist veuillez vous connecter</Link>
                    }
                </div>

                <p className={styles.gameDescription}>{game.description_raw}</p>
                <p className={styles.releaseDate}>{reformatDate(game.released)}</p>
                <p className={styles.rating}>⭐{game.rating}⭐</p>

                <div className={styles.trailerPart}>
                    {TrailersLoading ? (
                        <h2 className={styles.trailerLoading}>Chargement des trailers ...</h2>
                    ) : (
                        <>
                            {trailers?.length > 0 ? (
                                <>
                                    <h2 className={styles.trailersTitle}>Trailers</h2>
                                    
                                    <div className={styles.trailerCotnainer}>
                                        {trailers.slice().map(trailer =>
                                            <div key={trailer.id} className={styles.trailerCard}>
                                                <p className={styles.trailerName}>{trailer.name}</p>

                                                <video controls poster={trailer.preview} height={1080/4} className={styles.trailer}>
                                                    <source src={trailer.data.max} type="video/mp4"/>
                                                    <track kind="captions" label="No captions availables" default/>

                                                </video>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (<p>Aucun trailer n'est disponible pour {game.name}</p>)}
                        </>
                    )}
                </div>

                <div className={styles.achievementsPart}>
                    {achievementsLoading ? (
                        <h2 className={styles.achievementLoading}>Chargement des succès ...</h2>
                    ): (
                        <>
                            {achievements?.length > 0 ? (
                                <>
                                    <h2 className={styles.achievementsTitle}>Succès</h2>

                                    <div className={styles.achievementsContainer}>
                                        {achievements.slice().map(achievement =>
                                            <div key={achievement.id} className={styles.AchievementCard}>
                                                <p className={styles.achievementName}>{achievement.name}</p>
                                                {!isNaN(Number(achievement.percent)) ? (
                                                    <>
                                                        <progress value={achievement.percent} max={100} className={styles.achievementProgressBar}/>
                                                        <p className={styles.achievementPercentage}>{achievement.percent}%</p>
                                                    </>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className={styles.achievementPageButtons}>
                                        <button disabled={achievementsPage===1} onClick={() =>setAchievementsPage((prev) => prev - 1)} className={styles.achievementsPreviousPage}>Succès précédents</button>
                                        <button disabled={!isNextAchievementsNextPage} onClick={() => setAchievementsPage((prev) => prev + 1)} className={styles.AchievementsNextPage}>Succès suivants</button>
                                    </div>
                                </>
                            ) : (<p>Aucun succès n'est disponible pour {game.name}</p>)}

                        </>
                    )}
                </div>
                
                <div className={styles.platformsPart}>
                    {game.platforms?.length > 0 ? (
                        <>
                            <h2 className={styles.platformTitle}>Plateformes</h2>

                            {game.platforms.slice().map(platform =>
                                <p key={platform.platform.id} className={styles.platformName}>{platform.platform.name}</p>
                            )}
                        </>
                    ) : null}
                </div>

                <div className={styles.storesPart}>
                    {game.stores?.length > 0 ? (
                    <>
                        <h2 className={styles.storeTitle}>Magasins</h2>

                        {game.stores?.slice().map(store =>
                            <p key={store.store.id} className={styles.storeName}>{store.store.name}</p>
                        )}
                    </>
                    ) : null}
                </div>

                <div className={styles.tagsPart}>
                    {game.tags?.length > 0 ? (
                        <>
                            <h2 className={styles.tagTitle}>Catégories</h2>
                        
                            {game.tags.slice().map(tag =>
                                <p key={tag.id} className={styles.tagName}>{tag.name}</p>
                            )}
                        </>
                    ) : null}
                </div>

                <div className={styles.developersPart}>
                    {game.developers?.length > 0 ? (
                        <>
                            <h2 className={styles.developerTitle}>Studio(s) de développement</h2>
                    
                            {game.developers.slice().map(developers =>
                                <p key={developers.id} className={styles.developerName}>{developers.name}</p>
                            )}
                        </>
                    ) : null}
                </div>

                <div className={styles.publishersPart}>
                    {game.publishers?.length > 0 ? (
                        <>
                            <h2 className={styles.publisherTitle}>Editeur(s)</h2>
        
                            {game.publishers?.slice().map(publishers =>
                                <Link to={`/Publisher?id=${publishers.id}`} key={publishers.id} className={styles.publisherName}>{publishers.name}</Link>
                            )}
    
                        </>
                    ) : null}
                </div>

                <a href={game.website} target="_blank" rel="noreferrer" className={styles.gameWebSite}>{game.website}</a>
            </div>
        ))
}