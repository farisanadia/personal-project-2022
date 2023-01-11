import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return value ? 
        <div className="bg-black">
            hi
        </div>
    : 
    <div className="text-white">
        {value.userName}
    </div>
}