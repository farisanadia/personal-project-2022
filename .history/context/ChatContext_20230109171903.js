import {
    createContext,
    useContext,
    useReducer
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const [user, loading] = useAuthState(auth);
}