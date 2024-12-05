import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const CartCheckout = ({ totalPrice, showCheckoutButton, selectedItems  }) => {
  const navigation = useNavigation();

  const handleCheckout = () => {
    console.log('Selected Items:', selectedItems);
    navigation.navigate('Checkout', { product: selectedItems });
  };

  if (!showCheckoutButton) return null

  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>Total: Rp{totalPrice.toLocaleString()}</Text>
      <TouchableOpacity onPress={handleCheckout} style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCheckout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAF5',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'afacad_Bold',
    color: '#1A47BC',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1A47BC',
    paddingHorizontal: 120,
    paddingVertical: 15,
    borderRadius: 15,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FBFAF5',
    fontSize: 16,
    fontFamily: 'afacad_Bold',
    alignSelf:'center'
  },
});
