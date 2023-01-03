import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { collection, doc, updateDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Chat() {
    const route = useRouter();
    const[user, loading] = useAuthState(auth);
    const chatRef = collection(db, 'chats');
    const q = q
    const unsubscribe = onSnapshot()

    const checkUser = async() => {
        if (loading) return;
        if (!user) route.push('/auth/login');
    }

    useEffect(() => {
        checkUser();
    }, [user, loading]);
    
    return (
        <div >
            hehe
        </div>
    )
}