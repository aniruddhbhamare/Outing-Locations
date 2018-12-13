import {ADD_PLACE,DELETE_PLACE,SET_PLACES} from './actionTypes';
//SELECT_PLACE,DESELECT_PLACE

import {uiStartLoading,uiStopLoading} from './uiLoadingActionCreator';

//for database
export const addPlace = (placeName,location,image) =>{
    return dispatch =>{
        dispatch(uiStartLoading());
        fetch("https://us-central1-places-72147.cloudfunctions.net/storeImage",{
            method:"POST",
            body:JSON.stringify({
                image:image.base64
            })
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
                image:parsedRes.imageUrl
            };
             return fetch("https://places-72147.firebaseio.com/places.json",{
                method: "POST",
                body:JSON.stringify(placeData)
            })
         })
         .catch(err => {
             console.log(err);
             alert("Somthing went wrong, Please try again!");
             dispatch(uiStopLoading());
            })

        .then(res => res.json())
        .then(parsedRes =>{
            console.log(parsedRes);
            dispatch(uiStopLoading());
        }); 
    };
};


export const getPlaces = () =>{
    return dispatch =>{
        fetch("https://places-72147.firebaseio.com/places.json")
        .catch(err =>{
            console.log("error",err);
            alert("Somthing went wrong! : sorry /");
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
        })
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