import { useState } from "react";
import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";
import { userContext } from "../context/userContext";

export default function Privatemsg() {
    const [value, setValue] = useState(null);

    return (
        <div className="flex">
            <userContext.Provider value={{value, setValue}}>
                <div className="w-1/3 relative">
                    <Search/>
                    <Chatlog/>
                </div>
                <div className="w-2/3 relative flex">
                    <Privmsg/>
                </div>
            </userContext.Provider>  
        </div>
    )
}