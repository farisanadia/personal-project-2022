import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return (
        <div className="rounded-tr-lg rounded-br-lg bg-slate-500">
            <div className="h-16 bg-grey-600" >
                {value.userName}
            </div>
            <div className="bg-black h-96">

            </div>
            <div className="bg-grey-800">

            </div>
        </div>
    )
}