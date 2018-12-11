import React, { Component } from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideDrawerScreen extends Component {
    render(){
        return(
            <View  style={[styles.container,{width:Dimensions.get("window").width * 0.8}]}>
               <View style={styles.headerContainer}>
                <Text style={styles.sideDrawerHeader}>Awesome Places</Text>
               </View>
                <TouchableOpacity>
                    <View style={styles.drawerItem}>
                        <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#aaa" style={styles.drawerIcons}/>
                        <Text>Log Out</Text>
                    </View>
                </TouchableOpacity>
               
            </View>
            
        );
    };
}

const styles = StyleSheet.create({
    container:{
       
        backgroundColor: "#fff",
        height:"100%",
    },
    sideDrawerHeader:{
        textAlign:"center",
        fontSize:22,
        fontWeight:"bold",
    },
    headerContainer:{
        justifyContent: 'center',
        height:"13%",
        backgroundColor:"#ccc",
        marginBottom: 10,
    },
    drawerItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#eee',
        padding:5
    },
    drawerIcons:{
        marginLeft: 10,
        marginRight:20
    }
})

export default SideDrawerScreen;