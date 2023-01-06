import { auth } from '../utils/firebase';



export default function Chat({children, avatar, username, text, timestamp, user}) {

    const checkSender = () => {
        if (auth.currentUser.uid == user) {
            return true;
        }
        return false;
    }

    return (
        <div className={`p-4 border-2 rounded-lg ${checkSender() ? 'bg-white' : 'bg-black'}`}>
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-4 rounded-full" />
                <h2>{username}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    )
}