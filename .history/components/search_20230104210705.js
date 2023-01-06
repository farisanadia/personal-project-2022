import { collection, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../utils/firebase";

/**side bar for searching user to chat with */
export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const currentUser = auth.currentUser;

    const handleSearch = async() => {
        const usersRef = collection(db, "users");
        const q = query(usersRef,
            where("userName", "==", username),
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
        const combinedId = currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages:[]});
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                    user: user.uid,
                    userName: user.displayName,
                    avatar: user.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                    user: currentUser.uid,
                    userName: currentUser.displayName,
                    avatar: currentUser.photoURL,
                },
                [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {}

        setUser(null);
        setUsername("");
    };
    
    return(
        <div>
            <div>
                <input type="text" placeholder="find a user" onKeyDown={handleKey} 
                onChange={(e) => setUsername(e.target.value)} value={username}/>
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="bg-black flex items-center" onClick={handleSelect}>
                    <img src={user.photoURL} alt=""/>
                    <div>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>  
    );
};