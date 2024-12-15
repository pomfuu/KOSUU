import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Container from '../../styles/Container'
import WishlistCard from './WishlistCard'
import HeaderNav from '../../navigation/HeaderNav'
import { db } from '../../dbconfig';
import { useAuth } from '../../authcontext';
import { onSnapshot, collection, query, getDocs, where } from 'firebase/firestore';

const Wishlist = () => {

  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth(); //Cek user yg login

  const fetchWishlistItems = async (userId) => {
    const wishlistRef = collection(db, 'Users', userId, 'Wishlist');
    const q = query(wishlistRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Wishlist items fetched:", items);
      setWishlistItems(items);
    });
  
    return unsubscribe;
  };

  useEffect(() => {
    if (user) {
      console.log("User UID:", user.uid); 
  
      const unsubscribe = fetchWishlistItems(user.uid);
  
      return () => unsubscribe;
    }
  }, [user]);

  

  return (
      <View style={styles.container}>
        <HeaderNav title='Wishlist'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Container>
            <View>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <View key={item.id}>
                  <WishlistCard 
                    productID={item.productID}
                    productName={item.productName}
                    productPrice={item.productPrice}
                    productImage={item.productImage}
                  />
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Your wishlist is empty.</Text>
            )}
          </View>
          </Container>
        </ScrollView>
      </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
});