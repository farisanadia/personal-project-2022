export default function Message({children}) {
    return(
        <div>
            <div>
                <img src="" />
                <h2>user</h2>
            </div>
            <div>
                <p>description</p>
            </div>
            {children}
        </div>
    );
}