import {Timestamp} from "firebase/firestore";

    
//modified from http://jsfiddle.net/u3p9s8kn/65/
function timeSince(timeStamp) {
    var now = new Date(),
        secondsPast = (Timestamp.now().seconds - timeStamp);
    if (secondsPast < 60){
        if (secondsPast <= 1) {
            return secondsPast + ' second ago';
        }
        return secondsPast + ' seconds ago';
    }
    if (secondsPast < 3600){      
        if (parseInt(secondsPast/60) <= 1) {
            return parseInt(secondsPast/60) + ' minute ago';
        }
        return parseInt(secondsPast/60) + ' minutes ago';
    }
    if (secondsPast <= 86400){
        if (parseInt(secondsPast/3600) <= 1) {
            return parseInt(secondsPast/3600) + ' hour ago';
        }
        return parseInt(secondsPast/3600) + ' hours ago';
    }
    if (secondsPast <= 2628000){
        if (parseInt(secondsPast/86400) <= 1) {
            return parseInt(secondsPast/86400) + ' day ago';
        }
        return parseInt(secondsPast/86400) + ' days ago';
    }
    if (secondsPast <= 31536000){
        if (parseInt(secondsPast/2628000) <= 1) {
            return parseInt(secondsPast/2628000) + ' month ago';
        }
        return parseInt(secondsPast/2628000) + ' months ago';
    }
    if (secondsPast > 31536000){
        if (parseInt(secondsPast/31536000) <= 1) {
            return parseInt(secondsPast/31536000) + ' year ago';
        }
        return parseInt(secondsPast/31536000) + ' year ago';
    }
}

export default function Message({children, avatar, username, description, timestamp, title}) {
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                <h2>{username}</h2>
                <h2 className="text-xs text-gray-500">{}</h2>
            </div>
            <div className="flex items-center gap-2py-4 gap-10">
                <p className="text-lg">{title}</p>
                <p className="text-sm">{description}</p>
            </div>
            {children}
        </div>
    );
}