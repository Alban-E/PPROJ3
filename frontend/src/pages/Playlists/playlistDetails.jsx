import { useSearchParams } from "react-router-dom";
import { getTracksFromList } from "../../service/axios";

export default function PlayListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')

    return <p>List Id: {id}</p>
}