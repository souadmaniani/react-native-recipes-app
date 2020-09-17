import React from 'react';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {


    const catId = props.navigation.getParam('categoryId');
    const displayMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0);
    return (
        <MealList listData={displayMeals} navigation={props.navigation} />
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        headerTitle: selectCategory.title,
    };
};



export default CategoryMealsScreen;
