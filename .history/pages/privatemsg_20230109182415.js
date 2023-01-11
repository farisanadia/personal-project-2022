import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";
import { userContext } from "../context/userContext";

export default function Privatemsg() {
    return (
        <div className="flex">
            <userContext.Provider>
            <div className="w-1/3 relative">
                <Search/>
                <Chatlog/>
                <Privmsg/>
            </div>
            <userContext.Provider/>
        </div>
    )
}