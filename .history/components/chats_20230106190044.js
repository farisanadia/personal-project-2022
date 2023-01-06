import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { auth, db } from "../utils/firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, "userChats", currentUser.uid), 
            (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsubscribe();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch()
    }

    return (
        <div className="flex">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                <div className="bg-cyan-600 items-center p-10" key={chat[0]}>
                    <img className="w-8 rounded-full" src={chat[1].userInfo.avatar} alt=""/>
                    <div className="text-sm">
                        <span>{chat[1].userInfo.userName}</span>
                        <p></p>
                    </div>
                </div>
            })}
        </div>
    )
}