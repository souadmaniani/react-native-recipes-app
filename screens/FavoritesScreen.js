import React from 'react';
import MealList from '../components/MealList';
import {MEALS} from '../data/dummy-data';

const FavoritesScreen = props => {
    const FavMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');
    return (
        <MealList listData= {FavMeals} navigation= {props.navigation}/>
    );
};

FavoritesScreen.navigationOptions = {
    headerTitle: 'Your Favourite'
};
 
export default FavoritesScreen;
