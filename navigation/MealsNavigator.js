import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

// HEADER STYLE FOR THE STACK
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary,
        
    },
    headerTitleStyle: { fontFamily: 'nunito-black', fontSize: 24},
    headerBackTitleStyle: { fontFamily: 'nunito-black' },
    headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
};

// STACK 1
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen,
        // navigationOptions: {
        //     headerTitle: 'Meal CategoriesWin'
        // }
    },
    MealDetail: MealDetailScreen
},
    {
        // initialRouteName: 'MealDetail',
        defaultNavigationOptions: defaultStackNavOptions
    }
);

// STACK 2
const FavNavigator = createStackNavigator({
    Favourite: FavoritesScreen,
    MealDetail: MealDetailScreen
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

// CONFIGURATION FOR THE BOTTOM TAB
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons
                    name="ios-restaurant"
                    size={25}
                    color={tabInfo.tintColor}
                />);
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === 'android' ?
                <Text style={{ fontFamily: 'nunito-regular', fontSize: 16 }}> Meals</Text> :
                'Meals'
        }
    },
    Favourite: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: "Favourite!",
            tabBarIcon: (tabInfo) => {
                return (<Ionicons
                    name="ios-star"
                    size={25}
                    color={tabInfo.tintColor}
                />);
            },
            tabBarColor: Colors.second,
            tabBarLabel: Platform.OS === 'android' ?
                <Text style={{ fontFamily: 'nunito-regular', fontSize: 16 }}> Favourite</Text> :
                'Favourite'
        }
    }
};

// CREATION FOR THE BOTTOM TAB
const MealsFavTabNavigator =
    Platform.OS === 'android' ?
        createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: "white",
            shifting: true
        })
        :
        createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                labelStyle: { fontFamily: 'nunito-regular' },
                activeTintColor: "white",
            },

        });

// STACK 3
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

// CREATION FOR THE DRAWER NAVIGATOR
const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: { drawerLabel: 'Meals' }
    },
    FilterMeals: FiltersNavigator
},
    {
        contentOptions: {
            activeTintColor: Colors.second,
            labelStyle: {
                fontFamily: 'nunito-regular',
                fontSize: 16
            }
        }
    });

export default createAppContainer(MainNavigator);