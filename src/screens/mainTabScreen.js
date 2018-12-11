import {Navigation} from "react-native-navigation";
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTab =()=>{   
    Promise.all([
        Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map",30),
        Icon.getImageSource(Platform.OS === "android" ? "md-share" : "ios-share-alt",30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu",30)
    ]).then(sources =>{
        Navigation.startTabBasedApp({
            tabs:[
                    {
                        screen:"awesome-places.FindPlaceScreen",
                        lable:"find places",
                        title:"Find Places",
                        icon:sources[0],
                        navigatorButtons:{
                            leftButtons:[
                                {
                                   icon:sources[2],
                                   title:"Menu",
                                   id:"sideDrawerToggle"
                                }
                            ]
                        }
                    },
                    {
                        screen:"awesome-places.SharePlaceScreen",
                        lable:"share places",
                        title:"Share Places",
                        icon:sources[1],
                        navigatorButtons:{
                            leftButtons:[
                                {
                                   icon:sources[2],
                                   title:"Menu",
                                   id:"sideDrawerToggle"
                                }
                            ]
                        }
                    },
                 ],
                 tabsStyles:{
                    tabBarSelectedButtonColor:"#7b1fa2"
                 },
                 drawer:{
                     left:{
                         screen:"awesome-places.SideDrawerScreen"
                     }
                 },
                 appStyle:{
                     tabBarSelectedButtonColor:"#7b1fa2"
                 }
                 
        })   
    });

};

export default startTab;
