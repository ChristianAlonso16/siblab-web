import { useReducer } from "react"
import { types } from "./authTypes/Types"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "./AuthReducer"


const init = () =>{
    const user = JSON.parse(localStorage.getItem('user'));

    return{
        logged: !!user,
        user: user
    }
}

export const AuthProvider  = ({children}) =>{

    const [authState, dispatch] = useReducer(AuthReducer, {}, init);

    const login = (data) =>{
        console.log('Hola desde authPRovider', data)
        const user = {id: data.id, username: data.username, role: data.role}
        const action = {
            type : types.login,
            payload: user
        }

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        const action = {
            type: types.logout
        };
        dispatch(action);
    }
    

    return(
        <AuthContext.Provider value={{
            ...authState,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}