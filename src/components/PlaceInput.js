import React from 'react';

import DefaultTextInput from '../components/UI/DefaulTextInput';

const PlaceInput =props=>(
    <DefaultTextInput 
        placeholder="Enter the place"       
        onChangeText={props.onChangeText}
        value={props.placeData.value}
        valid={props.placeData.valid}
        touched={props.placeData.touched}
       />
    );

export default PlaceInput;

  