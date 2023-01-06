import {
    createContext,
    useContext,
    useReducer
} from "react";
export const ChatContext = createContext();
export const chatContextProvider = ({children}) => {
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }
}