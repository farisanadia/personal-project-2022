import {Timestamp} from "firebase/firestore";

export default function Message({children, avatar, username, description, timestamp}) {
    
    //modified from http://jsfiddle.net/u3p9s8kn/65/
    
    
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                <h2>{username}</h2>
                <h2>{timeSince(timestamp.seconds)}</h2>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}