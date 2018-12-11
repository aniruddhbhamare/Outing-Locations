import React from 'react';
import {FlatList,StyleSheet } from 'react-native';
import ListItem from './ListItem';

const PlaceList = props =>{
    // const newPlaces = props.places.map((place,i)=>(
    // // <Text key={i}>{place}</Text>)
    // <ListItem key={i} 
    //   placeName={place} 
    //   onTouch={()=>{props.onItemDeleted(i)}}/>
    //   ));
        return(
         <FlatList style={styles.listContainer}
         data={props.places}
         renderItem={(info)=>(
            <ListItem 
           // key={i} 
            placeName={info.item.name} 
            placeImage={info.item.image}
            onTouch={()=>{props.onItemSelected(info.item.key)}}/>
         )}/>  
        );
}

const styles = StyleSheet.create({
    listContainer:{
      width:'100%'
    }
  });
export default PlaceList;