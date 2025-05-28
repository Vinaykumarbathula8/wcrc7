import React, { Profiler, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Center,
    NativeBaseProvider,
    extendTheme
} from "native-base";
import { Alert } from 'react-native';

import PersonalDetails from '../pages/PersonalDetails';
import PaperAndAuthorDetails from '../pages/PaperAndAuthorDetails';

const Stack = createNativeStackNavigator();

export default function AppNav() {

    return (

        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="PersonalDetails"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="PersonalDetails"
                    component={PersonalDetails}
                    options={{ title: 'Personal Details' }}
                />
                <Stack.Screen
                    name="PaperAndAuthorDetails"
                    component={PaperAndAuthorDetails}
                    options={{ title: 'Paper & Author Details' }}
                />
                
            </Stack.Navigator>

        </NavigationContainer >

    )
}