import { auth } from "../utils/firebase";

export default function Text({children, date, id, senderId, text}) {

    const checkSender = () => {
        if (auth.currentUser.uid == senderId) {
            return true;
        }
        return false;
    }

    return (checkSender ?
        <li className="flex justify-end">
            <div className="relative max-w-xl px-4 py-2 text-white bg-cyan-700 rounded shadow">
            {text}
            </div>
        </li>
        :
        <div>

        </div>
    ) 
}