import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, "userChats", ))
        }
    })
}