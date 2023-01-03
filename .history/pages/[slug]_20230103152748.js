import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, onSnapshot, Timestamp, runTransaction, updateDoc } from "firebase/firestore";
import { AiOutlineLike } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [likedBy, setLikedBy] = useState([]);

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
        toast.success("Comment Added", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        })
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
                        userID: auth.currentUser.uid,
                    }),
            });
        })});
    };

    const submitDislike = async() => {
        if (!auth.currentUser) return router.push('/auth/login');
        const postDocRef = doc(db, 'posts', routeData.id);
        return runTransaction(db, async (transaction) => {
            return transaction.get(postDocRef).then((postDoc) => {
                if (!postDoc.exists) {
                    throw 'Document does not exist!';
                }
                transaction.update(postDocRef, {
                    userDisliked: arrayUnion({
                        userID: auth.currentUser.uid,
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
        })
        return unsubscribe;
    }

    const getDislikes = async() => {
        const docRef = doc(db, 'posts', routeData.id);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setDislikedBy(snapshot.data().userDisliked);
        })
        return unsubscribe;
    }

    function checkedLikedByUser() {
        if (!likedBy?.length > 0) return false;
        const check = likedBy?.map((users) => (
            users.userID == auth.currentUser.uid
        ));
        return check.includes(true);
    }

    function checkedDislikedByUser() {
        if (!dislikedBy?.length > 0) return false;
        const check = dislikedBy?.map((users) => (
            users.userID == auth.currentUser.uid
        ));
        return check.includes(true);
    }

    //modified from http://jsfiddle.net/u3p9s8kn/65/
    function timeSince(timeStamp) {
        var now = new Date(),
            secondsPast = (Timestamp.now().seconds - timeStamp);
        if (secondsPast < 60){
            if (secondsPast <= 1) {
                return secondsPast + ' second ago';
            }
            return secondsPast + ' seconds ago';
        }
        if (secondsPast < 3600){      
            if (parseInt(secondsPast/60) <= 1) {
                return parseInt(secondsPast/60) + ' minute ago';
            }
            return parseInt(secondsPast/60) + ' minutes ago';
        }
        if (secondsPast <= 86400){
            if (parseInt(secondsPast/3600) <= 1) {
                return parseInt(secondsPast/3600) + ' hour ago';
            }
            return parseInt(secondsPast/3600) + ' hours ago';
        }
        if (secondsPast <= 2628000){
            if (parseInt(secondsPast/86400) <= 1) {
                return parseInt(secondsPast/86400) + ' day ago';
            }
            return parseInt(secondsPast/86400) + ' days ago';
        }
        if (secondsPast <= 31536000){
            if (parseInt(secondsPast/2628000) <= 1) {
                return parseInt(secondsPast/2628000) + ' month ago';
            }
            return parseInt(secondsPast/2628000) + ' months ago';
        }
        if (secondsPast > 31536000){
            if (parseInt(secondsPast/31536000) <= 1) {
                return parseInt(secondsPast/31536000) + ' year ago';
            }
            return parseInt(secondsPast/31536000) + ' year ago';
        }
    }

    useEffect(() => {
        if(!router.isReady) return;
        getDislikes();
        getLikes();
        getComments();
    }, [router.isReady]);

    return (
        <div>
            <Message {...routeData}></Message> 
            <div className="flex gap-3">
                <button onClick={submitLike} 
                className={`items-center justify-center gap-1 py-2 text-small flex
                ${checkedLikedByUser() ? 'text-green-600' : 'text-black-600' }`}>
                    <AiOutlineLike className="text-2xl"/>
                    {likedBy?.length > 0 ? likedBy?.length : 0}
                </button>
                <button onClick={submitDislike} 
                className={`items-center justify-center gap-1 py-2 text-small flex
                ${checkedDislikedByUser() ? 'text-red-600' : 'text-black-600' }`}>
                    <AiOutlineDislike className="text-2xl"/>
                    {dislikedBy?.length > 0 ? dislikedBy?.length : 0}
                </button>
            </div>
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
                        <div className="bg-white p-4 my-4 border-2 rounded-lg" key={message.time}>
                            <div className="flex items-center gap-2 mb-4">
                                <img className="w-10 rounded-full" src={message.avatar} alt=""/>
                                <h2>{message.userName}</h2>
                                <h2 className="text-xs text-gray-500">{timeSince(message.time.seconds)}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}