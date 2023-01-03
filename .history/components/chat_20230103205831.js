export default function Chat({children, avatar, username, text, timestamp}) {
    return (
    <div className="bg-white p-4 border-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 rounded-full" />
                <h2>{username}</h2>
                <h2 className="text-xs text-gray-500">{timeSince(timestamp.seconds)}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-md break-all">{description}</p>
            {children}
        </div>
