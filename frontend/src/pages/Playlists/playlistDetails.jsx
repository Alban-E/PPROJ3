import { useSearchParams } from "react-router-dom";
import { getTracksFromList } from "../../service/axios";
import { useEffect, useState } from "react";

export default function PlayListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')
    const [tracks, setTracks] = useState([])
    
    const updateTracks = async() => {
        try {
            const payload = {id: id}
            const res = await getTracksFromList(payload)
            setTracks(res.data)
            
        } catch (error) {
            console.log("error:", error)
        }
        
    }
    
    useEffect(() => {
        updateTracks()
    },[])
    
    return (
        <>
            <p>List Id: {id}</p>
        </>
    )
}