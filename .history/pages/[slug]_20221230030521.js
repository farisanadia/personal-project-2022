import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    return (
        <div>
            <Message {...routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e) => setMessage(e.target.value)} 
                    type="text" value={message} placeholder="Send a message"
                    className="bg-gray-800 w-full p-2 text-white text-sm"/>
                    <button className="bg-cyan-500 text-white py-2 px-4 text-sm">
                        Submit
                    </button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessages.map(message => (
                        <div>
                            <div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}