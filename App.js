import React, { useEffect } from "react";
import { LogBox, Dimensions, PixelRatio, SafeAreaView, ScrollView } from 'react-native';
import {
    Center,
    NativeBaseProvider,
    extendTheme
} from "native-base";
import * as Device from 'expo-device';
import AppNav from './src/comps/AppNav';
// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark"
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    }, []);

    const theme = extendTheme({
        breakpoints: {
            base: 0, // 0-374 dp
            sm: 376, // 375-479 dp
            md: 481, // 480-767 dp
            lg: 769, // 768-991 dp
            xl: 993, // 992-1279 dp
            '2xl': 1281, // 1280 dp and up
        },
        colors: {
            cyan: {
                "500": "#0094C6",
                "600": "#0d6f90",
                "700": "#0f5d77",
                "800": "#041F60",
                "900": "#0f3948"
            },
        },
        config: {
            initialColorMode: 'light',
        },
        components: {
            Text: {
                baseStyle: {
                    color: '#000'
                }
            },
            Input: {
                height: {
                    sm: "150px",
                    md: "100",
                    lg: "20",
                    xl: "20",
                    "2xl": "20"
                }
            }
        }
    });

    return (
        <NativeBaseProvider theme={theme}>


            <AppNav />
            {console.warn('Device Type : ' + Device.deviceType)}
            {console.log(`Pixel Ratio : ${PixelRatio.get() * 160} Dpi`)}
            {console.log(`Window Width : ${Dimensions.get('window').width}`)}
            {console.log(`Window Height : ${Dimensions.get('window').height}`)}


        </NativeBaseProvider >
    );
}
