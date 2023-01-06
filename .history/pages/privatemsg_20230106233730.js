import Chatlog from "../components/chatlog";
import Search from "../components/search";

export default function Privatemsg() {
    return (
        <div className="flex">
            <div className="w-1/3 relative">
                <Search/>
                <Chatlog/>
            </div>
            <div className="bg-black flex justify-end">
            </div>
        </div>
    )
}