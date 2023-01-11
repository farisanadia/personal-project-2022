import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return(
        if (!value)
        <div className="bg-black">
            hi
        </div>
    )
}