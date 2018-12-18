import React from 'react';
import { Text,StyleSheet} from 'react-native';

const mainText = props => (
    <Text style={styles.mainText}>{props.children}</Text>
);

const styles=StyleSheet.create({
    mainText:{
        color:"#7b1fa2",
        margin: 20,
    }
});
export default mainText;
