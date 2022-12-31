export default function Message({children, avatar, userName, description}) {
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div>
                <img src={avatar} className="w-10 rounded-full" />
                <h2>userName}</h2>
            </div>
            <div>
                <p>description</p>
            </div>
            {children}
        </div>
    );
}