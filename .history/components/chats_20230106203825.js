import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export default function Chats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot()
        }
    })
}