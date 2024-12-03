import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Container from '../../styles/Container';
import OrderCard from './OrderCard';

const OrderCompleted = () => (
  <Container>
    <View style={styles.frame}>
        <OrderCard isActive={true}/>
    </View>
  </Container>
);

export default OrderCompleted;

const styles = StyleSheet.create({
  frame: {
  },
  text: {
    fontSize: 18,
    color: '#1A47BC',
    textAlign: 'center',
    fontFamily: 'afacad_Medium'
  },
});
