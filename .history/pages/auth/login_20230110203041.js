import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth, db } from "../../utils/firebase";
import { collection, doc, query, setDoc, where } from "firebase/firestore";

export default function Login() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    //sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await setDoc(doc(db, "users", user.uid), {
                user: user.uid,
                avatar: user.photoURL,
                userName: user.displayName,
            });

            const collectionRef = collection(db, "userChats");
            const query_ = query(collectionRef, where('user', '==', user.uid));
            const snapshot = await getCountFromServer(query_);
            console.log(snapshot.data().count);

            if (snapshot.data().count == 0) {
                await setDoc(doc(db, "userChats", user.uid), {});
            }
            route.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(user) {
            route.push('/');
        } else {
            console.log('login');
        }
    }, [user]);

    return (
        <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
            <h2 className="text-2xl font-medium">Join Today</h2>
            <div className="py-4">
                <h3 className="py-4">Sign in with one of the providers</h3>
                <button 
                onClick={GoogleLogin} 
                className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
                >
                    <FcGoogle className="text-2xl"/>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}