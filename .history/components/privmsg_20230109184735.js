import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return value ? 
        <div>
            {value.userName}
        </div>
    : 
    <div className="text-white">
    </div>
}