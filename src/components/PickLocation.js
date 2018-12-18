import React from 'react';
import {View,Button,StyleSheet,Dimensions} from 'react-native';
import ButtonWithBackground from '../components/UI/ButtonWithBackground';
import MapView from 'react-native-maps';

class PickLocation extends React.Component {
   state={
       focusedLocation:{
           latitude:18.5165,
           longitude:73.8561,
           latitudeDelta:0.0122,
           longitudeDelta:Dimensions.get("window").width / Dimensions.get("window").height * 0.0122,
       },
       locationChosen:false
   }


   reset = () =>{
       this.setState({
        focusedLocation:{
            latitude:18.5165,
            longitude:73.8561,
            latitudeDelta:0.0122,
            longitudeDelta:Dimensions.get("window").width / Dimensions.get("window").height * 0.0122,
        },
        locationChosen:false
       });
   }

   pickLocationHandler = event=>{
       const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude:coords.latitude,
            longitude:coords.longitude
        })
       this.setState((prevState)=>{
           return{
                focusedLocation:{
                    ...prevState.focusedLocation,
                    latitude:coords.latitude,
                    longitude:coords.longitude
                },
                locationChosen:true
           };
       });
       //    console.log("latitudeLLLLL:",coords.latitude);
       //    console.log("longitudeLLLL:",coords.longitude);
       this.props.onLocationPick({
        latitude:coords.latitude,
        longitude:coords.longitude
    })      
   };

   getLocationHandler =() =>{
       navigator.geolocation.getCurrentPosition(pos=>{
            const coordsEvent = {
                nativeEvent:{
                    coordinate:{
                        latitude:pos.coords.latitude,
                        longitude:pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
       },
       err=>{
           console.log(err);
        alert('Featching the Position Failed,Please pick one manually!');
       });
   }
    render(){
        let marker = null;
        
        if(this.state.locationChosen){
            marker=<MapView.Marker coordinate={this.state.focusedLocation}/>
    }

        return(
            <View style={styles.container}>
            <View style={{ borderWidth: 1,width:'100%',borderColor:"#7b1fa2",}} >
               <MapView 
                 initialRegion={this.state.focusedLocation}
                region={!this.state.locationChosen ? this.state.focusedLocation : null}
                style={styles.map} 
                onPress={this.pickLocationHandler}
                ref={ref => this.map = ref}
                >{marker}</MapView>
            </View>
                <View style={styles.button}>
                    <ButtonWithBackground 
                        color="#7b1fa2" 
                        onPress={this.getLocationHandler}
                    >Locate Me</ButtonWithBackground>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
       width:"100%",
       alignItems: 'center',
      
    },
    map:{
       width:"100%",
       height:250,
    },
    button:{
        margin:10
    },
    previewImg:{
        width:"100%",
        height:"100%"
    }
}); 
export default PickLocation;