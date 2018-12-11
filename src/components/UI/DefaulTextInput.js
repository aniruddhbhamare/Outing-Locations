import React from 'react';
import { TextInput,StyleSheet} from 'react-native';

const defaultTextInput = props =>(
     <TextInput 
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.textInput,props.style,!props.valid && props.touched ? styles.invalid : null]}
        /> 
   );   

const styles = StyleSheet.create({
    textInput:{
        width:'100%',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: "#eee",
        padding:5,
        marginTop:8,
        marginBottom: 8,
       
       
    },
    invalid:{
         borderColor:'#f44336'
    }
});

export default defaultTextInput;