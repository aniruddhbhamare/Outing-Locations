import {AsyncStorage} from 'react-native';
import { TRY_AUTH ,AUTH_SET_TOKEN,AUTH_REMOVE_TOKEN, LOGIN_EMAIL} from "./actionTypes";
import {uiStartLoading,uiStopLoading} from './index';
import MainTabScreen from '../../screens/mainTabScreen';
import AuthScreen from '../../screens/AuthScreen';
import App from '../../../App';

// import { resolve } from "url";
// import { reject } from "rsvp";
const API_KEY ="AIzaSyArZXGQrl89FlBxxZOjVBBS8AQINCe_6lM"


export const tryAuth =(authData,authMode)=>{
    return dispatch =>{
        dispatch(uiStartLoading());

        let url ="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY ;
       
    
        if(authMode === "signup"){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
         }
          fetch(url,{
                method:"POST",
                body:JSON.stringify({
                    email:authData.email,
                    password:authData.password,
                    returnSecureToken:true
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .catch(err =>{
                console.log(err);
                dispatch(uiStopLoading());
                alert('Authentication failed, Please try again!');
                })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                console.log(parsedRes);
                
                if(!parsedRes.idToken){
                    alert("Authentication Failed, Email or Password are invalid! ");
                }else{
                    dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn,parsedRes.refreshToken));               
                    dispatch(drawerEmail(parsedRes.email));
                    MainTabScreen();
                }
                // if(parsedRes.error.message === "EMAIL_EXISTS"){
                //    alert("The email address is already in use by another account.");
                // } else if(parsedRes.error.message === "INVALID_PASSWORD"){
                //    alert("Invalid Password, Please Enter Valid Password!");
                // } else if(parsedRes.error.message === "EMAIL_NOT_FOUND"){
                //    alert("Email does not exiest, Please Sign Up!");
                // } else {
                //     console.log("Inside MainTabScreen ");
                //     console.log(parsedRes);
                //     return MainTabScreen();
                // }

            });
    };
};

// export const authStoreToken = (token, expiresIn) =>{
//     return dispatch =>{
//        dispatch(authSetToken(token));
//         const now = new Date();
//         const expiryDate = now.getTime() + expiresIn * 1000;
//         AsyncStorage.setItem("places.auth.token",token);
//         AsyncStorage.setItem("places.auth.expiryDate",expiryDate.toString());
        
//     };
// };

export const authStoreToken = (token, expiresIn,refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token,expiryDate));       
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    };
};


export const authSetToken =(token,expiryDate)=>{
    return{
        type:AUTH_SET_TOKEN,
        token:token,
        expiryDate:expiryDate
    };
};

export const drawerEmail= (email)=>{
  return dispatch =>{
    AsyncStorage.setItem("ap:email:email", email);
    dispatch(loginEmail(email));
  };
};
  
export const isMail = () =>{
  return (dispatch, getState) => {
            const promise = new Promise((resolve, reject) => {
              const email = getState().auth.email;
                if (!email ) {
                  let fetchedEmail;
                  AsyncStorage.getItem("ap:email:email")
                    .catch(err => reject())
                    .then(emailFromStorage => {
                      fetchedEmail = emailFromStorage
                      dispatch(loginEmail(fetchedEmail));
                    if (!emailFromStorage) {
                      reject();
                      return;
                    }
                   
                  })
              } 
            })
          }
        }

  
  

export const loginEmail =(email)=>{
  return{
    type:LOGIN_EMAIL,
    email:email
  };
};
// export const authGetToken = () =>{
//     return (dispatch,getState) => {
//         const promise = new Promise((resolve,reject)=>{
//             const token = getState().auth.token;
//             if(!token){
//                 let fetchedToken;
//                 AsyncStorage.getItem("places.auth.token")
//                 .catch(err => reject())
//                 .then(tokenFromStorage =>{
//                     fetchedToken = tokenFromStorage;
//                     if(!tokenFromStorage){
//                         reject();
//                         return;
//                     }
//                   return AsyncStorage.getItem("places.auth.expiryDate");
//                 })
//                 .then(expiryDate =>{
//                      const parsedExpiryDate = new Date(parseInt(expiryDate));
//                      const now = new Date();
//                      if(parsedExpiryDate > now){
//                       dispatch(authSetToken(fetchedToken));
//                       resolve(fetchedToken);
//                     }else{
//                        reject();
//                     }
//                 })
//                 .catch(err => reject());
//             }else{
//                 resolve(token);
//             }
//         });
//         promise.catch(err =>{
//             dispatch(authClearStorage());
//         })
//         return promise;
//     };
// };

export const authGetToken = () => {
    return (dispatch, getState) => {
      const promise = new Promise((resolve, reject) => {
        const token = getState().auth.token;
        const expiryDate = getState().auth.expiryDate;
        if (!token || new Date(expiryDate) <= new Date()) {
          let fetchedToken;
          AsyncStorage.getItem("ap:auth:token")
            .catch(err => reject())
            .then(tokenFromStorage => {
              fetchedToken = tokenFromStorage;
              if (!tokenFromStorage) {
                reject();
                return;
              }
              return AsyncStorage.getItem("ap:auth:expiryDate");
            })
            .then(expiryDate => {
              const parsedExpiryDate = new Date(parseInt(expiryDate));
              const now = new Date();
              if (parsedExpiryDate > now) {
                dispatch(authSetToken(fetchedToken));
                resolve(fetchedToken);
              } else {
                reject();
              }
            })
            .catch(err => reject());
        } else {
          resolve(token);
        }
      });
      return promise
        .catch(err => {
          return AsyncStorage.getItem("ap:auth:refreshToken")
            .then(refreshToken => {
              return fetch(
                "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "grant_type=refresh_token&refresh_token=" + refreshToken
                }
              );
            })
            .then(res => res.json())
            .then(parsedRes => {
              if (parsedRes.id_token) {
                console.log("Refresh token worked!");
                dispatch(
                  authStoreToken(
                    parsedRes.id_token,
                    parsedRes.expires_in,
                    parsedRes.refresh_token
                  )
                );
                return parsedRes.id_token;
              } else {
                dispatch(authClearStorage());
              }
            });
        })
        .then(token => {
          if (!token) {
            throw new Error();
          } else {
            return token;
          }
        });
    };
  };
  

export const authAutoSignIn = () =>{
    return dispatch =>{
      dispatch(isMail());
        dispatch(authGetToken())
        .then(token =>{
            MainTabScreen();
        })
        .catch(err => console.log("Failed to fetch token!"));
    };
};

export const authClearStorage = () => {
    return dispatch =>{
        AsyncStorage.removeItem("ap:auth:token")
        AsyncStorage.removeItem("ap:auth:expiryDate");

       return AsyncStorage.removeItem("ap:auth:refreshToken");
    }
}


export const authLogOut = () => {
    return dispatch => {
    AsyncStorage.removeItem("ap:email:email");
      dispatch(authClearStorage()).then(() => {
        App();
      });
      dispatch(authRemoveToken());
    };
  };

export const authRemoveToken = () => {
    return {
      type: AUTH_REMOVE_TOKEN
    };
  };
  