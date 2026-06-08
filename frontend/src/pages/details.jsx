import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getMyLists, addGameToList, searchGameAchievements, searchGameById, searchGameTrailer, createFeedback, getMyGameFeedback, deleteFeedback } from "../service/axios";
import reformatDate from "../service/ReformatDate";
import { useEffect, useState } from "react";
import styles from "./Details.module.css";
import { useAuth } from "../service/AuthContext";

export default function Details(){
    const { user } = useAuth()

    const [queryParam] = useSearchParams();
    const gameId = queryParam.get("id")
    const navigate = useNavigate();

    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        async function loadGame() {
            try{
                setLoading(true);
                const payload = {gameId: gameId}
                const result = await searchGameById(payload);
                setGame(result.data);
            }catch(error){
                navigate('/NotFound');
                console.error(`An error occured during the game loading: ${error}`);
            }
            finally{setLoading(false);}
        }

        loadGame();
        } , [gameId]);
    
    const [achievements, setAchievements] = useState([]);
    const [achievementsPage, setAchievementsPage] = useState(1);
    const [isNextAchievementsNextPage, setIsNextAchievementsNextPage] = useState(false);
    const [achievementsLoading, setAchievementsLoading] = useState(true);

    useEffect( ()=> {
        async function loadAchievements() {
            try{
                setAchievementsLoading(true);
                const payload = {gameId: gameId, page: achievementsPage}
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

    }, [gameId, achievementsPage]);

    const [trailers, setTrailers] = useState([]);
    const [trailersPage, setTrailersPage] = useState(1);
    const [isNextTrailersNextPage, setIsNextTrailersNextPage] = useState(false);
    const [TrailersLoading, setTrailersLoading] = useState(true);

    useEffect(() => {
        async function loadTrailers() {
            try {
                setTrailersLoading(true);
                const payload = {gameId: gameId}
                const result = await searchGameTrailer(payload);
                setTrailers(result.data.results);
                setIsNextTrailersNextPage(Boolean(result.data.next))
                
            } catch (error) {
                console.error(`An error occured during the trailers loading: ${error}`);
            }
            finally{setTrailersLoading(false);}
        }
        loadTrailers();
    }, [gameId, trailersPage])

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
        } catch (error) {
            console.error(`An error occured when loading the user's list: ${error}`);
        }
    }

    useEffect(() => {
        handleGetUserLists()
    }, [user])

    const handleAddGametoList = async () => {
        if (!listTarget) {
            setAddGameError("Veuillez sélectionner une liste")
            return
        }
        
        setDisplayAddToPlaylistPopup(!displayAddToPlaylistPopup)
        try {
            const payload = {
                listId: listTarget,
                gameId: gameId
            }
            const result = await addGameToList(payload)
            setAddGameError("")
        } catch (error) {
            if (error?.response?.status === 409){
                setAddGameError("Ce jeu est déjà dans cette liste")
                console.error(`An error occured when the game was added to the list: ${error.message}`);
                return
            }
            setAddGameError(error?.response?.data?.message ||"une erreur est survenue")
            console.error(`An error occured when the game was added to the list: ${error.message}`);
        }
    }

    const [myFeedback, setMyFeedback] = useState(null)
    const [updateFeedback, setUpdateFeedback] = useState(0)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [feedbackError, setFeedbackError] = useState("")

    useEffect(() => {
        if(!user){
            return
        }

        const fetchMyFeedback = async () => {
            try {
                const params = {userId: user._id, gameId: gameId}
                const res = await getMyGameFeedback(params)
                if (res.data.length === 0){
                    setMyFeedback(null)
                    return
                }
                setMyFeedback(res.data[0])
            } catch (error) {
                setMyFeedback(null)
                const status = error.response?.status
                if (status === 404){
                    return
                }
                console.log("Couldn't fetch user's feedback for this game: ", error)
            }
        }

        fetchMyFeedback()
    }, [gameId, user, updateFeedback])

    const handleCritic = async () => {
        try {
            if(!comment && !rating){
                setFeedbackError("Commentaire et note non définis")
                return
            }
            const params = {
                comment: comment,
                rating: rating,
                gameId: gameId
            }
            const res =  await createFeedback(params)
            setUpdateFeedback(updateFeedback + 1)
            setFeedbackError("")
        } catch (error) {
            console.log("Couldn't create feedback: ", error)
        }
    }

    const deleteMyReview = async () => {
        try {
            const res = await deleteFeedback(myFeedback._id)
            setUpdateFeedback(updateFeedback + 1)
        } catch (error) {
            console.log("Couldn't remove feedback: ", error)
            setFeedbackError("Une erreur est survenue durant la suppression de votre avis")
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
                                <div className={styles.displayPopupContainer}>
                                    <button onClick={() => {setDisplayAddToPlaylistPopup(!displayAddToPlaylistPopup); setListTarget("")}} className={styles.addToPlaylistButton}>Ajouter à une playlist</button>
                                    {addGameError && <p className={styles.errorMessage}>{addGameError}</p>}
                                </div>
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

                <div className={styles.feedbackContainer}>
                    <p className={styles.feedbackError}>{feedbackError}</p>
                    {myFeedback?
                        <>
                            <p>Vous avez déjà laissé un avis sur ce jeu</p>
                            <p>Votre note: {myFeedback.rating}</p>
                            <p>Votre commentaire: {myFeedback.comment}</p>
                            <button className={styles.deleteReviewButton} onClick={() => {deleteMyReview()}}>Supprimer votre avis</button>
                        </>
                    :
                        <>
                            <input type="text" placeholder="Votre commentaire..." value={comment} onChange={(e) => {setComment(e.target.value)}}/>

                            <fieldset>
                                <legend>Votre note :</legend>
                                <div className={styles.radioInput}>
                                    <input type="radio" id="1" name="note" value="1" checked={rating === 1} onChange={(e) => setRating(Number(e.target.value))}/>
                                    <label for="1">⭐</label>
                                </div>
                                <div className={styles.radioInput}>
                                    <input type="radio" id="2" name="note" value="2" checked={rating === 2} onChange={(e) => setRating(Number(e.target.value))}/>
                                    <label for="2">⭐⭐</label>
                                </div>
                                <div className={styles.radioInput}>
                                    <input type="radio" id="3" name="note" value="3" checked={rating === 3} onChange={(e) => setRating(Number(e.target.value))}/>
                                    <label for="3">⭐⭐⭐</label>
                                </div>
                                <div className={styles.radioInput}>
                                    <input type="radio" id="4" name="note" value="4" checked={rating === 4} onChange={(e) => setRating(Number(e.target.value))}/>
                                    <label for="4">⭐⭐⭐⭐</label>
                                </div>
                                <div className={styles.radioInput}>
                                    <input type="radio" id="5" name="note" value="5" checked={rating === 5} onChange={(e) => setRating(Number(e.target.value))}/>
                                    <label for="5">⭐⭐⭐⭐⭐</label>
                                </div>
                            </fieldset>
                            
                            <button className={styles.sendFeedbackButton} onClick={() => {handleCritic()}}>Envoyer</button>
                        </>
                    }
                </div>


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