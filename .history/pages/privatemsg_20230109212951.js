import { useState } from "react";
import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";
import { userContext } from "../context/userContext";

export default function Privatemsg() {
    const [value, setValue] = useState(null);

    return (
        <div className="flex container md-auto">
            <userContext.Provider value={{value, setValue}}>
                <div className="w-1/3 relative bg-slate-700 rounded-tr rounded-br">
                    <Search/>
                    <Chatlog/>
                </div>
                <div className="w-2/3 relative">
                    <Privmsg/>
                </div>
            </userContext.Provider>  
        </div>
    )
}