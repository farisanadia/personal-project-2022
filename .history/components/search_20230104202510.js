import { collection, getDocs, query } from "firebase/firestore";
import { useContext, useState } from "react";
import { displayName } from "react-quill";
import { auth } from "../utils/firebase";
import { AuthContext } from "../context/"

/**side bar for searching user to chat with */
export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

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

}