import React ,{Component} from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Animated} from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../src/components/PlaceList';

import {getPlaces} from '../store/actions/index';

class FindPlaceScreen extends Component{

    static navigatorStyle={
        navBarButtonColor:"#7b1fa2"
    }

    state ={
        placesLoaded:false,
        removeAnim:new Animated.Value(1)
    }

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount(){
        this.props.onLoadPlaces();
    }
    onNavigatorEvent = event =>{
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
        }
    }

    findPlaceHandler=()=>{
       Animated.timing(this.state.removeAnim,{
        toValue:0,
        duration:500,
        useNativeDriver:true
       }).start();
       this.setState({
        placesLoaded:true
       });
    }
    
    onItemSelectedHandler = key =>{
     const selPlace = this.props.places.find(place=>{
         return place.key === key
     });

        this.props.navigator.push({
            screen:"awesome-Places.PlaceDetailScreen",
            title:selPlace.name,
            passProps:{
                selectedPlace:selPlace
            }
        });
    }

    render(){
        let content = (
        <Animated.View 
           style={{
               opacity:this.state.removeAnim,
            //    transform:[
            //        {
            //         scale:this.state.removeAnim
            //         // .interpolate({
            //         //     inputRange:[0,1],
            //         //     outputRange:[12 ,1]
            //         // })
            //        }
            //    ]
            }}>
            <TouchableOpacity onPress={this.findPlaceHandler}>
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Find Places</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>); 
        
        
        if(this.state.placesLoaded){
            content=(
                <PlaceList places={this.props.places} onItemSelected={this.onItemSelectedHandler}/>
            );
        }
        return(
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                {content}
            </View>     
        );
    }
}
const styles = StyleSheet.create({
    buttonContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    searchButton:{
        borderWidth: 3,
        borderRadius: 50,
        borderColor: '#7b1fa2',
        padding:10,
        
    },
    searchButtonText:{
        color:'#7b1fa2',
        fontWeight: 'bold',
        fontSize:26,
    }
});

const mapStateToProps = state =>{
    return{
        places:state.places.places
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onLoadPlaces:() =>dispatch(getPlaces())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(FindPlaceScreen);