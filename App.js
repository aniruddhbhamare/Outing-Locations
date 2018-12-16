import {Navigation} from 'react-native-navigation';
import AuthScreen from './src/screens/AuthScreen';
import SharePlaceScreen from './src/screens/SharePlaceScreen';
import FindPlaceScreen from './src/screens/FindPlaceScreen'
import PlaceDetailScreen from './src/screens/PlaceDetailScreen';
import SideDrawerScreen from './src/screens/SideDrawerScreen';
//connect react navigation to redux
import {Provider} from 'react-redux';
import configStore from './src/store/configStore';

const store = configStore();
//Register Screens
Navigation.registerComponent("awesome-places.AuthScreen" ,()=>AuthScreen,store,Provider);
Navigation.registerComponent("awesome-places.FindPlaceScreen",()=>FindPlaceScreen,store,Provider);
Navigation.registerComponent("awesome-places.SharePlaceScreen",()=>SharePlaceScreen,store,Provider);
Navigation.registerComponent("awesome-Places.PlaceDetailScreen",()=>PlaceDetailScreen,store,Provider);
Navigation.registerComponent("awesome-places.SideDrawerScreen",()=>SideDrawerScreen,store,Provider);
//Start The App

export default () => Navigation.startSingleScreenApp({
  screen:{
    screen:"awesome-places.AuthScreen",
    title:"Login"
  }
});










// import React from 'react';
// import { StyleSheet,View,TextInput,Button,Text } from 'react-native';

// import PlaceInput from './src/components/PlaceInput';
// import PlaceList from './src/components/PlaceList';
// import PlaceDetail from './src/components/PlaceDetail';

// import { connect } from 'react-redux';   
// import {addPlace,deletePlace,selectPlace,deSelectPlace} from './src/store/actions/index';

//  class App extends React.Component {
//   // state = {
//   //   places:[],
//   //   selectedPlace: null
//   // }
// placeAddedHandler = placeName =>{
//  this.props.onAddPlace(placeName);
//  console.log('place added');

//   // this.setState(prevState=>{
//   //   return {
//   //           places:prevState.places.concat({key:Math.random(),image:PlaceImage,name:placeName})    
//   //         };
//   //       });
// };
    
// placeSelectedHandler = key =>{
//   this.props.onSelectPlace(key); 
//   // this.setState(prevState=>{
//     //   return{
//     //     selectedPlace:prevState.places.find(place=>{
//     //       return place.key === key;
//     //     })
//     //   }
//     // })
// };

// placeDeletedHandler = () =>{
//   this.props.onDeletePlace( );
//   // this.setState(prevState=>{
//   //   return{
//   //   places:prevState.places.filter(place=>{
//   //     return place.key !== prevState.selectedPlace.key;
//   //   }),
//   //   selectedPlace:null
//   // };
//   // });
// };
//   modalCloseHandler =() =>{
//   this.props.onDeselectPlace();
//     // this.setState({
//     //   selectedPlace:null
//     // });
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//           <PlaceInput onPlaceAdded={this.placeAddedHandler} /> 
//           <PlaceList places={this.props.places}  onItemSelected={this.placeSelectedHandler}/>
//           <PlaceDetail selectedPlace={this.props.selectedPlace} onItemDeleted={this.placeDeletedHandler} onModalClose={this.modalCloseHandler}/>    
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   listContainer:{
//     width:'100%'
//   }
// });
// const mapStateToProps = state =>{
//   return {
//     places:state.places.places,
//     selectedPlace:state.places.selectedPlace
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: (name) => dispatch(addPlace(name)),
//     onDeletePlace: () => dispatch(deletePlace()),
//     onSelectPlace: (key) => dispatch(selectPlace(key)),
//     onDeselectPlace: () => dispatch(deSelectPlace())

//   };
// };

// export default connect(mapStateToProps,mapDispatchToProps)(App);
