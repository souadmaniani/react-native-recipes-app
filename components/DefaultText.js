import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const DefaultText = props => {
    return (
        <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'nunito-regular', 
        fontSize: 15
       
    }
});

export default DefaultText;
