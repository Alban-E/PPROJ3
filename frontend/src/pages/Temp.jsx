import { useNavigate } from "react-router-dom";

export default function Temp() {
    const navigate = useNavigate();

    const goBack=()=>{navigate('/')};
    return(
        <>
        <div>
            <button onClick={goBack}>Test navigation</button>
        </div>
        </>
    );
}

