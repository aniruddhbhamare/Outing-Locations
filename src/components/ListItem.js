import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';


const listItem = (props) =>(
<TouchableOpacity onPress={props.onTouch}>
 <View style={styles.listItem}>
    <Image resizeMode="cover" source={props.placeImage} style={styles.placeImg}/>
    <Text >{props.placeName}</Text>
 </View>
</TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem:{
        width:'100%',
        marginBottom:5,
        padding:10,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeImg:{
        marginRight:8,
        height:30,
        width:30
    }
});
export default listItem;