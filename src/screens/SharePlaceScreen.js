import React ,{Component} from 'react';
import { View,Text,Button,StyleSheet,Image,ScrollView,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {addPlace,startAddPlaces } from '../store/actions/index';

import MainText from '../components/UI/MainText';
import TextHeader from '../components/UI/TextHeader';
import PlaceInput from '../../src/components/PlaceInput'; 
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';
import validate from '../utilities/validation';
import { reset } from 'ansi-colors';

class SharePlaceScreen extends Component{
   
    static navigatorStyle={
        navBarButtonColor:"#7b1fa2"
    }

    componentWillMount(){
      this.reset();
    }


    reset =() =>{
        this.setState({
            controls:{
                placeName:{
                     value:"",
                     valid:false,
                     touched:false,
                     validationRules:{
                         notEmpty:true
                     }
                },
                location:{
                    value:null,
                    valid:false
                },
                image:{
                    value:null,
                    valid:false
                }
            }
        });
    }

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidUpdate(){
        if(this.props.placeAdded){
            this.props.navigator.switchToTab({tabIndex:0});
           // this.props.navigator.onStartAddPlace();
        }
    };

    
    onNavigatorEvent = event =>{
        if(event.type === "ScreenChangedEvent"){
            if(event.id === "willAppear") {
                this.props.onStartAddPlace();
            }
        }
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
        }
    }
    onChangeTextHandler = value =>{
        this.setState((prevState)=>{
            return{
                controls:{
                ...prevState.controls,
                
                placeName:{
                    ...prevState.controls.placeName,
                    value:value,
                    valid:validate(value,prevState.controls.placeName.validationRules),
                    touched:true
                }
             }
            };
        });
    };

    placeAddedHandler =()=>{
        this.props.onPlaceAdd(this.state.controls.placeName.value,this.state.controls.location.value,this.state.controls.image.value);
        this.reset();
        this.imagePicker.reset();
        this.mapPicker.reset();
    }
   
    locationPickedHandler = location =>{
        this.setState(prevState=>{
            return{
                controls:{
                   ...prevState.controls,
                    location : {
                        value:location,
                        valid:true
                    }
                }
            }
        });
    }

    imagePickedHandler=(image)=>{
        this.setState((prevState)=>{
            return{
                controls:{
                    ...prevState.controls,
                    image:{
                        value:image,
                        valid:true
                    }
                }
            }
        });
    }
    render(){
        let submitButton = (
            <Button 
                title="Share The Place" 
                onPress={this.placeAddedHandler}
                disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid || !this.state.controls.location.valid}/>
        );

        if(this.props.isLoading){
          submitButton=<ActivityIndicator size={"large"} color="#7b1fa2" />
        }
        return(
            <ScrollView >
            <View style={styles.container}>
              <MainText> <TextHeader>Share a Place with us!</TextHeader></MainText>
          
                    <PickImage 
                        onImagePicked={this.imagePickedHandler}
                        ref={ref=>this.imagePicker = ref}
                        />  
                    <PickLocation 
                        onLocationPick={this.locationPickedHandler}
                        ref={ref => this.mapPicker=ref}
                        />

               <PlaceInput 
                 placeData={this.state.controls.placeName}
                 onChangeText={this.onChangeTextHandler}/>
                <View style={styles.button}>
                    {submitButton}
                </View>
            </View>
           </ScrollView>     
        );
    }
}


    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems: 'center',
        },
        placeholder:{
            backgroundColor:"#eee",
            borderWidth: 1,
            width:"80%",
            height:150,
        },
        button:{
            margin:10
        },
        previewImg:{
            width:"100%",
            height:"100%"
        }
    }); 

    const mapStateToProps = state =>{
        return{
            isLoading:state.ui.isLoading,
            placeAdded:state.places.placeAdded
        }
    }

    const mapDispatchToProps = dispatch =>{
        return{
            onPlaceAdd:(placeName,location,image) =>dispatch(addPlace(placeName,location,image)),
            onStartAddPlace:() => dispatch(startAddPlaces())

        };
    };
export default connect(mapStateToProps,mapDispatchToProps)(SharePlaceScreen);