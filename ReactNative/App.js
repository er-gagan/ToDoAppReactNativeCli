/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// adb connect 127.0.0.1:21503
// npx react-native run-android
import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import Home from './Screens/Home'
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'
import AccountScreen from './Screens/AccountScreen'
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'

          }
          else if (route.name === 'AccountScreen') {
            iconName = 'user'
          }
          // You can return any component that you like here!
          return <View style={{ borderWidth: 15, height: 65, width: 65, borderRadius: 20, borderColor: "white", backgroundColor: "white" }}><Feather name={iconName} size={35} color={color} /></View>
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "" }} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} options={{ title: "" }} />
    </Tab.Navigator>
  )
}

const Natigation = () => {
  const [user, setUser] = useState('')
  useEffect(async() => {
    userSync=false
    userSync = await AsyncStorage.getItem("loggedIn")
    userExist = JSON.parse(userSync).loggedInSync
    // console.log(userExist)
    if (userExist) {
      setUser(userExist)
    }
    else {
      setUser('')
    }
  },[])
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <MyStack />}
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Natigation />
    </View>
  );
};

export default App;