import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
    const FavMeals = useSelector(meal => meal.meals.favoriteMeals);
    if (FavMeals.length === 0 || !FavMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    No Favorite meal found.Start adding some!
                </DefaultText>
            </View>
        );
    }
    return (
        <MealList listData={FavMeals} navigation={props.navigation} />
    );
};

FavoritesScreen.navigationOptions = {
    headerTitle: 'Your Favourite'
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default FavoritesScreen;
