import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";
import { userContext } from "../context/userContext";

export default function Privatemsg() {
    return (
        <div className="flex">
            <div className="w-1/3 relative">
                <userContext.Provider>
                <Search/>
                <Chatlog/>
                </userContext.Provider>
            </div>
            <div className="w-2/3 bg-slate-400 rounded-tr-lg rounded-br-lg">
                <Privmsg/>
            </div>
        </div>
    )
}