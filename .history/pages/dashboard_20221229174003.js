import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Dashboard(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    
    return(
        <div>
            <h1>Your posts</h1>
            <div>
                posts
            </div>
            <button onClick={() => auth.signOut}>Sign out</button>
        </div>
    )
}