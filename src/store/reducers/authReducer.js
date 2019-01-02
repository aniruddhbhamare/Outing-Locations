import {AUTH_SET_TOKEN,AUTH_REMOVE_TOKEN,LOGIN_EMAIL} from '../../store/actions/actionTypes';

const initialState= {
    token:null,
    expiryDate:null,
    email:""
};

const authReducer=(state=initialState, action) => {
    switch(action.type){
        case AUTH_SET_TOKEN:
            return{
             ...state,
             token:action.token ,
             expiryDate:action.expiryDate      
            };
        case AUTH_REMOVE_TOKEN:
            return{
             ...state,
             token:null ,
             expiryDate:null      

        };
        case LOGIN_EMAIL:
        return{
            ...state,
            email:action.email
        };

        default:
           return state;    
    }
};

export default authReducer;