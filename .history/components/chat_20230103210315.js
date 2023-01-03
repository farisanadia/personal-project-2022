export default function Chat({children, avatar, username, text, timestamp, user}) {
    return (
    <div className="bg-white p-4 border-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-3 rounded-full" />
                <h2>{username}</h2>
            </div>
                <p className="items-center py-3 space-y-2 text-xs break-all">{text}</p>
            {children}
        </div>
    )
}