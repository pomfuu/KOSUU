import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { collection, query, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../dbconfig';
import { useAuth } from '../../authcontext';
import HeaderNav from '../../navigation/HeaderNav';
import CartCard from './CartCard';
import CartCheckout from './CartCheckout';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const { user } = useAuth();

  const fetchCartItems = async (userId) => {
    try {
      const cartRef = collection(db, 'Users', userId, 'Cart');
      const q = query(cartRef);
      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const subscribeToCartItems = (userId) => {
    const cartRef = collection(db, 'Users', userId, 'Cart');
    const q = query(cartRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(updatedItems);
    });
    return unsubscribe;
  };

  const deleteCartItem = async (itemId) => {
    try {
      if (user) {
        const itemRef = doc(db, 'Users', user.uid, 'Cart', itemId);
        await deleteDoc(itemRef);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const updated = { ...prev, [itemId]: !prev[itemId] };
      return updated;
    });
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems[item.id])
    .reduce((total, item) => total + item.productPrice * item.quantity, 0);

  useEffect(() => {
    if (user) {
      fetchCartItems(user.uid);
      const unsubscribe = subscribeToCartItems(user.uid);
      return () => unsubscribe();
    }
  }, [user]);

  const selectedCartItems = cartItems.filter((item) => selectedItems[item.id]);

  return (
    <View style={styles.container}>
      <HeaderNav title="My Cart" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView>
          <View>
            <Text style={styles.cartTitle}>Cart Items</Text>
            <Text style={styles.totalItemsText}>Total {cartItems.length} Items</Text>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                product={item}
                isSelected={selectedItems[item.id] || false}
                onToggleSelect={() => toggleSelectItem(item.id)}
                onDelete={() => deleteCartItem(item.id)}
              />
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
      <CartCheckout totalPrice={totalPrice} showCheckoutButton={totalPrice > 0} selectedItems={selectedCartItems}/>
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
    padding: 10,
    paddingHorizontal: 30,
    marginTop: -15,
  },
  cartTitle: {
    fontSize: 16,
    fontFamily: 'afacad_Bold',
    color: '#1A47BC',
  },
  totalItemsText: {
    fontSize: 16,
    fontFamily: 'afacad_Medium',
    color: '#8E8E8D',
    marginTop: 5,
  },
});
