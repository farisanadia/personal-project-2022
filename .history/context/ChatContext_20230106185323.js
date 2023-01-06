import {
    createContext,
    useContext,
    useReducer
} from "react";
export const ChatContext = createContext();
export const chatContextProvider = ({children}) => {
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
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid,
            };

            default:
                return state;
        }
    }
}