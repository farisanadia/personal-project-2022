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
            {text}
        </li>
        :
        <div>

        </div>
    ) 
}