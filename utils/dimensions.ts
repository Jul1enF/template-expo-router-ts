import { Dimensions, Platform } from "react-native";


const screenHeight = Dimensions.get('window').height
const fullScreenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('window').width


export const RPH = (percentage : number) => {

    if (Platform.OS === "android") {
        return (percentage / 100) * fullScreenHeight
    }
    else {
        return (percentage / 100) * screenHeight;
    }
};

export const RPW = (percentage : number) => {
    return (percentage / 100) * (screenWidth);
};

export const phoneDevice = screenWidth < 600;