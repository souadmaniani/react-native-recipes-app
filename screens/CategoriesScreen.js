import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';

const CategoriesScreen = props => {
    // console.log(props);
    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                // PASSING DATA BETWEEN SCREENS
                onSelect={() => props.navigation.navigate({
                    routeName: 'CategoryMeals',
                    params: { categoryId: itemData.item.id }
                }
                )}
            />
        );
    }
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />

    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return ({
        headerTitle: 'Meal Categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    })
};

export default CategoriesScreen;
