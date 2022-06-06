import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  Text,
  Platform,
} from "react-native";
import ButtonGoBack from "../buttonGoBack/ButtonGoBack";
import Modals from "react-native-modal";
import { StatusBar } from "expo-status-bar";
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonClose: {
    width: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0,0, 0.5)",
    position: "absolute",
  },
  modal: {
    bottom: 0,
    position: "absolute",
    height: "60%",
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    justifyContent: "space-between",
  },
});

/**
 *
 * @param {*} show - hide/show modal
 * @param {*} close -  funcao que fecha o modal
 * @param {*} children - componente filho
 */
export default function Modal({ show, close, children }) {
  const [isModalVisible, setIsModalVisible] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(height),
    modal: new Animated.Value(height),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(isModalVisible.container, { toValue: 0, duration: 100 }),
      Animated.timing(isModalVisible.opacity, { toValue: 1, duration: 300 }),
      Animated.spring(isModalVisible.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(isModalVisible.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(isModalVisible.opacity, { toValue: 0, duration: 300 }),
      Animated.timing(isModalVisible.container, {
        toValue: height,
        duration: 100,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Modals
      isVisible={show}
      style={{ margin: 0, justifyContent: "flex-end" }}
      avoidKeyboard={true}
      onBackButtonPress={close}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" style="light" translucent />

      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: isModalVisible.modal }],
          },
        ]}
      >
        <View style={styles.buttonClose}>
          <ButtonGoBack onPress={close} color="#757575" />
        </View>
        {children}
      </Animated.View>
    </Modals>
  );
}
