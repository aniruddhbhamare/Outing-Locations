
import { createStore,combineReducers,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import placeReducer from './reducers/places';

const rootReducer = combineReducers({
    places:placeReducer
});

let composeEnhancer = compose;

if(__DEV__){
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configStore =()=>{
    return createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));
}

export default configStore;