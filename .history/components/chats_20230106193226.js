import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, "userChats", auth.currentUser.uid), 
            (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsubscribe();
            };
        };
        auth.currentUser.uid && getChats();
    }, [user]);

    const handleSelect = (u) => {
        return {
            user: u,
            chatId:
            
        }
    };

    return (
        <div className="flex">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                <div className="bg-cyan-600 items-center p-10" key={chat[0]} 
                onClick={() => handleSelect(chat[1].userInfo)}>
                    <img className="w-8 rounded-full" src={chat[1].userInfo.avatar} alt=""/>
                    <div className="text-sm">
                        <span>{chat[1].userInfo.userName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            })}
        </div>
    )
}