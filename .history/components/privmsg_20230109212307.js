import { userContext } from "../context/userContext"
import { useContext } from "react"
import { BsCameraVideoFill } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";
import { AiOutlineEllipsis } from "react-icons/ai";

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);

    return value ?
        <div className="rounded-tr-lg rounded-br-lg bg-slate-500">
            <div className="h-16 bg-grey-600 flex items-center gap-2">
                <h2 className="p-4 text-gray-300">{value.userName}</h2>
                <BsCameraVideoFill className="text-xl text-gray-300"/>
                <MdPersonAddAlt1 className="text-xl text-gray-300"/>
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