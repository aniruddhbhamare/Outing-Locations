import React,{ Component } from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,Platform,Dimensions,ScrollView} from 'react-native';

import { connect } from 'react-redux';
import {deletePlace} from '../store/actions/index';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from "react-native-maps";


class PlaceDetailScreen extends Component {
    state = {
      viewMode: "portrait"
    };
  
    constructor(props) {
      super(props);
      Dimensions.addEventListener("change", this.updateStyles);
    }
  
    componentWillUnmount() {
      Dimensions.removeEventListener("change", this.updateStyles);
    }
  
    updateStyles = dims => {
      this.setState({
        viewMode: dims.window.height > 500 ? "portrait" : "landscape"
      });
    };
  
    onItemDeletedHandler = () => {
      this.props.onPlaceDeleted(this.props.selectedPlace.key);
      this.props.navigator.pop();
    };
  
    render() {
      return (
        <View
          style={[
            styles.container,
            this.state.viewMode === "portrait"
              ? styles.portraitContainer
              : styles.landscapeContainer
          ]}
        >
          <View style={styles.placeDetailContainer}>
            <View style={styles.subContainer}>
              <Image
                resizeMode="cover"
                source={this.props.selectedPlace.image}
                style={styles.placeImage}
              />
            </View>
            </View>
          <View style={styles.placeDetailContainer}>
            <View style={styles.subContainer}>
              <MapView
                initialRegion={{
                  ...this.props.selectedPlace.location,
                  latitudeDelta: 0.0122,
                  longitudeDelta:
                    Dimensions.get("window").width /
                    Dimensions.get("window").height *
                    0.0122
                }}
                style={styles.map}
              >
                <MapView.Marker coordinate={this.props.selectedPlace.location} />
              </MapView>
            </View>
          </View>

          <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <View style={this.state.viewMode === "portrait" ? styels={marginTop:"5%"} : null}>
              <Text style={styles.placeName}>
                {this.props.selectedPlace.name}
              </Text>
            </View>
           
          </View>
        </View>
    </View>
      );
    }
  }
  
  //lone 79 <View>
//   <TouchableOpacity onPress={this.onItemDeletedHandler}>
//   <View style={styles.deleteButton}>
//     <Icon
//       size={30}
//       name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
//       color="red"
//     />
//   </View>
// </TouchableOpacity>
//</View>
  const styles = StyleSheet.create({
    container: {
      margin: 22,
      flex: 1
    },
    portraitContainer: {
      flexDirection: "column"
    },
    landscapeContainer: {
      flexDirection: "row",
    },
    placeDetailContainer: {
      flex: 1
    },
    placeImage: {
      width: "100%",
      height: "100%"
    },
    placeName: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 28
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
      alignItems: "center",
    },
    subContainer: {
      flex: 1
    }
  });



// class PlaceDetailScreen extends Component{
//     onItemDeletedHandler = ()=>{
//         this.props.onPlaceDeleted(this.props.selectedPlace.key);
//         this.props.navigator.pop();
//     }
    
//     render(){
//         return(
//          <View style={styles.container}>
//             <View style={styles.innerContainer}>
//               <Image source={this.props.selectedPlace.image} style={styles.img}/>
//             </View> 
//             <View style={styles.innerContainer}>
//             <MapView
//                 initialRegion={{
//                     ...this.props.selectedPlace.location,
//                     latitudeDelta: 0.0122,
//                     longitudeDelta:
//                     Dimensions.get("window").width /
//                     Dimensions.get("window").height *
//                     0.0122
//                 }}
//                 style={styles.map}
//                 >
//                 <MapView.Marker coordinate={this.props.selectedPlace.location} />
//                 </MapView>
//             </View>
//             <View style={styles.innerContainer}>
//                 <View style={styles.placeNameContainer}>
//                     <Text style={styles.placeName}>{this.props.selectedPlace.name} </Text>
//                 </View>
//                 <TouchableOpacity onPress={this.onItemDeletedHandler}>
//                 <View style={styles.delBtn}>
//                 <Icon size={28} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color='red'/>   
//                 </View>
//             </TouchableOpacity>
//           </View>
//      </View>     
//         );
//     }
// } 
// const styles = StyleSheet.create({
//     modalContainer:{
//         margin :22,
//         flex:1
//     },
//     innerContainer:{
   
//     },
//     img:{
//         width:"100%",
//         height:200
//     },
//     map:{
//         width:"100%",
//         height:200
//     },
//     placeName:{
//         fontWeight: 'bold',
//         textAlign: 'center',
//         fontSize:28,
//     },
//     placeNameContainer:{
//         marginTop: 10,
//     },
//     delBtn:{
//         alignItems: 'center',
//     }
// }); 

const mapDispatchToProps = dispatch =>{
    return{
        onPlaceDeleted :key=>dispatch(deletePlace(key))
    };
}
export default connect(null,mapDispatchToProps)(PlaceDetailScreen);


// //working with responsive style














//first its in src-components-placeDetail.js


// import React from 'react';
// import {View,Text,Modal,Image,Button,StyleSheet,TouchableOpacity} from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
// const PlaceDetail =(props)=>{
//     let modalContent = null;
//     if(props.selectedPlace){
//         modalContent=( 
//             <View>
//             <Image source={props.selectedPlace.image} style={styles.img}/>
//             <Text style={styles.placeName}>{props.selectedPlace.name} </Text>
//             </View>) ;

//     }
// return(
//     <Modal onRequestClose={props.onModalClose} visible={props.selectedPlace !== null} animationType="slide">
//     <View style={styles.modalContainer}>
//     {modalContent}
//          <View>
//          <TouchableOpacity onPress={props.onItemDeleted}>
//             <View style={styles.delBtn}>
//             <Icon size={28} name='ios-trash' color='red'/>   
//             </View>
//             </TouchableOpacity>
//          <Button title="Close" onPress={props.onModalClose}/>
//          </View>
//     </View>     
// </Modal>
// )};
// //<Button title="Delete" color="red" onPress={props.onItemDeleted}/>

// const styles = StyleSheet.create({
//     modalContainer:{
//         margin :22
//     },
//     img:{
//         width:"100%",
//         height:200
//     },
//     placeName:{
//         fontWeight: 'bold',
//         textAlign: 'center',
//         fontSize:28,
//     },
//     delBtn:{
//         alignItems: 'center',
//     }
// }); 
// export default PlaceDetail;