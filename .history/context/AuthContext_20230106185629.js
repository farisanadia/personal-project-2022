import {
    createContext,
    useEffect,
    useState,
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const authContext = createContext();

export const authContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        
    })

}