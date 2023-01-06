import {
    createContext,
    useEffect,
    useState,
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const authContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <authContext.Provider value={{currentUser}}>
            {children}
        </authContext.Provider>
    );
};