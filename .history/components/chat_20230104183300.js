import { auth } from '../utils/firebase';



export default function Chat({children, avatar, username, text, timestamp, user}) {

    const checkSender = () => {
        if (auth.currentUser.uid == user) {
            return true;
        }
        return false;
    }

    return ( checkSender() ?
    <div className='justify-end'>
        <div className="p-4 rounded-lg bg-cyan-200 text-black flex w-3/12 border-white border-4 items-center">
            <p className="py-1 space-y-2 text-s break-all flex-row-reverse">{text}</p>
            {children}
        </div>
        </div>
    : 
    <div className="p-4 rounded-lg bg-cyan-700 text-white">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-4 rounded-full" />
                <h2>{username}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    )
}