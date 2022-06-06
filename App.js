import React from "react";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import AuthProvider from "./src/contexts/AuthProvider";
import SettingProvider from "./src/contexts/SettingsProvider";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FilterProvider from "./src/contexts/FilterProvider";
import { decode, encode } from "base-64";
import { setCustomText } from "react-native-global-props";
import { navigationRef } from "./src/services/navigation";
const customTextProps = {
  style: {
    fontSize: 13,
  },
};
setCustomText(customTextProps);

export default function App() {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <SettingProvider>
        <FilterProvider>
          <AuthProvider>
            <StatusBar style="light" translucent backgroundColor="#1D4A71" />
            <Routes />
          </AuthProvider>
        </FilterProvider>
      </SettingProvider>
    </NavigationContainer>
  );
}
