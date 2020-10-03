import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';


const FilterSwitch = props => {

    return (
        <View style={styles.containerFliter} >
            <Text style={styles.label}>{props.label} </Text>
            <Switch value={props.state}
                trackColor={{ true: Colors.primary }}
                thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
                onValueChange={props.OnChange}
            />
        </View>
    );
};
// OUR COMPONENT
const FiltersScreen = props => {
    const { navigation } = props;
    const [isGluttenFree, setIsGluttenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();
    // COMMUNICATE BETWEEN OUR COMPONENT AND NAVIGATIONOPTIONS
    //******************************************************* */ /
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGluttenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));
    }, [isGluttenFree, isLactoseFree, isVegan, isVegetarian]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters])
    //******************************************************* */ /
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
           
            <FilterSwitch label="Glutten-free"
                state={isGluttenFree}
                OnChange={(newValue) => setIsGluttenFree(newValue)}
            />
            <View style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            </View>
            <FilterSwitch label="Lactose-free"
                state={isLactoseFree}
                OnChange={(newValue) => setIsLactoseFree(newValue)}
            />
            <View style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            </View>
            <FilterSwitch label="Vegan"
                state={isVegan}
                OnChange={(newValue) => setIsVegan(newValue)}
            />
            <View style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            </View>
            <FilterSwitch label="Vegetarian"
                state={isVegetarian}
                OnChange={(newValue) => setIsVegetarian(newValue)}
            />
            <View style={{ width: '100%', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
            </View>
        </View>
    );
};

// navigationOptions
FiltersScreen.navigationOptions = (navData) => {
    return ({
        headerTitle: "Filter Meals",
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    })
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: "nunito-semi-bold-italic",
        textAlign: 'center',
        fontSize: 22,
        margin: 20,
        color: Colors.primary,
        borderColor: Colors.primary,
        borderRadius: 25,
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    containerFliter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
    },
    label: {
        fontFamily: 'nunito-semi-bold-italic',
        fontSize: 17,
        color: Colors.second
    }
})

export default FiltersScreen;
