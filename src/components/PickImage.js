import React from 'react';
import {View,Image,Button,StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends React.Component {
    state={
        pickedImage:null
    }

    pickedImageHandler=()=>{
        ImagePicker.showImagePicker({title:"Pick the Image"},res=>{
            if(res.didCancel){
                console.log("User Canclled !");
            } else if(res.error){
                console.log("Error",res.error);
            } else {
                this.setState({
                    pickedImage:{ uri: res.uri}
                }),
                this.props.onImagePicked({uri:res.uri,base64:res.data});
            }
        }) 
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImg}/>
                </View>
                <View style={styles.button}>
                    <Button title="Select Image" onPress={this.pickedImageHandler}/>
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
    placeholder:{
        backgroundColor:"#Ce93d8",
        borderWidth: 1,
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
export default PickImage;