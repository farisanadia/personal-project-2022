import { userContext } from "../context/userContext"
import { useContext } from "react"

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return value ?
        <div className="rounded-tr-lg rounded-br-lg bg-slate-500">
            <div className="h-16 bg-grey-600 flex items-center">
                <img src={value.avatar} className="w-9 rounded-full" alt=""/>
                {value.userName}
            </div>
            <div className="bg-black h-96">

            </div>
            <div className="bg-grey-800 h-8">

            </div>
        </div>
    :
    <div className="rounded-tr-lg rounded-br-lg bg-slate-500">
            <div className="h-16 bg-grey-600">
            </div>
            <div className="bg-black h-96">

            </div>
            <div className="bg-grey-800 h-8">

            </div>
        </div>
}