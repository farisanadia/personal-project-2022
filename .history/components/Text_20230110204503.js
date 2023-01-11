import { auth } from "../utils/firebase";

export default function Text({children, message}) {

    const checkSender = () => {
        if (auth.currentUser.uid == message.senderId) {
            return true;
        }
        return false;
    }
}