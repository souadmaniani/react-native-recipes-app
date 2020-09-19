import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

// ACTING WHEN GETTING SUCH A TOGGLE FAVORITE ACTION
const mealsReducer = (state = initialState, action) => {
    // HANDLER DIFFERENT CASES
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updateFavMeals = [...state.favoriteMeals];
                updateFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updateFavMeals }
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updateFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && meal.isGlutenFree)
                    return false;
                if (appliedFilters.lactoseFree && meal.isLactoseFree)
                    return false;
                if (appliedFilters.vegan && meal.isVegan)
                    return false;
                if (appliedFilters.vegetrian && meal.isVegetarian)
                    return false;
                return true;
            });
            return {...state, filteredMeals: updateFilteredMeals}
        default:
            return state;
    }

};

export default mealsReducer;