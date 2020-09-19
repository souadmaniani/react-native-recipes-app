import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';


const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

// LOAD FONTS
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  // MAKE SURE THAT WE KEEP THE SPLASH SCREEN OPEN
  // UNTIL OUR FONTS ARE LOADED
  if (!fontLoaded) {
    return (<AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
    );
  }

  return (
    <Provider store= {store}>
      <MealsNavigator />
    </Provider>

  );
}

