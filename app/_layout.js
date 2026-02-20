import { Stack } from "expo-router";
import { useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation'
import { phoneDevice } from "../utils/dimensions"
import Header from "@components/layout/Header";
import useIsAppObsolete from "@hooks/useIsAppObsolete";
import useRestartApp from "@hooks/useRestartApp";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '@reducers/user'


const store = configureStore({
    reducer: { user },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export default function RootLayout() {

    const unlockPortraitModeTablet = async () => {
        !phoneDevice && await ScreenOrientation.unlockAsync()
    }

    useEffect(() => {
        unlockPortraitModeTablet()
    }, [phoneDevice])

    // Check if the version of the app is obsolete to eventually block it
    const appObsolete = useIsAppObsolete()

    // Restart the app on android cellphones if the screen widht has changed (accessibility zoom) in order to properly reset the RPW and RPH
    useRestartApp()

    return (
        <Provider store={store}>
            <Stack screenOptions={{
                header: (props) => <Header {...props} appObsolete={appObsolete} />,
            }} >
                <Stack.Screen name="(tabs)" />
            </Stack>
        </Provider>
    )
}