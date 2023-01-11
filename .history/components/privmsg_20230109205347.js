import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return (
        <div className="rounded-tr-lg rounded-">
            <div className="h-16 bg-grey-600 flex" >
                {value.userName}
            </div>
            <div className="bg-black">

            </div>
        </div>
    )
}