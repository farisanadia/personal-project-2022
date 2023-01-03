import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { BsFillChatFill } from "react-icons/bs";

export default function Nav() {
    const [user, loading] = useAuthState(auth);
    console.log(user);
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-xl font-bold">SAFARI.</button>
            </Link>
            <ul className="flex items-center gap-10">
                {!user && (
                    <Link href={"/auth/login"}>
                        <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
                            Join Now
                        </button>
                    </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/chat">
                            <button>
                                <BsFillChatFill className="text-2xl text-white"/>
                            </button>
                        </Link>
                        <Link href="/post">
                            <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md test-sm">Post</button>
                        </Link>
                        <Link href="/dashboard">
                            <img 
                            className="w-12 rounded-full cursor-pointer" 
                            src={user.photoURL} 
                            />
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}