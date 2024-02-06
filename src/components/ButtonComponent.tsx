import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
  size?: "small" | "medium" | "large";
}

export default function Button({
  title,
  onPress,
  isBlue,
  isGray,
  size,
}: ButtonProps) {
  const theme = useContext(ThemeContext);
  let buttonStyle;

  if (isBlue) {
    buttonStyle = Styles.btnBlue;
  } else if (isGray) {
    buttonStyle = Styles.btnGray;
  } else if (theme === "light") {
    buttonStyle = Styles.btnLight;
  } else {
    buttonStyle = Styles.btnDark;
  }

  let sizeStyle;

  if (size === "large") {
    sizeStyle = Styles.btnLarge;
  } else if (size === "small") {
    sizeStyle = Styles.btnSmall;
  } else {
    sizeStyle = Styles.btnMedium;
  }
  return (
    <TouchableOpacity style={[buttonStyle, sizeStyle]} onPress={onPress}>
      <Text
        style={
          isBlue || isGray
            ? Styles.smallTextLight
            : theme === "dark"
            ? Styles.smallTextLight
            : Styles.smallTextDark
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
