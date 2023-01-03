export default function Chat({children, avatar, username, text, timestamp}) {
    <div>
        <h2>{text}</h2>
        {children}
    </div>
}