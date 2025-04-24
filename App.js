import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'fuzzy-bubbles': require('./assets/fonts/FuzzyBubbles-Regular.ttf'),
  });
};

function MainStack() {
    return (
        <Stack.Navigator initialRouteName="Screen1">
            <Stack.Screen name="Screen1" component={Screen1} options={{ headerShown: false }} />
            <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} />
            <Stack.Screen name="Screen3" component={Screen3} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={console.warn} />;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = route.name === 'Home' ? 'home' : 'cart';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#FF6F00',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={MainStack} />
                <Tab.Screen name="Cart" component={Screen3} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
