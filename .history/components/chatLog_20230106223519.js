import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Chatlog() {
    const route = useRouter();
    const [chats, setChats] = useState([]);
    const [user, loading] = useAuthState(auth);

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
        <div className="bg-grey max-h-full">
            {Object.entries(chats)?.map(chat => {
                return(
                <div key={chat[0]} className="bg-grey-200 flex">
                    <img className="w-3 rounded-lg" src={chat[1].userInfo.avatar} alt=""/>
                    <h2>{chat[1].userInfo.userName}</h2>
                </div>
                )
            })}
        </div>
    )
}