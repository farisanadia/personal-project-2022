import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";
import { userContext } from "../context/userContext";
import { auth } from "../utils/firebase";

export default function Privatemsg() {
    const [value, setValue] = useState(null);
    const [user, loading] = useAuthState(auth);

    return (
        <div className="flex">
            <userContext.Provider value={{value, setValue}}>
                <div className="w-1/3 relative">
                    <Search/>
                    <Chatlog/>
                </div>
                <div className="w-2/3 bg-slate-400 rounded-tr-lg rounded-br-lg">
                    <Privmsg/>
                </div>
            </userContext.Provider>  
        </div>
    )
}