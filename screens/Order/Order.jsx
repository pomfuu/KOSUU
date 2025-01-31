import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Easing, LogBox } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Font from 'expo-font';
import HeaderNav from '../../navigation/HeaderNav';

import OrderPacked from './OrderPacked';
import OrderSent from './OrderSent';
import OrderCompleted from './OrderCompleted';
import OrderCanceled from './OrderCanceled';

LogBox.ignoreLogs([
  'Text strings must be rendered within a Text component',
]);

const Order = () => {
  const [index, setIndex] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [routes] = useState([
    { key: 'packed', title: 'Packed' },
    { key: 'sent', title: 'Sent' },
    { key: 'completed', title: 'Completed' },
    { key: 'canceled', title: 'Canceled' },
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = []; 
      setOrderData(orders);
    };

    fetchOrders();
  }, []);

  const CustomTabBar = (props) => (
    <View style={styles.customTabBar}>
      {props.navigationState.routes.map((route, i) => {
        const focused = i === props.navigationState.index;
        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => props.jumpTo(route.key)}
            style={[
              styles.tab,
              { borderBottomColor: focused ? '#1A47BC' : 'transparent' },
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={{
                fontFamily: 'afacad_Bold',
                fontSize: 16,
                color: focused ? '#1A47BC' : '#8BA0D8',
                textAlign: 'center',
              }}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
  

  const renderScene = SceneMap({
    packed: OrderPacked,
    sent: OrderSent,
    completed: OrderCompleted,
    canceled: OrderCanceled,
  });

  return (
    <View style={styles.container}>
      <HeaderNav title="My Order" />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => <CustomTabBar {...props} />}
          transitionSpec={{
            open: { animation: 'timing', config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
            close: { animation: 'timing', config: { duration: 300, easing: Easing.inOut(Easing.ease) } },
          }}
          lazy
          gestureHandlerProps={{
            swipeVelocityImpact: 0.3,
            overshootClamping: true,
          }}
        />;
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  tabBar: {
    backgroundColor: '#FFFFFC',
  },
  indicator: {
    backgroundColor: '#1A47BC',
    height: 2,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'afacad_Bold',
  },
  scrollTabBar: {
    flexDirection: 'row',
  },
  customTabBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFC',
  },
  tab: {
    marginLeft: 3,
    minWidth: 94,
    paddingVertical: 10,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
});
