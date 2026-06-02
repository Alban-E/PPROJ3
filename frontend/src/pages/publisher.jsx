import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchPublisher, searchPublisherGames } from "../service/axios";
import GameCard from "../components/card/GameCard";
import styles from "./publisher.module.css";


export default function Publisher(){
    const [searcParams] = useSearchParams();
    const id = searcParams.get("id")
    const navigate = useNavigate();

    const [publisherData, setPublisherData] = useState(null);
    const [loadingPublisher, setLoadingPublisher] = useState(true);

    useEffect(() => {
        async function loadPublisher() {
            try {
                setLoadingPublisher(true);
                const payload = {
                    publisherId: id
                }
                const result = await searchPublisher(payload);
                setPublisherData(result.data);
            } catch (error) {
                console.error(`An error occured during the publisher loading: ${error}`);
                navigate('/notfound');
            }
            finally{setLoadingPublisher(false);}
        }
        loadPublisher();
    }, [id]);

    const [publisherGames, setPublisherGames] = useState(null);
    const [publisherGamesPage, setPublisherGamesPage] = useState(1);
    const [isNextPublisherGamesPage, setisNextPublisherGamesPage] = useState(false);
    const [loadingPublisherGames, setLoadingPublisherGames] = useState(true);

    useEffect(() => {
        async function loadPublisherGames() {
            try {
                setLoadingPublisherGames(true);
                const payload = {
                    publisherId: id,
                    page: publisherGamesPage
                }
                const result = await searchPublisherGames(payload);
                console.log("payload: ", payload, "result: ", result.data)
                setPublisherGames(result.data.results);
                setisNextPublisherGamesPage(Boolean(result.data.next));
            } catch (error) {
                console.error(`An error occured during the publisher loading: ${error}`);
            }
            finally{setLoadingPublisherGames(false);}
        }
        loadPublisherGames();
    }, [id, publisherGamesPage]);


    return(
        <div className={styles.publishersPart}>
            {loadingPublisher ? (
                <p className={styles.publishersLoading}>Chargement de l'éditeur ...</p>
            ) : (
                publisherData ?
                    <>
                        <h1 className={styles.publisherName}>{publisherData.name}</h1>
                        <img src={publisherData.image_background} height={1080/2} className={styles.publisherImage} alt={`${publisherData.name} cover image`}/>
                        <p className={styles.publisherGamesAmount}>Nombre de jeu(x): {publisherData.games_count}</p>

                        <div className={styles.gameContainer}>
                            {loadingPublisherGames ? (
                                <h2 className={styles.gamesLoading}>Chargement des jeux ...</h2>
                            ) : (
                                <>
                                    {publisherGames?.length > 0 ? (
                                        <>
                                            {publisherGames.slice().map(game =>
                                                <GameCard key={game.id} id={game.id} name={game.name} releaseDate={game.released} rating={game.rating} tags={game.tags} developers={game.developers} publishers={game.publishers} imageURL={game.background_image}/>
                                            )}
                                            <div className={styles.publisherGamesPageButtons}>
                                                <button disabled={publisherGamesPage === 1} onClick={()=> {setPublisherGamesPage(publisherGamesPage - 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.publisherGamesPreviousPage}>Page précédente</button>
                                                <button disabled={!isNextPublisherGamesPage} onClick={()=> {setPublisherGamesPage(publisherGamesPage + 1), window.scrollTo({top: 0,behavior: "smooth" })}} className={styles.publisherGamesNextPage}>Page suivante</button>
                                            </div>
                                        </>
                                    ) : null }
                                </>
                            )}
                        </div>
                    </>
                :
                    <p>Aucune Donnée récupérée</p>
            )}
        </div>
    )
}