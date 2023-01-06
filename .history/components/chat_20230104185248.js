import { auth } from '../utils/firebase';



export default function Chat({children, avatar, username, text, timestamp, user}) {

    const checkSender = () => {
        if (auth.currentUser.uid == user) {
            return true;
        }
        return false;
    }

    return ( checkSender() ?
    <li className='flex justify-end'>
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-cyan-700 rounded shadow">
            <p className="py-1 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    </li>
    : 
    <li className='flex justify-start'>
        <div className="bg-cyan-700 p-4 rounded-lg text-black w-3/12 border-white border-4">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-4 rounded-full" />
                <h2>{username}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    </li>
    )
}