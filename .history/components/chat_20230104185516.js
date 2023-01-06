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
        <div className="relative max-w-xl px-4 py-2 text-white bg-cyan-700 rounded shadow">
            <p className="py-1 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    </li>
    : 
    <li className='flex justify-start gap-2'>
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-8 rounded-full" />
            </div>
        <div className="relative max-w-xl px-4 py-2 text-black bg-cyan-200 rounded shadow">
                <p className="items-center py-3 space-y-2 text-s break-all">{text}</p>
            {children}
        </div>
    </li>
    )
}