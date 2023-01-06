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
        const combinedId = currentUser.uid > user.user
        ? currentUser.uid + user.user
        : user.user + currentUser.uid;
        console.log(combinedId);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), {messages:[]});
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                    user: user.user,
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
                <div className="flex items-center gap-2" onClick={handleSelect}>
                    <img className="w-4 rounded-full" src={user.avatar} alt=""/>
                    <div>
                        <h2>{user.userName}</h2>
                    </div>
                </div>
            )}
        </div>  
    );
};