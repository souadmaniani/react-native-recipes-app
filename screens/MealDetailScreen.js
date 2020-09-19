import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';

import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
};

const MealDetailScreen = props => {
    const availableMeals = useSelector(meal => meal.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const mealSelected = availableMeals.find(meal => meal.id === mealId);
    const currentMealIsFav = useSelector(meal => meal.meals.favoriteMeals.some(meal => meal.id === mealId));

    // DISPATCH THE ACTION WHEN CLICK THE STAR BUTTON
    const dispatch = useDispatch();
    // useCallback used to avoid infinite loop in useEffect
    const toggleFavoriteHandler = useCallback(() => {
        // dispatch take the action Creator
        dispatch(toggleFavorite(mealId))
    }, [dispatch]);

    // pass dispatch action to navigationOption
    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFav })
    }, [currentMealIsFav]);

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
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    // const mealSelected = MEALS.find(meal => meal.id === mealId);
    return {
        headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName={(isFav) ? "ios-star" : "ios-star-outline"}
                    onPress={toggleFavorite}
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
