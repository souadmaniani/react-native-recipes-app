import React from 'react';
import {View, StyleSheet} from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';

import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props => {

    const availableMeals = useSelector(meal => meal.meals.filteredMeals);
    const catId = props.navigation.getParam('categoryId');
    const displayMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0);
    if (displayMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    No meals found, maybe check your filters!
                </DefaultText>
            </View>
        );
    }

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

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;
