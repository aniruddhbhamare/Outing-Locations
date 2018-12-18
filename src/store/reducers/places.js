import { ADD_PLACE,DELETE_PLACE,SET_PLACES,PLACE_ADDED,START_ADD_PLACE} from '../actions/actionTypes';
//,SELECT_PLACE,DESELECT_PLACE
import placeImage from '../../assets/img.jpeg';

const initialState = {
        places: [],
        placeAdded:false
};

const reducer = (state=initialState ,action) =>{
    switch(action.type){ 
        case ADD_PLACE:
        return{
            ...state,
            places:state.places.concat({
                key:Math.random(),
                image:{
                    uri:action.image.uri
                },
                name:action.placeName,
                location:action.location
              
                //{
                //     uri:"https://www.pexels.com/photo/clouds-cloudy-countryside-farm-236047/"
                // }
            })    
        };
        case PLACE_ADDED:
        return{
            ...state,
            placeAdded:true
        };

        case START_ADD_PLACE:
        return{
            ...state,
            placeAdded:false
        };

        case SET_PLACES:
        return{
            ...state,
            places:action.places
        };



        case DELETE_PLACE:
        return{
            ...state,
            places:state.places.filter(place=>{
                return place.key !== action.selectPlace;
              }),
        };

    //     case SELECT_PLACE:
    //     return{
    //         ...state,
    //         selectedPlace:state.places.find(place=>{
    //             return place.key === action.placeKey;
    //           })
    //     };

    //     case DESELECT_PLACE:
    //     return{
    //         ...state,
    //         selectedPlace:null
    //     };


         default:
         return state;
     }
};

export default reducer;