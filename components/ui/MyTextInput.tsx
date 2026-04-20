import { TextInput, View, StyleSheet, Text, Platform, StyleProp, ViewStyle, TextStyle, TextInputProps } from "react-native";
import { RefObject, useRef, useState, ReactNode } from "react";
import { appStyle } from "@styles/appStyle";


type MyTextInputProps = TextInputProps & {
    style? : StyleProp<ViewStyle & TextStyle>, inputRef? : RefObject<TextInput> | null, children : ReactNode
}

export default function MyTextInput({
    style,
    onChangeText,
    onFocus,
    onBlur,
    onSubmitEditing,
    value,
    autoCorrect,
    autoCapitalize,
    placeholder,
    placeholderTextColor = appStyle.placeholderColor,
    secureTextEntry,
    keyboardType,
    multiline,
    editable = true,
    inputRef = null,
    children,
} : MyTextInputProps) {

    const styleObject = (StyleSheet.flatten(style) ?? {}) as ViewStyle & TextStyle

    const { minHeight, paddingTop, paddingBottom, width, height, maxHeight, maxWidth, borderRadius, marginTop, paddingHorizontal, borderColor, borderWidth, borderBottomWidth, borderBottomColor, backgroundColor, paddingLeft, paddingRight, ...fontStyle } = styleObject

    const fontSize = styleObject.fontSize ?? 16;
    const lineHeight = Math.round(fontSize * 1.25);

    // Break the text of the placeHolder anywhere
    const breakLongWords = (text : string) =>
        text.toString().replace(/(.{5})/g, "$1\u200B")

    // Conditionnal ref
    const internalRef = useRef<TextInput>(null);
    const finalInputRef = inputRef ?? internalRef;

    // Registration of the focus state
    const [isFocus, setIsFocus] = useState(false)

    // On android we display a text overlay so when the input is not focused, the text start from the left
    const android = Platform.OS === "android"
    const showTextOverlay = !!(android && !isFocus && value)
    // There is an automatic text input padding (in addition to the one in style) on android
    const textInputInset = android ? 1.5 : 0


    return (
        <View style={[styles.mainContainer, styleObject?.marginTop !== undefined && { marginTop: styleObject?.marginTop }]}
        >

            {/* Display of a custom place holder (layout and breaking words problems with the native one) or a text with the input value (so it starts from left on android) if the input is not focused */}
            <View style={[{
                height: "100%",
                position: "absolute",
                width: width ?? "100%",
                zIndex: 1,
                justifyContent: "center",
                paddingLeft: (paddingLeft ?? paddingHorizontal ?? 0) as number + textInputInset,
                paddingRight: (paddingRight ?? paddingHorizontal ?? 0) as number + textInputInset,
                paddingHorizontal: undefined,
                pointerEvents: "none",
            }]}
            >

                {/* custom placeholder */}
                {!value &&
                    <Text style={[fontStyle,
                        {
                            color: placeholderTextColor,
                            fontWeight: "500",
                            fontSize,
                            lineHeight,
                        }]}
                        numberOfLines={multiline ? undefined : 1}
                    >
                        {placeholder && (multiline ? placeholder : breakLongWords(placeholder))}
                    </Text>
                }

                {/* text starting on it's left on android*/}
                {showTextOverlay &&
                    <Text
                        numberOfLines={multiline ? undefined : 1}
                        style={{ ...fontStyle, fontSize, lineHeight, textAlignVertical : "center" }}
                    >
                        {multiline ? value : breakLongWords(value)}
                    </Text>
                }
            </View>



            <TextInput
                value={value}
                onChangeText={onChangeText}
                onFocus={(e) => {
                    android && setIsFocus(true)
                    typeof onFocus === "function" && onFocus(e)
                }}
                onBlur={(e) => {
                    android && setIsFocus(false)
                    typeof onBlur === "function" && onBlur(e)
                }}
                onSubmitEditing={onSubmitEditing}
                ref={finalInputRef}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholder="\u200B"
                placeholderTextColor="transparent"
                textAlignVertical="center"
                multiline={multiline ?? false}
                numberOfLines={multiline ? undefined : 1}
                editable={editable}
                style={[styleObject, { fontSize, lineHeight, marginTop: 0, paddingLeft: paddingLeft ?? paddingHorizontal ?? 0, paddingRight: paddingRight ?? paddingHorizontal ?? 0, paddingHorizontal: undefined }, showTextOverlay && {
                    color: "rgba(0,0,0,0.01)",
                    textShadowColor: "rgba(0,0,0,1)",
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 0,
                }]}
            />


            {children &&
                [children]
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "flex-start",
    },
})