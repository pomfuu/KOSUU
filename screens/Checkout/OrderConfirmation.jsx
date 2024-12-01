import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import yay from '../../assets/KOSU/Icon/yay-face.png'

const OrderConfirmation = () => {
  const navigation = useNavigation();

  const handleGoToOrder = () => {
    navigation.navigate('Order')
  }

  return (
      <View style={styles.container}>
        <Image
            source={yay}
            style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color:'#FBFAF5', marginTop: 15 }}>Thank you for placing an order!</Text>
        <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color:'#FBFAF5' }}>Check order page to see your order status</Text>
        <TouchableOpacity onPress={handleGoToOrder} style={{ backgroundColor:'#FBFAF5', paddingVertical: 10, paddingHorizontal: 35, borderRadius: 15, marginTop: 15 }}>
            <Text style={{ fontFamily: 'afacad_Bold', fontSize: 16, color:'#1A47BC' }}>Go to my order</Text>
        </TouchableOpacity>
      </View>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A47BC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
});