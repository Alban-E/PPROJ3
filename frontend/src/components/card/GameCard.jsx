// import { reformatDate } from "../services/games";
import reformatDate from '../../service/ReformatDate'
import { Link } from 'react-router-dom'
import styles from "./GameCard.module.css"

export default function GameCard({id, name, releaseDate, rating, tags, developers, publishers, imageURL}){
    const game = {id, name, released: releaseDate, rating, tags, developers, publishers, background_image: imageURL};


    return (
        <div className={styles.cardWrapper}>
            <Link className={styles.cardLink} to={`/Details?id=${id}`}>
                <div className={styles.card}>
                    <h2 className={styles.gameTitle}>{name}</h2>
                    <img className={styles.gameCover} src={imageURL} alt={`${name}'s cover image`} height={1080/4} loading="lazy"/>
                    <div className={styles.cardBody}>
                        <div className={styles.meta}>
                            <p className={styles.releaseDate}>{reformatDate(releaseDate)}</p>
                            <p className={styles.rating}>{rating}⭐</p>
                        </div>

                        <div className={styles.tagsPart}>
                            {tags? <h3>Tags:</h3> : null }
                            <div className={styles.tagsContainer}>
                                {tags?.slice(0,3).map(tag =>(
                                    <p key={tag.id}>{tag.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            
        </div>
    );
}