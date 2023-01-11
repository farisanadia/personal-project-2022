import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);
    
    return(
        <div className="bg-black">
            hi
        </div>
    )
}