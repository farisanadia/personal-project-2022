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
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
};