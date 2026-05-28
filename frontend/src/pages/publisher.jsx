import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getPublisherById, getPublisherGames } from "../services/publishers";
import GameCard from "../components/card/GameCard";
import styles from "./publisher.module.css";


export default function Publisher(){
    const { id } = useParams();
    const navigate = useNavigate();

    let [publisher, setPublisher] = useState(null);
    let [loadingPublisher, setLoadingPublisher] = useState(true);

    useEffect(() => {
        async function loadPublisher() {
            try {
                setLoadingPublisher(true);
                // const result = await getPublisherById(id);
                setPublisher(result.data);
            } catch (error) {
                console.error(`An error occured during the publisher loading: ${error}`);
                navigate('/notfound');
            }
            finally{setLoadingPublisher(false);}
        }
        loadPublisher();
    }, [id]);

    let [publisherGames, setPublisherGames] = useState(null);
    let [publisherGamesPage, setPublisherGamesPage] = useState(1);
    let [isNextPublisherGamesPage, setisNextPublisherGamesPage] = useState(false);
    let [loadingPublisherGames, setLoadingPublisherGames] = useState(true);

    useEffect(() => {
        async function loadPublisherGames() {
            try {
                setLoadingPublisherGames(true);
                // const result = await getPublisherGames(id, publisherGamesPage);
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
                <>
                    <h1 className={styles.publisherName}>{publisher.name}</h1>
                    <img src={publisher.image_background} height={1080/2} className={styles.publisherImage} alt={`${publisher.name} cover image`}/>
                    <p className={styles.publisherGamesAmount}>Nombre de jeu(x): {publisher.games_count}</p>

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
            )}
        </div>
    )
}