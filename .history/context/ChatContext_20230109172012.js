import {
    createContext,
    useContext,
    useReducer
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const [currentUser, loading] = useAuthState(auth);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                    currentUser.uid > action.payload.uid
                }
        }
    }
}