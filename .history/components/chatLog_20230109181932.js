import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Chatlog() {
    const route = useRouter();
    const [chats, setChats] = useState([]);
    const [user, loading] = useAuthState(auth);
    const otherUser = createContext();

    const getChats = async () => {
        if (loading) return;
        if (!user) return route.push("./pages/auth/login");

        const unsubscribe = onSnapshot(doc(db, "userChats", auth.currentUser.uid), (doc) => {
            console.log(doc.data());
            setChats(doc.data());
        });

        return () => {
            unsubscribe();
        };
    };

    useEffect(() => {
        getChats();
    }, [user, loading]);

    return (
        <div className="bg-slate-700 h-96 rounded-bl-lg">
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => {
                return(
                
                <div key={chat[0]} className="bg-grey-200 flex gap-2 p-2" onClick={() => handleSelect(chat[1].userInfo)}>
                    <img className="w-7 rounded-full" src={chat[1].userInfo.avatar} alt=""/>
                    <h2 className="text-gray-300">{chat[1].userInfo.userName}</h2>
                </div>
                )
            })}
        </div>
    )
}
