import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit, AiOu } from 'react-icons/ai';
import Link from "next/link";

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

    //Delete Post
    const deletePost = async(id) => {
        const docRef = doc(db, 'posts', id)
        await deleteDoc(docRef);
    };
    
    //Get users data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return(
        <div>
            <h1 className="text-xl pb-3">Your posts</h1>
            <div className="space-y-2">
                {posts.map(post => {
                    return(
                    <Message {...post} key={post.id}>
                        <div className="flex gap-3 items-center">
            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
              <button className='flex items-center gap-1'>
                <AiOutlineLike className="text-2xl"/>
              {post.userLiked?.length} </button>
            </Link>
            <Link href={{pathname: `/${post.id}`, query:{...post}}}>
              <button className='flex items-center gap-1'><BiComment className="text-xl"/>{post.comments?.length > 0 ? post.comments?.length : 0 }</button>
            </Link>
          </div>
                        <div className="flex gap-4">
                            <button onClick={() => deletePost(post.id)}className="text-pink-600 flex items-center justify-center gap-2 py-2 text-small">
                                <BsTrash2Fill className="text-2xl"/>
                                Delete
                            </button>
                            <Link href={{pathname: '/post', query: post }}>
                                <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-small">
                                    <AiFillEdit className="text-2xl"/>
                                    Edit
                                </button>
                            </Link>
                        </div>
                    </Message>
                );})}
            </div>
            <button className="font-medium text-white bg-gray-800 py-2 px-4 my-6" onClick={() => auth.signOut()}>
                Sign out
            </button>
        </div>
    )
}