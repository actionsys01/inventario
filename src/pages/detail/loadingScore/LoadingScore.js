import React from "react";
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
  Text,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import {
  StyledLoadingScore,
  TextLoadingScore,
  ContainerLoadingScore,
} from "./LoadingScore.styled";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
export default function LoadingScore({ show, error, processing }) {
  return (
    <Modal isVisible={show} style={{ margin: 0 }}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" style="light" translucent />
      <ContainerLoadingScore>
        {processing === "NONE" && (
          <ActivityIndicator size="large" color="#fff" />
        )}

        {processing !== "NONE" && (
          <StyledLoadingScore>
            {error ? (
              <FontAwesome5 name="exclamation-circle" size={35} color="#fff" />
            ) : (
              <FontAwesome5 name="check-circle" size={35} color="#fff" />
            )}
            <TextLoadingScore>
              {error ? error : " Contagem realizada com sucesso!"}
            </TextLoadingScore>
          </StyledLoadingScore>
        )}
      </ContainerLoadingScore>
    </Modal>
  );
}
