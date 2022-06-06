import React, { useState } from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  Easing,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Botao de voltar com efeito cascata
 * @param  children - componente filho
 * @param  color - cor do botao
 */
export default function ButtonGoBack({ children, color, ...rest }) {
  const [maxOpacity] = useState(0.2);
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0.1));
  const [opacityValue, setOpacityValue] = useState(
    new Animated.Value(maxOpacity)
  );

  function onPressedIn() {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }
  function onPressedOut() {
    Animated.timing(opacityValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setScaleValue(new Animated.Value(0.1));
      setOpacityValue(new Animated.Value(maxOpacity));
    });
  }

  const size = 20;
  const rippleSize = size * 2;
  const containerSize = size * 2;
  const iconContainer = { width: containerSize, height: containerSize };
  return (
    <TouchableWithoutFeedback
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
      {...rest}
    >
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
          },
          iconContainer,
        ]}
      >
        <Animated.View
          style={{
            position: "absolute",
            width: rippleSize,
            height: rippleSize,
            borderRadius: rippleSize / 2,
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
            backgroundColor: "#000",
          }}
        />
        <Ionicons
          name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
          size={25}
          color={color || "#fff"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
