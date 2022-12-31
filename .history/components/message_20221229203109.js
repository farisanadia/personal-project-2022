export default function Message({children, avatar, userName, description}) {
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div>
                <img src="{avatar}" />
                <h2>user</h2>
            </div>
            <div>
                <p>description</p>
            </div>
            {children}
        </div>
    );
}