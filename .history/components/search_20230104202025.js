import { useState } from "react";
import { auth } from "../utils/firebase";

/**side bar for searching user to chat with */
export default function Search() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const currentUser = auth.currentUser

}