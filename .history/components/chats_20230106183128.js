import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const currentUser = auth.currentUser;

    useEffect(() => )
}