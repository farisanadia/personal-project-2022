import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Chats() {
    const route = useRouter();
    const [chats, setChats] = useState([]);
    const [user, loading] = useAuthState(auth);

    const getChats = async () => {
        if (loading) return;
        if (!user) return route.push("./pages/auth/login");
        const unsubscribe = onSnapshot(doc(db, "userChats", auth.currentUser.uid));
    }

    useEffect(() => {
        checkUser();
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(db, "userChats", ))
        }
    })
}