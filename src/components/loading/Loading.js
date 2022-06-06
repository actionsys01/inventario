import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { Text, View, StyleSheet, Animated } from "react-native";
import Logo from "../../../assets/images/logo.svg";
import { StatusBar } from "expo-status-bar";
import { StyledLoading, TextLoading } from "./Loading.styled";

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

/**
 * Componente de loading
 */
export default function Loading() {
  useEffect(() => {}, []);
  return (
    <StyledLoading>
      <StatusBar style="dark" translucent />
      <View style={styles.container}>
        <Logo width={200} height={90} />
        <TextLoading>Carregando informaçoes...</TextLoading>
      </View>
    </StyledLoading>
  );
}
