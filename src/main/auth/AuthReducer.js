import { types } from "./authTypes/Types"

export const AuthReducer  = (state = {}, action) =>{

    switch(action.type){
        case types.login:
            return{
                ...state,
                logged: true,
                user: action.payload
            };

        case types.logout:
            return {
                logged:false
            }
            
        default:
            return state;
    }
}