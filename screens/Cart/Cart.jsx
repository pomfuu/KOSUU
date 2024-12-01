import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Container from '../../styles/Container';
import HeaderNav from '../../navigation/HeaderNav';
import CartCard from './CartCard';
import CartCheckout from './CartCheckout';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Klee Dodoco Named', size: 'One Size', color: 'One Color', price: 259000 },
    { id: 2, name: 'Another Product', size: 'Medium', color: 'Blue', price: 199000 },
  ]);

  const handleDelete = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <HeaderNav title="My Cart" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Container>
          <View>
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Cart Items</Text>
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D', marginTop: 5 }}>
              Total {cartItems.length} Items
            </Text>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </View>
          <CartCheckout/>
        </Container>
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 5,
  },
});
