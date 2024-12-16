import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import w1 from '../../assets/KOSU/Card1.png';
import { useAuth } from '../../authcontext';
import { onSnapshot, collection, query, getDocs, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../dbconfig';

const WishlistCard = ({productID, productName, productPrice, productImage}) => {

  const { user } = useAuth();
  const toggleWishlist = async () => {

    try {
      //Cari subcollection Wishlist dari Users
      const wishlistRef = collection(doc(db, 'Users', user.uid), 'Wishlist');
  
      // Cek dulu udah di wishlist apa belom
      const existingItemQuery = query(wishlistRef, where('productID', '==', productID));
      const existingItemsSnapshot = await getDocs(existingItemQuery);
      
      const itemDoc = existingItemsSnapshot.docs[0];
      await deleteDoc(itemDoc.ref);

      const updatedItemsSnapshot = await getDocs(existingItemQuery); // Re-run the query
    if (updatedItemsSnapshot.empty) {
      setIsLiked(false); // If the item is not in the wishlist, set `isLiked` to false
    }
    
    //Error
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: productImage}} style={styles.ImageWl}/>
      <View style={styles.placeholder}>
        <Text style = {{fontFamily: 'afacad_Bold', fontSize: 16}}>{productName}</Text>
        <Text style = {{fontFamily: 'afacad_Medium', fontSize: 14, color: '#8E8E8D'}}>Store Name</Text>
        <Text style = {{fontFamily: 'afacad_Medium', fontSize: 16, color: '#1A47BC', marginTop: 5,}}>Rp {productPrice}</Text>
        <TouchableOpacity onPress={toggleWishlist} style={styles.button}>
            <Text style ={{color: '#FBFAF5', fontFamily: 'afacad_Medium', fontSize: 14, textAlign: 'center',}}>Remove from wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WishlistCard

const styles = StyleSheet.create({
    wrapper:{
      flexDirection: 'row',
      marginBottom: 5,
    },
    placeholder:{
      paddingLeft: 15,
      flex: 1,
    },
    ImageWl:{
        height: 115,
        width: 115,
        borderRadius: 5,
        overflow: 'hidden',
    },
    button:{
      backgroundColor: '#1A47BC',
      paddingVertical: 8,
      width: '70%',
      borderRadius: 5,
      textAlign: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      left:15,
    }
})