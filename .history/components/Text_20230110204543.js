import { auth } from "../utils/firebase";

export default function Text({children, message}) {

    const checkSender = () => {
        if (auth.currentUser.uid == senderId) {
            return true;
        }
        return false;
    }

    return (
        <div>
            message
        </div>
    )
}