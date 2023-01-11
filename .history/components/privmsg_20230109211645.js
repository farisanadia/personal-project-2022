import { userContext } from "../context/userContext"
import { useContext } from "react"
import { BsCameraVideoFill } from "react-icons/bs";

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return value ?
        <div className="rounded-tr-lg rounded-br-lg bg-slate-500">
            <div className="h-16 bg-grey-600 flex items-center relative">
                <h2 className="p-4 text-gray-300">{value.userName}</h2>
                <li className="flex justify-end">
                    <BsCameraVideoFill className="text-lg text-gray-300"/>
                </li>
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