import { auth } from '../utils/firebase';



export default function Chat({children, avatar, username, text, timestamp, user}) {

    const checkSender = () => {
        if (auth.currentUser.uid == user) {
            return true;
        }
        return false;
    }

    return ( checkSender() ?
        <div className="flex justify-end bg-cyan-200 p-4 rounded-lg text-black w-3/12 border-white border-4">
            <p className="py-1 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    : 
    <div className="bg-cyan-700 p-4 rounded-lg text-black w-3/12 border-white border-4">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-4 rounded-full" />
                <h2>{username}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    )
}