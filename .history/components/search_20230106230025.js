import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../utils/firebase";

export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const currentUser = auth.currentUser;

    const handleSearch = async() => {
        const q = query(
            collection(db, "users"),
            where("userName", "==", username)
        );
    
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async() => {
        const combinedId = currentUser.uid > user.user
        ? currentUser.uid + user.user
        : user.user + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId), {messages: []});
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages:[]});
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                    user: user.user,
                    userName: user.userName,
                    avatar: user.avatar,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
                await updateDoc(doc(db, "userChats", user.user), {
                    [combinedId + ".userInfo"]: {
                    user: currentUser.uid,
                    userName: currentUser.displayName,
                    avatar: currentUser.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {}
        //removes user from search bar after found
        setUser(null);
        setUsername("");
    };
    
    return(
        <div className="bg-gray-800 border-b-2 border-gray-700">
            <div className="p-2 flex gap-8 h-16 items-center">
                <h2 className="text-gray-300">SAFARI Chat</h2>
                <div className="gap-2 flex items-center">
                    <img className="rounded-lg w-5" src={currentUser.photoURL} alt=""/>
                    <h2 className="text-gray-300">{currentUser.displayName}</h2>
                </div>
            </div>
            <div>
                <input type="text" placeholder="find a user" onKeyDown={handleKey}
                onChange={(e) => setUsername(e.target.value)} value={username} className="bg-cyan-600 text-white p-2 text-sm w-full"/>
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="flex items-center gap-2 p-2" onClick={handleSelect}>
                    <img className="w-9 rounded-full" src={user.avatar} alt=""/>
                    <div>
                        <h2 className="text-md text-white">{user.userName}</h2>
                    </div>
                </div>
            )}
        </div>  
    );
};