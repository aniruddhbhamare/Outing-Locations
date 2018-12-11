import {ADD_PLACE,DELETE_PLACE,} from './actionTypes';
//SELECT_PLACE,DESELECT_PLACE

//for database
export const addPlace = (placeName,location,image) =>{
    return dispatch =>{
        
        fetch("https://us-central1-places-72147.cloudfunctions.net/storeImage",{
            method:"POST",
            body:JSON.stringify({
                image:image.base64
            })
        })
         .catch(err => console.log(err))
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
         .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes =>{
            console.log(parsedRes);
        }); 
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