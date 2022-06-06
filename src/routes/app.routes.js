import React from "react";
import Login from "../pages/login/Login";
import UserSettings from "../pages/userSettings/UserSettings";
import { createStackNavigator } from "@react-navigation/stack";

export default function AppRoutes() {
  const AppStack = createStackNavigator();

  return (
    <AppStack.Navigator initialRouteName="Login" mode="card">
      <AppStack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          headerShown: true,
          title: "CONFIGURAÇÕES",
          headerBackTitle: " ",
          headerStyle: {
            backgroundColor: "#1D4A71",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            letterSpacing: 2.8,
          },
        }}
      />
      <AppStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
