import { useSearchParams } from "react-router-dom";
import { getListById, getTracksFromList } from "../../service/axios";
import { useEffect, useState } from "react";
import TrackItem from "../../components/TrackItem";
import styles from './playlistDetails.module.css'
import { Fragment } from "react";

export default function PlayListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')
    const [list, setList] = useState({name: ""})
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(true); 
    const test = [
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
    ]

    const updateTracks = async() => {
        try {
            const payload = {id: id}
            const listRes = await getListById(payload)
            setList(listRes.data)

            const tracksRes = await getTracksFromList(payload)
            setTracks(tracksRes.data)
            
        } catch (error) {
            const status = error.response?.status
            if (status === 409) {
                setAuthorized(false)
                console.log('Unauthorized operation')
            }
            else {
                console.log("error:", error)
            }
        }
        
    }
    
    useEffect(() => {

        updateTracks()
    },[])
    
    return (
        authorized ?
            <div className={styles.content}>
                <h2 className={styles.title}>{list.name}</h2>
                <p>Morceaux présents dans la playlists :</p>
                <div className={styles.trackList}>
                    {test.map((track, index) => (
                    <TrackItem key={index} track={track} ></TrackItem>
                    ))}
                </div>
            </div>
        :
            <p>Vous n'êtes pas autorisé à acceder à cette playlist</p>
        
    )
}