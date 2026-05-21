import { useSearchParams } from "react-router-dom";
import { getListById, getTracksFromList } from "../../service/axios";
import { useEffect, useState } from "react";
import TrackItem from "../../components/TrackItem";

export default function PlayListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')
    const [list, setList] = useState({name: ""})
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(true); 

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
        <>
            {authorized ?
                <>
                    <p>{list.name}</p>
                    {tracks.map((track, index) => (
                    <TrackItem track={track} ></TrackItem>
                    ))}
                </>
            :
                <p>Vous n'êtes pas autorisé à acceder à cette playlist</p>
            }
        </>
    )
}