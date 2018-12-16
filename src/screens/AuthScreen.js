import React ,{ Component } from 'react';
import {View,StyleSheet,ImageBackground ,Dimensions,KeyboardAvoidingView,Keyboard ,TouchableWithoutFeedback,ActivityIndicator} from 'react-native';
import mainTabScreen from './mainTabScreen';

import DefaultTextInput from '../components/UI/DefaulTextInput';
import TextHeader from '../components/UI/TextHeader';
import MainText from '../components/UI/MainText';

import backgroundImg from '../assets/background.jpg';
import ButtonWithBackground from '../components/UI/ButtonWithBackground';

import validate from '../utilities/validation';

import { connect } from 'react-redux';
import { tryAuth ,authAutoSignIn} from '../store/actions/index';
class AuthScreen extends Component{
    state = { 
        viewMode:Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        authMode:"login",
        controls:{
            email:{
                value:"",
                valid:false,
                validationRules:{
                    isEmail:true
                },
                touched:false
            },
            password:{
                value:"",
                valid:false,
                validationRules:{
                    minLength:6
                },
                touched:false
            },
            confirmPassword:{
                value:"",
                valid:false,
                validationRules:{
                    equalTo:'password'
                },
                touched:false
            }
        }
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener('change',this.updateStyle)
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change',this.updateStyle);
    }

    componentDidMount(){
        this.props.onAuthAutoSignIn();
    }

    switchAuthModeHandler= () =>{
        this.setState((prevState)=>{
            return{
                authMode:prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };

    updateStyle = (dims) =>{
        this.setState({
            viewMode:dims.window.height > 500 ? 'portrait' : 'landscape'
        });
    }

    onChangeTextHandler=(key,value)=>{
        let connectedValue = {};

        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo:equalValue
            };
        }

        if( key === 'password'){
            connectedValue = {
                ...connectedValue,
                equalTo:value
            };
        }

        this.setState(prevState=>{
            return{
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid:key === 'password' ? validate(
                             prevState.controls.confirmPassword.value,
                             prevState.controls.confirmPassword.validationRules,
                             connectedValue
                             ) : prevState.controls.confirmPassword.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value:value,
                        valid:validate(value,prevState.controls[key].validationRules,connectedValue),
                        touched:true
                    }
                }
            }
        })
    }

    authHandler =() =>{
        const authData ={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value,
            confirmPassword:this.state.controls.confirmPassword.value,
        }
        this.props.onTryAuth(authData,this.state.authMode);
       
    };

    render(){
        let textHeader = null;
        let confirmPassowrdControl = null;
        let submitButton = (
            <ButtonWithBackground 
                    color="#7b1fa2" 
                    onPress={this.authHandler}
                    disabled={
                        !this.state.controls.email.valid ||
                        !this.state.controls.password.valid ||
                        !this.state.controls.confirmPassword.valid && this.state.authMode === "signup"}
                >Submit</ButtonWithBackground>
        );

        if(this.state.authMode === "signup"){
            confirmPassowrdControl=(
                <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultTextInput 
                    placeholder="Confirm Passsword" 
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(value)=>{
                        this.onChangeTextHandler('confirmPassword',value)    
                    }}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched} 
                    secureTextEntry 
                    />
            </View>  
            );
        }

        if (this.state.viewMode === "portrait"){
            textHeader = (  
                <MainText>
                     <TextHeader > Please Log In </TextHeader>
                </MainText>
            );
        }


        if(this.props.isLoading){
            submitButton =(<ActivityIndicator size={"large"} color="#7b1fa2" />);
        }

        return(
            <ImageBackground source={backgroundImg} style={styles.imagBack}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.headerWrapper}>
                {textHeader} 
               </View>
         
                <ButtonWithBackground 
                    color="#7b1fa2" 
                    onPress={()=>{this.switchAuthModeHandler()}}>Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
                </ButtonWithBackground>
                
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>

                    <DefaultTextInput 
                        placeholder="Your E-mail Address" 
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={value=>{
                            this.onChangeTextHandler('email',value)}}
                        valid={this.state.controls.email.valid}   
                        touched={this.state.controls.email.touched} 
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        />
                   
                    <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>     
                        <View style={this.state.viewMode === "portrait" || this.state.authMode === "login"  ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>                   
                            <DefaultTextInput 
                                placeholder="Password" 
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={(value)=>
                                    {this.onChangeTextHandler('password',value)
                                }}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry 
                                />

                        </View>
                        {confirmPassowrdControl}  
                     </View>
                 </View>    
               </TouchableWithoutFeedback>
                     {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
            
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems: 'center',
    },
    inputContainer:{
        width:"80%"
    },
    input:{
        //borderColor:"#bbb",
        borderColor:'#7b1fa2',
        backgroundColor: "#eee",
    },
    imagBack:{
        width:"100%",
        flex:1,
    },
    headerWrapper:{
        marginBottom:40,
    },
    //1st method but partially responsive

    // passwordContainer:{
    //     flexDirection: Dimensions.get('window').height > 500 ? 'column': 'row',
    //     justifyContent:'space-between'
    // },
    // passwordWrapper:{
    //     width:Dimensions.get('window').height > 500 ? "100%" : "45%"
    // }
    
    //3rd method way more easy
    landscapePasswordContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    portraitPasswordContainer:{
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    landscapePasswordWrapper:{
        width:"45%"
    },
    portraitPasswordWrapper:{
        width:"100%"
    }
});

const mapStateToProps = state =>{
    return{
        isLoading:state.ui.isLoading
    };
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onTryAuth:(authData,authMode)=>dispatch(tryAuth(authData,authMode)),
        onAuthAutoSignIn:()=>dispatch(authAutoSignIn())
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(AuthScreen);