import Chatlog from "../components/chatlog";
import Search from "../components/search";

export default function Privatemsg() {
    return (
        <div class>
            <div className="w-1/3 relative">
                <Search/>
                <Chatlog/>
            </div>
            <div className="w-2/3 bg-black flex justify-end">
            </div>
        </div>
    )
}