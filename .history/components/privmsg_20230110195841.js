import { userContext } from "../context/userContext"
import { useContext, useEffect, useState } from "react"
import { BsCameraVideoFill } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { arrayUnion, collection, doc, onSnapshot, Timestamp, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { chat}

export default function Privmsg() { 
    const {value, setValue} = useContext(userContext);
    const [text, setText] = useState("");
    const [allTexts, setAllTexts] = useState([]);
    const [user, loading] = useAuthState(auth);

    const sendText = async(e) => {
        e.preventDefault();

        if(!text) {
            toast.error("Text cannot be empty", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            })
            return;
        }
        const chatId = user.uid > value.user
            ? user.uid + value.user
            : value.user + user.uid;
        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: user.uid,
                date:Timestamp.now(),
            })
        })
        setText("");
    } 

    const getTexts = async(e) => {
        const chatId = user.uid > value.user
        ? user.uid + value.user
        : value.user + user.uid;
        const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
            doc.exists() && setAllTexts(doc.data().messages);
        });
        return unsubscribe;
    }

    useEffect(() => {
        if (value) {
            getTexts();
        }
        
    })

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
                {allTexts.map((texts) => (
                    <Chat key={texts.id} {...texts}/>
                ))}

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