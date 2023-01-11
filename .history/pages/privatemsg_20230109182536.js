import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";
import { userContext } from "../context/userContext";

export default function Privatemsg() {
    return (
        <div className="flex">
            <div>
                <userContext.Provider>
                <Search className="w-1/3 relative/>
                <Chatlog/>
                <Privmsg/>
                </userContext.Provider>
            </div>
        </div>
    )
}