import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { collection, doc, updateDoc, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { BsChatRightQuoteFill } from 'react-icons/bs';

export default function Chatroom() {
    const router = useRouter();
    const routeData = router.query;
    const [allChats, setAllChats] = useState([]);
    
    const getChats = async() => {
        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('timestamp'), limit(25));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllChats(snapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
        })
        return unsubscribe;
    };

    const sendMessage = async(e) => {
        e.preventDefault();

        const {user, avatar} = auth.currentUser;
        await ch
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

            {allChats.map((chats) => (
            <Chat key={chat.id} {...chat}>

            </Chat>))}
        </div>
    )
}