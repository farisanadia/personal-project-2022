import Chatlog from "../components/chatlog";
import Privmsg from "../components/privmsg";
import Search from "../components/search";

export default function Privatemsg() {
    return (
        <div className="flex">
            <div className="w-1/3 relative">
                <Search/>
                <Chatlog/>
            </div>
            <div className="w-2/3">
                <Privmsg/>
            </div>
        </div>
    )
}