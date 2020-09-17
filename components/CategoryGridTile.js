import React from 'react';
import {
    View, StyleSheet, Text,
    TouchableOpacity, Platform, TouchableNativeFeedback
} from 'react-native';

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21)
        TouchableCmp = TouchableNativeFeedback;
    return (
        <View style={styles.itemData}>
            <TouchableCmp onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title}> {props.title} </Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    itemData: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' &&
            Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5,
    },
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 15,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 9,
        borderRadius: 10

    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: "right"
    }
});

export default CategoryGridTile;
