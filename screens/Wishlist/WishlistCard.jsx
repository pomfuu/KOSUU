import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authcontext';
import { query, getDocs, where, deleteDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../dbconfig';

const WishlistCard = ({productID, productName, productPrice, productImage}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const toggleWishlist = async () => {
    try {
      const wishlistRef = collection(doc(db, 'Users', user.uid), 'Wishlist');
      const existingItemQuery = query(wishlistRef, where('productID', '==', productID));
      const existingItemsSnapshot = await getDocs(existingItemQuery);
      
      if (!existingItemsSnapshot.empty) {
        const itemDoc = existingItemsSnapshot.docs[0];
        await deleteDoc(itemDoc.ref);
        setIsLiked(false);
        console.log('Item removed from wishlist');
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      if (user) {
        try {
          const wishlistRef = collection(doc(db, 'Users', user.uid), 'Wishlist');
          const existingItemQuery = query(wishlistRef, where('productID', '==', productID));
          const existingItemsSnapshot = await getDocs(existingItemQuery);
          setIsLiked(!existingItemsSnapshot.empty); 
        } catch (error) {
          console.error(error);
        }
      }
    };

    checkWishlist();
  }, [user, productID]);

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: productImage}} style={styles.ImageWl} />
      <View style={styles.placeholder}>
        <Text style={{fontFamily: 'afacad_Bold', fontSize: 16}}>{productName}</Text>
        <Text style={{fontFamily: 'afacad_Medium', fontSize: 14, color: '#8E8E8D'}}>Store Name</Text>
        <Text style={{fontFamily: 'afacad_Medium', fontSize: 16, color: '#1A47BC', marginTop: 5,}}>Rp {productPrice}</Text>
        <TouchableOpacity onPress={toggleWishlist} style={styles.button}>
          <Text style={{color: '#FBFAF5', fontFamily: 'afacad_Medium', fontSize: 14, textAlign: 'center'}}>
            {isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  placeholder: {
    paddingLeft: 15,
    flex: 1,
  },
  ImageWl: {
    height: 115,
    width: 115,
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#1A47BC',
    paddingVertical: 8,
    width: '70%',
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 15,
  }
});
