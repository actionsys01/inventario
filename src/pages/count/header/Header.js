import React, { useCallback } from "react";
import {
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  BackHandler,
} from "react-native";
import {
  StyledHeader,
  TitleHeader,
  ContainerImage,
  ContainerButtonHeader,
} from "./Header.styled";
import Constants from "expo-constants";
import { useAuth } from "../../../contexts/AuthProvider";
import { useFilter } from "../../../contexts/FilterProvider";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? Constants.statusBarHeight : Constants.statusBarHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "#1D4A71",
  },
});

export default function Header() {
  const { signOut } = useAuth();
  const { filters } = useFilter();
  const navigation = useNavigation();

  //caso o usuario pressione o botao de voltar, sera apresentado
  //o modal informando o alert abaixo
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleLogout();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  function handleLogout() {
    Alert.alert(
      "Deslogar do aplicativo",
      "Deseja deslogar do aplicativo?",
      [
        {
          text: "Sim",
          onPress: () => signOut(),
          style: "cancel",
        },
        { text: "Não", onPress: () => {} },
      ],
      { cancelable: false }
    );
  }

  return (
    <>
      <View style={styles.statusBar} />
      <StyledHeader>
        <TouchableOpacity onPress={handleLogout}>
          <ContainerButtonHeader>
            <MaterialCommunityIcons name="logout" size={24} color="#fff" />
            <Text style={{ color: "#fff" }}>sair</Text>
          </ContainerButtonHeader>
        </TouchableOpacity>
        <ContainerImage>
          <Image
            source={require("../../../../assets/images/inventario.png")}
            style={{ width: 30, height: 30 }}
          />
          <TitleHeader>Inventário</TitleHeader>
        </ContainerImage>

        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <ContainerButtonHeader>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color="#fff"
            />
            <Text style={{ color: "#fff" }}>
              {filters.length > 0 ? "Filtro aplic." : "Filtros"}
            </Text>
          </ContainerButtonHeader>
        </TouchableOpacity>
      </StyledHeader>
    </>
  );
}
