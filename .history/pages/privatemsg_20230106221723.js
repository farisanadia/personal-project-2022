import Chatlog from "../components/chatlog";
import Search from "../components/search";

export default function Privatemsg() {
    return (
        <div className="w-1/3 bg-gray-800 relative">
            <Search/>
            <Chatlog/>
        </div>
    )
}