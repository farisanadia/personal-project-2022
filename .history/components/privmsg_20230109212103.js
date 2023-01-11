import { userContext } from "../context/userContext"
import { useContext } from "react"
import { BsCameraVideoFill } from "react-icons/bs";
import { HiUserAdd } from "react-icons/sl";

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return value ?
        <div className="rounded-tr-lg rounded-br-lg bg-slate-500">
            <div className="h-16 bg-grey-600 flex items-center">
                <h2 className="p-4 text-gray-300">{value.userName}</h2>
                <BsCameraVideoFill className="text-lg text-gray-300"/>
                <SlUserFollow className="text-lg text-gray-300"/>
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