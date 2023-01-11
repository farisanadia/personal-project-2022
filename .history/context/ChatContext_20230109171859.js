import {
    createContext,
    useContext,
    useReducer
} from "react";
import { auth } from "../utils/firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const [user, loading] = useAuthState(auth);
}