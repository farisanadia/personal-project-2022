import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { collection, doc, updateDoc, query, orderBy, onSnapshot, limit } from "firebase/firestore";

export default function Chat() {
    const route = useRouter();
    const[user, loading] = useAuthState(auth);
    
    const getChats = async() => {
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('timestamp').limit(25));
        const unsubscribe = onSnapshot(q, (snapshot) => {
        s   etAllChats(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    })
    return unsubscribe;
};


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