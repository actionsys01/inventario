import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  Animated,
  useWindowDimensions,
  Keyboard,
  Image,
  Platform,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
export default function WavyHeader() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const window = useWindowDimensions();

  useEffect(() => {
    if (Platform.OS == "ios") {
      Keyboard.addListener("keyboardWillShow", _keyboardDidShow);
      Keyboard.addListener("keyboardWillHide", _keyboardDidHide);

      return () => {
        Keyboard.removeListener("keyboardWillShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardWillHide", _keyboardDidHide);
      };
    } else {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
  }, []);

  const _keyboardDidShow = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };

  return (
    <Animated.View
      style={{
        alignItems: "center",
        opacity: fadeAnim,
      }}
    >
      <HideWithKeyboard>
        <Image
          style={{ height: 180, width: window.width }}
          source={require("./../../../assets/images/login.png")}
        />
      </HideWithKeyboard>
    </Animated.View>
  );
}
