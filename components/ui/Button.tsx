import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { appStyle } from '@styles/appStyle';


// TYPES

type ButtonProps = {
  func: () => void;
  text: string;
  border?: ViewStyle;
  color?: TextStyle["color"];
  fontWeight?: TextStyle["fontWeight"];
  style?: ViewStyle;
  fontStyle?: TextStyle;
}

export default function Button({ func, text, border, color = appStyle.fontColorDarkBg, fontWeight = "500", style, fontStyle } : ButtonProps) {
  return (
    <TouchableOpacity style={[
      appStyle.button,
      appStyle.regularItem,
      border ? border : {},
      { backgroundColor: !border ? appStyle.strongRed : "transparent" },
      style && style,
    ]}
      onPress={func} activeOpacity={0.6}
    >
      <Text style={[
        appStyle.regularText,
        { color, fontWeight, textAlign: "center" },
        fontStyle && fontStyle
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}