import { View, Text } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Cart, Order, Profile, Wishlist } from '../screens';
import HomeIcon from '../assets/KOSU/Icon/home.svg';
import WishlistIcon from '../assets/KOSU/Icon/wishlist.svg';
import OrderIcon from '../assets/KOSU/Icon/order.svg';
import CartIcon from '../assets/KOSU/Icon/cart.svg';
import ProfileIcon from '../assets/KOSU/Icon/profile.svg';
import HomeIcon2 from '../assets/KOSU/Icon/home2.svg';
import WishlistIcon2 from '../assets/KOSU/Icon/wishlist2.svg';
import OrderIcon2 from '../assets/KOSU/Icon/order2.svg';
import CartIcon2 from '../assets/KOSU/Icon/cart2.svg';
import ProfileIcon2 from '../assets/KOSU/Icon/profile2.svg';


const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    borderWidth: 0,
    bottom: 25,
    right: 15,
    left: 15,
    elevation: 0,
    height: 70,
    borderRadius: 30,
    backgroundColor: '#1A47BC'
  },
};

const tabIcons = {
  Home: { default: HomeIcon, focused: HomeIcon2, label: 'Home' },
  Wishlist: { default: WishlistIcon, focused: WishlistIcon2, label: 'Wishlist' },
  Order: { default: OrderIcon, focused: OrderIcon2, label: 'Order' },
  Cart: { default: CartIcon, focused: CartIcon2, label: 'Cart' },
  Profile: { default: ProfileIcon, focused: ProfileIcon2, label: 'Profile' }
};

const renderTabIcon = (defaultIcon, focusedIcon, label, focused) => {
  const IconComponent = focused ? focusedIcon : defaultIcon;
  return (
    <View style={{ alignItems: 'center' }}>
      <IconComponent marginTop={30} width={24} height={24} color={focused ? '#FEC904' : '#FBFAF5'} />
      <Text style={{ marginTop: 1, color: focused ? '#FEC904' : '#FBFAF5', fontSize: 12, fontFamily: 'afacad_Medium' }}>
        {label}
      </Text>
    </View>
  );
};

const ButtonTabNavigation = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: 'afacad_Medium' };
  
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {Object.entries(tabIcons).map(([name, { default: defaultIcon, focused: focusedIcon, label }]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={{ Home, Wishlist, Order, Cart, Profile }[name]}
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon(defaultIcon, focusedIcon, label, focused)
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default ButtonTabNavigation;
