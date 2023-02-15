import { createContext , useReducer } from "react"; 
import userReducer from "./UserReducer";

const UserContext = createContext()

const user = JSON.parse(localStorage.getItem('user'))

export const UserProvider = ({children}) =>{
    const initialState = {
        user: user ? user : null,
        email:user ? user.email :'',
        loading: false,
        name: user? user.name: null,
        token: user ? user.token  :'',
        _id:user ? user._id :'',
        error: false,
        errorMessage: '',
        room:'start',
        message: [
            { id: 1, text: "hello", user: {
              name:"tak"
            } },
            {
              id: 2,
              text: "world",
              user: {
                name:"tak"
              } 
            },
            {
              id: 3,
              text: "to",
              user: {
                name:"NIE"
              } 
            },
            {
              id: 4,
              text: "me",
              user: {
                name:"NIE"
              } 
            },
          ],
        
    }
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider
        value={{
            ...state,
            dispatch,
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext