import React from "react";
import { View, Text } from "react-native";
import ImageNet from "../../../assets/images/network.svg";
import { StatusBar } from "expo-status-bar";
import { StyledNetwork, TitleNetwork, ContainerImage } from "./Network.styled";

/**
 * Componente que sera apresentado caso nao possua internet
 */
export default function Network() {
  return (
    <>
      <StatusBar style="dark" translucent />
      <StyledNetwork>
        <ContainerImage>
          <ImageNet width="350" />
        </ContainerImage>
        <TitleNetwork>Parece que voce está sem conexao</TitleNetwork>
        <Text>Verifique sua internet e tente outra vez</Text>
      </StyledNetwork>
    </>
  );
}
