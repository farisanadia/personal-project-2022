import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "../utils/firebase";
import { collection, doc, updateDoc, query, orderBy, onSnapshot, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Chatroom() {
    const dummy = useRef();
    const router = useRouter();
    const routeData = router.query;
    const [allChats, setAllChats] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [formValue, setFormValue] = useState("");
    
    const getChats = async() => {
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('timestamp'), limit(25));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllChats(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
        })
        return unsubscribe;
    };

    const sendChat = async(e) => {
        e.preventDefault();
        const chatRef = collection(db, 'chats');
        await addDoc(chatRef, {
            text: formValue,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        })
        setFormValue("");
        dummy.current.scrollIntoView({behavior: 'smooth'});   

    }

    useEffect(() => {
        getChats();
    }, []);
    
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {allChats.map((chats) => (
                <Chat key={chat.id} {...chat}>

                </Chat>))}
                <span ref={dummy}></span>
            </main>
            <form onSubmit={sendChat}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice"/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}