import { collection, getDoc, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useIsEqualRef } from "react-firebase-hooks/auth/dist/util";
import { displayName } from "react-quill";
import { auth } from "../utils/firebase";

/**side bar for searching user to chat with */
export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = auth.currentUser;

    const handleSearch = async() => {
        const q = query(
            collection(db, "users"),
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
            <input type="text" placeholder="find a user"
        </div>  
    )
}