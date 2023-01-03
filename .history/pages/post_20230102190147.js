import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';


export default function Post() {
    //Form 
    const [post, setPost] = useState({title: "", description: ""});
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;
    const { quill, quillRef } = useQuill();

    //submit post
    const submitPost = async (e) => {
        e.preventDefault();
        //Run checks for description
        if (!post.description) {
            toast.error("Description Field empty", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return; //prevents empty post submitted
        }

        if (!post.title) {
            toast.error("Title Field empty", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        if (post.description.length > 1500) {
            toast.error("Description too long", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        if (post.title.length > 50) {
            toast.error("Title too long", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        if (post?.hasOwnProperty("id")) {
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = {...post, timestamp: serverTimestamp()};
            await updateDoc(docRef, updatedPost);
            toast.success("Post has been edited", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return route.push('/')
        } else {
            //Make a new post
            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid, 
                avatar: user.photoURL,
                username: user.displayName,
            });
            setPost({description: "", title: ""});
            toast.success('Post has been made', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            });
            return route.push("/");
        }  
    };

    //Check our user
    const checkUser = async () => {
        if(loading) return;
        if(!user) route.push('/auth/login');
        if(routeData.id) {
            setPost({ title: routeData.title, description: routeData.description, id: routeData.id })
        }
    };

    useEffect(() => {
        if (quill) {
            quill.on('text-change' () => {

            });
        }
        checkUser();
    }, [user, loading]);

    return (
        <div className="my-4 p-8 shadow-lg round-lg">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">
                    { post.hasOwnProperty("id") ? "Edit your post" : "Create a new post" }
                </h1>
                <div className="py-2">
                    <h3 className="text-md font-medium py-2">Title</h3>
                    <textarea 
                    value={post.title} onChange={(e) => setPost({...post, title: e.target.value})}
                    className="bg-gray-800 h-12 w-full text-white rounded-lg p-2 text-medium">
                    </textarea>
                    <p className={`text-cyan-600 font-medium text-small ${post.title.length > 50 ? 'text-red-600' : ''}`}>{post.title.length}/50</p>
                    <h3 className="text-md font-medium py-2">Description</h3>
                    <textarea 
                    value={post.description} onChange={(e) => setPost({...post, description: e.target.value})} 
                    className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm">
                    </textarea>
                    <p className={`text-cyan-600 font-medium text-small ${post.description.length > 1500 ? 'text-red-600' : ''}`}>{post.description.length}/1500</p>
                </div>
                <button 
                type="submit"
                className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg test-sm">
                    Submit
                </button>
            </form>
        </div>
    );
}