import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MEALS } from '../data/dummy-data';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}
const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const mealSelected = MEALS.find(meal => meal.id === mealId);
    return (
        <ScrollView>
            <Image source={mealSelected.imageUrl} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{mealSelected.duration}m</DefaultText>
                <DefaultText>{mealSelected.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{mealSelected.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {mealSelected.ingredients.map(ingredient => <ListItem key={ingredient}> {ingredient} </ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {mealSelected.steps.map(step => <ListItem key={step}>{step}</ListItem>)}

        </ScrollView>

    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId');
    const mealSelected = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: mealSelected.title,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName="ios-star"
                    onPress={() => {
                        console.log('Mark as Favorite');
                    }}
                />
            </HeaderButtons>
        )
    };
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    title: {
        fontFamily: "open-sans-bold",
        textAlign: 'center',
        fontSize: 22
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;
