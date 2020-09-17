import React from 'react';
import {
    View, StyleSheet, Text,
    TouchableOpacity, ImageBackground
} from 'react-native';

import DefaultText from '../components/DefaultText';

const MealItem = props => {
    return (
        <View style={styles.itemData}>
            <TouchableOpacity onPress= {props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground
                            style={styles.bgImage}
                            source={props.image}>
                            <View style= {styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}> {props.title} </Text>
                            </View>

                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <DefaultText>{props.duration}m</DefaultText>
                        <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    </View>
                </View>


            </TouchableOpacity>
        </View >

    );
};

const styles = StyleSheet.create({
    itemData: {
        height: 200,
        width: "100%",
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical:10
    },
    mealRow: {
        flexDirection: 'row',
    },
    mealHeader: {
        height: '85%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        // borderRadius: 20
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '15%'
    },

})

export default MealItem;
