import React, { Component } from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableOpacity,Platform,Image,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import App from '../../App';
import {authLogOut} from '../store/actions/index';
import { connect } from 'react-redux';
import logo from '../assets/logoPng.png';
class SideDrawerScreen extends Component {


    
    render(){
        return(
            <View  style={[styles.container,{width:Dimensions.get("window").width * 0.8}]}>
               <View style={styles.headerContainer}>
                    <Image resizeMode="cover" source={logo} style={styles.logo}/>
                    <Text style={styles.sideDrawerHeader}>Beautiful Places</Text>
               </View>
                <TouchableOpacity onPress={this.props.onLogOut}>
                    <View style={styles.drawerItem}>
                        <Icon name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"} size={30} color="#7b1fa2" style={styles.drawerIcons}/>
                        <Text style={{ color:"#fff"}}>Log Out</Text>
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
        fontSize:30,
        fontWeight:"bold",
        color:"#fff"
    },
    logo:{
        height:200,
        width:200
    },
    headerContainer:{
        alignItems:'center',
        justifyContent: 'center',
        height:"70%",
        backgroundColor:"#7b1fa2",
        marginBottom: 10,
    },
    drawerItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:"#Ce93d8",
        padding:5,
       
    },
    drawerIcons:{
        marginLeft: 10,
        marginRight:20
    }
})

const mapDispatchToProps= dispatch =>{
    return {
        onLogOut:()=>dispatch(authLogOut())
    };
};

export default connect(null,mapDispatchToProps)(SideDrawerScreen);