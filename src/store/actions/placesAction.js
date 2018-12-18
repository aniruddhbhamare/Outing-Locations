import {ADD_PLACE,DELETE_PLACE,SET_PLACES,PLACE_ADDED,START_ADD_PLACE} from './actionTypes';
//SELECT_PLACE,DESELECT_PLACE

import {uiStartLoading,uiStopLoading,authGetToken} from './index';

//for database
export const addPlace = (placeName,location,image) =>{
    
    return dispatch =>{
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(()=>{
            alert("No Valid Token Found!");
        })
        .then(token =>{
            authToken = token;
            return fetch("https://us-central1-places-72147.cloudfunctions.net/storeImage",
            {
                method:"POST",
                body:JSON.stringify({
                    image:image.base64
                }),
                headers:{
                    "Authorization":"Bearer " + authToken
                }
            }
         );
        })
        .catch(err => 
            {
                 console.log(err);
                 alert("Somthing went wrong, Please try again!");
                 dispatch(uiStopLoading());
            })
         .then(res => res.json())
         .then(parsedRes =>{
            const placeData ={
                name:placeName,
                location:location,
                image:parsedRes.imageUrl,
                imagePath:parsedRes.imagePath

            };
             return fetch("https://places-72147.firebaseio.com/places.json?auth=" + authToken,
             {
                method: "POST",
                body:JSON.stringify(placeData)
            })
         })
        .then(res => res.json())
        .then(parsedRes =>{
            console.log(parsedRes);
            dispatch(uiStopLoading());
            dispatch(placeAdded());
            alert("Place Details Added Successfully!");
            
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
            alert("Somthing went wrong, Please try again!"); 
           }); 
    };
};

export const placeAdded =() =>{
    return{
        type:PLACE_ADDED
    };
};

export const startAddPlaces=() =>{
    return{
        type:START_ADD_PLACE
    };
};


export const getPlaces = () =>{
    return (dispatch) =>{
        dispatch(authGetToken())
        .then(token =>{
            console.log("Token",token);
           return fetch("https://places-72147.firebaseio.com/places.json?auth=" + token)
        })
        .catch(()=>{
            alert("No Valid Token Found!");
        })
        .then(res => res.json())
        .then(parsedRes =>{
                const places = [];
                for(let key in parsedRes){
                    places.push({
                        ...parsedRes[key],
                        image:{
                            uri:parsedRes[key].image
                        },
                        key:key
                    })
                }
            dispatch(setPlaces(places))
        }).catch(err =>{
            console.log("error",err);
            alert("Somthing went wrong! : sorry /");
        });
    };
};

export const setPlaces = (places) =>{
    return {
        type:SET_PLACES,
        places:places
    };
};





export const deletePlace = (key) =>{
    return{
        type:DELETE_PLACE,
        selectPlace:key
    };
};

//for local storage
// export const addPlace = (placeName,location,image) =>{
//     return {
//         type:ADD_PLACE,
//         placeName:placeName,
//         location:location,
//         image:image
//     };
// };

// export const deletePlace = (key) =>{
//     return{
//         type:DELETE_PLACE,
//         selectPlace:key
//     };
// };

// export const selectPlace = (key) =>{
//     return {
//         type:SELECT_PLACE,
//         placeKey:key
//     };
// };

// export const deSelectPlace = () =>{
//     return {
//         type:DESELECT_PLACE
//     };
// };