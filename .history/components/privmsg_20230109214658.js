import { userContext } from "../context/userContext"
import { useContext, useState } from "react"
import { BsCameraVideoFill } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";
import { AiOutlineEllipsis } from "react-icons/ai";

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);
    const [text, setText] = useState("");

    const onSubmit = async(e) => {
        
    }

    return value ?
        <div className="">
            <div className="h-16 bg-slate-700 flex items-center gap-2">
                <h2 className="p-4 text-gray-300">{value.userName}</h2>
                <li className="text-xl text-gray-300 flex justify-end gap-3">
                    <BsCameraVideoFill/>
                    <MdPersonAddAlt1/>
                    <AiOutlineEllipsis/>
                </li>
            </div>
            <div className="bg-slate-300 h-96">

            </div>
            <form className="items-center" onSubmit={sendText}>
                <input placeholder="Type something..." 
                onChange={(e) => setText(e.target.value)} value={text}
                className="w-full h-12 bg-gray-200 p-2 focus:outline-none text-sm"
                />
            </form>
        </div>
    :
    <div className="">
            <div className="h-16 bg-slate-700 flex items-center gap-2">

            </div>
            <div className="bg-slate-300 h-96">

            </div>
            <div className="bg-slate-200 h-12">
            </div>
        </div>
}