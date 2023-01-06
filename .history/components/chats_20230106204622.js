import { doc, onSnapshot } from "firebase/firestore";
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
        const unsubscribe = onSnapshot(doc(db, "userChats", auth.currentUser.uid), (doc) => {
            setChats(doc.data());
        });
        return unsubscribe();
    }

    useEffect(() => {
        getChats();
    }, [user, loading]);

    return (
        <div className="flex">
            {Object.entries(chats)?.sort((a, b) =>b[1].date - a[1].date).map((chat) => {
                <div>
                    <img src={chat[1]}
                </div>
            })}

        </div>
    )
}