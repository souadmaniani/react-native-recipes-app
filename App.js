import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MealsNavigator from './navigation/MealsNavigator';

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
    <MealsNavigator />
  );
}

