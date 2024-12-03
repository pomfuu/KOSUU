import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Container from '../../styles/Container';
import HeaderNav from '../../navigation/HeaderNav';
import OrderImage from '../../assets/KOSU/Card1.png'; 
import { collection, query, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../dbconfig';
import { useAuth } from '../../authcontext';
import { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();

  const fetchCartItems = async (userId) => {
    try {
      // Reference to the user's cart subcollection-
      const cartRef = collection(db, 'Users', userId, 'Cart');
      const q = query(cartRef); 
      const querySnapshot = await getDocs(q);

      // Extract cart data
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(), 
      }));

      setCartItems(items); 
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  // Function ini cuman dipake, buat user yang baru pertama kali masukin barang ke shopping cart atau kalau shopping cartnya masih kosong!
  const subscribeToCartItems  = (userId) => {
    const cartRef = collection(db, 'Users', userId, 'Cart');
    const q = query(cartRef);
    const getItem = onSnapshot(q, (querySnapshot) => {
      const updatedItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(updatedItems);
    });
    return getItem;
  };

  useEffect(() => {
    if (user) {
      fetchCartItems(user.uid);
      const unsubscribe = subscribeToCartItems(user.uid); 
      
      return () => unsubscribe(); // Unsubscribe untuk stop update data setelah data cart ditampilin
    }
  }, [user]);

  return (
    
    <View style={styles.container}>
      <HeaderNav title='My Cart'/>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Container>
        <SafeAreaView>
          <View>
            <Text style={styles.cartTitle}>Cart Items</Text>
            <Text style={styles.totalItemsText}>Total {cartItems.length} Items</Text>
            
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                {/* <Text style={styles.store}>Store Name</Text> */}
                <View style={styles.itemRow}>
                  <Image source={{ uri: item.productImage }} style={styles.image} /> 
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.productName}</Text>
                    {item.selectedSize && <Text style={styles.itemInfo}>Size: {item.selectedSize}</Text>}
                    {item.selectedColor && <Text style={styles.itemInfo}>Color: {item.selectedColor}</Text>}
                    {item.selectedVariant && <Text style={styles.itemInfo}>Variant: {item.selectedVariant}</Text>}
                    <Text style={styles.itemInfo}>Qty : {item.quantity}</Text>
                    <Text style={styles.itemPrice}>Subtotal : Rp{Number(item.productPrice * item.quantity).toLocaleString()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          </SafeAreaView>
        </Container>
      </ScrollView>
    </View>
    
  )
}

export default Cart

const styles = StyleSheet.create({
  image: {
    width: 120, 
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain', 
  },
  
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
    paddingBottom: 150
  },
  cartTitle: {
    fontSize: 16, 
    fontFamily: 'afacad_Bold', 
    color:'#1A47BC'
  },
  totalItemsText: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium', 
    color:'#8E8E8D', 
    marginTop: 5
  },
  store: {
    fontSize: 14,
    fontFamily: 'afacad_Medium',
    marginTop: 10,
    marginBottom: 5
  },
  itemContainer: {
    marginBottom: 15
  },
  itemRow: {
    flexDirection:'row', 
    marginTop: 10, 
    gap: 10,
  },
  itemDetails: {
    position:'relative'
  },
  itemName: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium'
  },
  itemInfo: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium', 
    color:'#8E8E8D', 
    marginTop: 5
  },
  itemPrice: {
    fontSize: 18, 
    fontFamily: 'afacad_Bold', 
    color:'#1A47BC', 
    marginTop: 0
  }
});