import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

export default function Dashboard(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);


    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("auth/login");
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot => {
            setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }));
        return unsubscribe;

    };
    
    //Get users data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return(
        <div>
            <h1>Your posts</h1>
            <div>
                {posts.map(post => {
                    return(
                    <Message {...post} key={post.id}>
                        <div className="flex gap-4">
                            <button className="text-pink-600 flex items-center justify-center gap-2 py-2 text-small">
                                <BsTrash2Fill className="text-2xl"/>
                                Delete
                            </button>
                            <buttonclassName="text-pink-600 flex items-center justify-center gap-2 py-2 text-small"><AiFillEdit className="text-2xl"/>Edit</button>
                        </div>
                    </Message>
                );})}
            </div>
            <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
    )
}