import React from "react";
import Count from "../pages/count/Count";
import { StyleSheet, Image, View, Text } from "react-native";
import Filter from "../pages/filter/Filter";
import Detail from "../pages/detail/Detail";
import CreateCount from "../pages/createCount/CreateCount";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const styles = StyleSheet.create({
  title: { color: "#fff", fontWeight: "bold", fontSize: 18, marginLeft: 5 },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

function Home({ state }) {
  const AuthTab = createBottomTabNavigator();
  return (
    <AuthTab.Navigator
      initialRouteName="Count"
      tabBarOptions={{
        activeTintColor: "#1D4A71",
        inactiveTintColor: "#757575",
        style: { backgroundColor: "#C5C4C4", height: 60 },
        tabStyle: {
          padding: 5,
        },
      }}
    >
      <AuthTab.Screen
        name="Count"
        component={Count}
        options={{
          tabBarLabel: "Contagem",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="box"
              size={30}
              color={focused ? "#1D4A71" : "#757575"}
            />
          ),
        }}
      />
      <AuthTab.Screen
        name="CreateCount"
        component={CreateCount}
        options={{
          title: "CRIAR CONTAGEM",
          tabBarLabel: "Criar Lista",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="file-document-box-outline"
              size={30}
              color={focused ? "#1D4A71" : "#757575"}
            />
          ),
        }}
      />
    </AuthTab.Navigator>
  );
}
export default function AuthRoutes() {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator initialRouteName="Dashboard" mode="card">
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "CICLO",
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
      <AuthStack.Screen
        name="Filter"
        component={Filter}
        options={{
          title: "FILTROS",
          headerStyle: {
            backgroundColor: "#1D4A71",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            letterSpacing: 2.8,
          },
        }}
      />
    </AuthStack.Navigator>
  );
}
