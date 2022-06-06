import React, { useEffect, useState } from "react";
import { View, Keyboard, Animated } from "react-native";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";

/**
 * Componente responsavel por ocultar/apresentar informacoes,
 * caso o teclado esteja aberto
 * @param {*} children - componente filho
 */
const HideInfoWithKeyboard = ({ children }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
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
        opacity: fadeAnim,
      }}
    >
      <HideWithKeyboard>{children}</HideWithKeyboard>
    </Animated.View>
  );
};

export default HideInfoWithKeyboard;
