import React from 'react';
import {TouchableOpacity,View,Text,StyleSheet,TouchableNativeFeedback,Platform} from 'react-native';

const ButtonWithBackground = props =>{
    const content = (
        <View style={[styles.button,{backgroundColor:props.color},props.disabled ? styles.disabledBtn : null]}>
              <Text style={{color:"white"}}>{props.children}</Text>
        </View>
    );

    if(props.disabled){
        return content;
    }

    if(Platform.OS === "android"){
    return(
        <TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>
    );
    }
    return(
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    );
    
};
const styles = StyleSheet.create({
    button:{
        padding:10,
        margin:8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
    },
    disabledBtn:{
        backgroundColor:'#Ce93d8',
        borderColor:'#eee'
    },

});
export default ButtonWithBackground;