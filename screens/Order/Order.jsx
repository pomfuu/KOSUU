import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Container from '../../styles/Container';
import HeaderNav from '../../navigation/HeaderNav';

const Packed = () => (
  <Container>
    <View style={styles.frame}>
      <Text style={styles.text}>Packed Orders</Text>
    </View>
  </Container>
);

const Sent = () => (
  <Container>
    <View style={styles.frame}>
      <Text style={styles.text}>Sent Orders</Text>
    </View>
  </Container>
);

const Completed = () => (
  <Container>
    <View style={styles.frame}>
      <Text style={styles.text}>Completed Orders</Text>
    </View>
  </Container>
);

const Canceled = () => (
  <Container>
    <View style={styles.frame}>
      <Text style={styles.text}>Canceled Orders</Text>
    </View>
  </Container>
);

const Order = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'packed', title: 'Packed' },
    { key: 'sent', title: 'Sent' },
    { key: 'completed', title: 'Completed' },
    { key: 'canceled', title: 'Canceled' },
  ]);

  const renderScene = SceneMap({
    packed: Packed,
    sent: Sent,
    completed: Completed,
    canceled: Canceled,
  });

  return (
    <View style={styles.container}>
      <HeaderNav title="My Order" />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              activeColor="#1e1e1e"
              inactiveColor="#8BA0D8" 
              renderLabel={({ route, focused }) => (
                <Text
                  style={[
                    styles.label,
                    {
                      color: focused ? '#1A47BC' : '#8BA0D8',
                      fontFamily: 'afacad_Medium',
                    },
                  ]}
                >
                  {route.title}
                </Text>
              )}
            />
          )}
        />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  frame: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: '#1A47BC',
    textAlign: 'center',
  },
  tabBar: {
    backgroundColor: '#FFFFFC',
    color: '#1A47BC'
  },
  indicator: {
    backgroundColor: '#1A47BC',
    height: 2,
    borderRadius: 15,
  },
  label: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium',
  },
});
