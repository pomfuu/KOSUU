import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Cart, Order, Profile, Wishlist } from "../screens";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
  },
};

const ButtonTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{ 
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused? "home" : "home-outline"}
                size={24}
                color={focused? '#FEC904' : '#FBFAF5'}
                ></Ionicons>
            }
        }} 
      />
      <Tab.Screen 
        name="Wishlist" 
        component={Wishlist}
        options={{ 
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused? "star" : "star"}
                size={24}
                color={focused? '#FEC904' : '#FBFAF5'}
                ></Ionicons>
            }
        }} 
      />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default ButtonTabNavigation;
