import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const currentUser = auth.currentUser;

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

    return (
        <div className="flex bg-cyan-600 items-center p-10">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                <div key={chat[0]}>
                    <img className="w-8 rounded-full" src={chat[1].userInfo.avatar} alt=""/>
                    <div>
                        <span className="text-sm">{chat[1].userInfo.userName}</span>
                        <p></p>
                    </div>
                </div>
            })}
        </div>
    )
}