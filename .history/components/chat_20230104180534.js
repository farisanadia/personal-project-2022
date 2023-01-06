import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';



export default function Chat({children, avatar, username, text, timestamp, user}) {
    const [currUser, loading] = useAuthState(auth);

    const checkSender = async() => {
        return currUser.uid == user;
    }

    return ( checkSender ? 
        (   <div className="bg-white p-4 border-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-4 rounded-full" />
                <h2>{username}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    ) : (
        <div>

        </div>
    )
}