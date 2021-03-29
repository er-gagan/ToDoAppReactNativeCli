/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// adb connect 127.0.0.1:21503
// npx react-native run-android
import React from 'react';
import Home from './Screens/Home'
import {View} from 'react-native';

const App = () => {
  
  return (
    <View>
      <Home/>
    </View>
  );
};

export default App;
