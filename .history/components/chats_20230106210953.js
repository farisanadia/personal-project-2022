import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Chats() {
    const route = useRouter();
    const [chats, setChats] = useState([]);
    const [user, loading] = useAuthState(auth);

    const getChats = async () => {
        if (loading) return;
        if (!user) return route.push("./pages/auth/login");

        const unsubscribe = onSnapshot(doc(db, "userChats", auth.currentUser.uid));
        return () => {
            unsubscribe();
        };
    }

    useEffect(() => {
        getChats();
    }, [user, loading]);

    return (
        <div className="flex">
            {Object.entries(chats)?.sort((a, b) =>b[1].date - a[1].date).map((chat) => {
                <div>
                    <img className="w-3 rounded-lg" src={chat[1].userInfo.avatar} alt=""/>
                </div>
            })}
            <h2>test</h2>

        </div>
    )
}