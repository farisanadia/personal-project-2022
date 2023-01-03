import Head from 'next/head';
import Chat from "../components/chat";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "../utils/firebase";
import { collection, query, orderBy, onSnapshot, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Chatroom() {
    const dummy = useRef();
    const router = useRouter();
    const routeData = router.query;
    const [allChats, setAllChats] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [formValue, setFormValue] = useState("");
    
    const getChats = async() => {
        const collectionRef = collection(db, 'chat');
        const q = query(collectionRef, orderBy('timestamp'), limit(25));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllChats(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
        })
        return unsubscribe;
    };

    const sendChat = async(e) => {
        e.preventDefault();

        if (chat.text.length <= 0) {
            toast.error("Text cannot be empty", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            }) 
            return;
        }
        const chatRef = collection(db, 'chat');
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

    const checkUser = async() => {
        if (loading) return;
        if (!user) return push('/auth/login');
     }

    useEffect(() => {
        checkUser();
        getChats();
    }, [user, loading]);
    
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {allChats.map((chat) => (
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