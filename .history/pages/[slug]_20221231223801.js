import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, FieldValue, onSnapshot, Timestamp, runTransaction, updateDoc } from "firebase/firestore";
import { AiOutlineLike } from "react-icons/ai";

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [likedBy, setLikedBy] = useState([]);
    const [liked, setLiked] = useState(false);

    //submit a message
    const submitMessage = async() => {
        //check if user is logged
        if(!auth.currentUser) return router.push('/auth/login');
        if(!message){
            toast.error("Don't leave an empty message", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            }),
        });
        setMessage("");
    };

    //submit a like
    const submitLike = async() => {
        if (!auth.currentUser) return router.push('/auth/login');
        const postDocRef = doc(db, 'posts', routeData.id);
        return runTransaction(db, async (transaction) => {
            return transaction.get(postDocRef).then((postDoc) => {
                if (!postDoc.exists) {
                    throw 'Document does not exist!';
                }
                transaction.update(postDocRef, {
                    userLiked: arrayUnion({
                        userName: auth.currentUser.displayName,
                        liked: true,
                    }),
   
            });
        })});
    }

    //Get comments
    const getComments = async() => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setAllMessages(snapshot.data().comments);
        });
        return unsubscribe;
    };

    //Get likes
    const getLikes = async() => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setLikedBy(snapshot.data().userLiked);
            setLiked(snapshot.data().likedtrue);
        })
        return unsubscribe;
    }

    useEffect(() => {
        if(!router.isReady) return;
        getLikes();
        getComments();
    }, [router.isReady]);

    return (
        <div>
            <Message {...routeData}></Message> 
            <button onClick={submitLike} className="text-green-600 flex items-center justify-center py-2 text-small">
                <AiOutlineLike className="text-2xl"/>
                {likedBy.length}
            </button>
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e) => setMessage(e.target.value)} 
                    type="text" value={message} placeholder="Send a message"
                    className="bg-gray-800 w-full p-2 text-white text-sm"/>
                    <button onClick={submitMessage}
                    className="bg-cyan-500 text-white py-2 px-4 text-sm">
                        Submit
                    </button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessages?.map((message) => (
                        <div className="bg-white p-4 my-4 border-2" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="w-10 rounded-full" src={message.avatar} alt=""/>
                                <h2>{message.userName}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}