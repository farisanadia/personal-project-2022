import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../utils/firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, ""))
        }
    })
}