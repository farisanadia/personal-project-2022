import {Timestamp} from "firebase/firestore";

    
//modified from http://jsfiddle.net/u3p9s8kn/65/
const timeSince = (timeStamp) => {
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
            return 'posted ' + parseInt(secondsPast/60) + ' minute ago';
        }
        return 'posted ' + parseInt(secondsPast/60) + ' minutes ago';
    }
    if (secondsPast <= 86400){
        if (parseInt(secondsPast/3600) <= 1) {
            return 'posted ' + parseInt(secondsPast/3600) + ' hour ago';
        }
        return 'posted ' + parseInt(secondsPast/3600) + ' hours ago';
    }
    if (secondsPast <= 2628000){
        if (parseInt(secondsPast/86400) <= 1) {
            return 'posted ' + parseInt(secondsPast/86400) + ' day ago';
        }
        return 'posted ' + parseInt(secondsPast/86400) + ' days ago';
    }
    if (secondsPast <= 31536000){
        if (parseInt(secondsPast/2628000) <= 1) {
            return 'posted ' + parseInt(secondsPast/2628000) + ' month ago';
        }
        return 'posted ' + parseInt(secondsPast/2628000) + ' months ago';
    }
    if (secondsPast > 31536000){
        if (parseInt(secondsPast/31536000) <= 1) {
            return 'posted ' + parseInt(secondsPast/31536000) + ' year ago';
        }
        return 'posted ' + parseInt(secondsPast/31536000) + ' year ago';
    }
}

export default function Message({children, avatar, username, description, timestamp}) {
    return(
        <div className="bg-white p-4 border-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                <h2>{username}</h2>
                <h2 className="text-xs text-gray-500">{timeSince(await timestamp.seconds)}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-md break-all">{description}</p>
            {children}
        </div>
    );
}