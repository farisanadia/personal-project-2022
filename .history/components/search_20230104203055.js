import { collection, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
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
            const res = await getDoc(doc(db, "chat", combinedId));

            if (!res.exists()) {
                await setDoc(doc(db, "chat", combinedId), {messages:[]});
                await updateDoc(doc(db, "userChats", currentUser.uid))
            }
        }
    }

}