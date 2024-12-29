import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../config';
import { ref, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, query, getDocs, setDoc, collection, addDoc, where, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../authcontext';

const Card = ({ id, showHeader, category, name, price, rating, description, stock, material, sizeChart, dimension, condition, notes, variant, size, color, imageURL }) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleCardPressed = () => {
    navigation.navigate('CardDetail', { 
      id,
      name, 
      category, 
      price, 
      image: imageUrl, 
      rating, 
      description, 
      stock, 
      material, 
      sizeChart, 
      dimension, 
      condition, 
      notes, 
      variant, 
      size, 
      color 
    });
  };
  
  const [isLiked, setIsLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const toggleWishlist = async () => {

    try {
      //Cari subcollection Wishlist dari Users
      const wishlistRef = collection(doc(db, 'Users', user.uid), 'Wishlist');
  
      //Tambahin ke variabel itemDetails dulu untuk barang yang mau di wishlist
      const newWishlistItem = {
        productID: id,
        productName: name,
        productImage: imageUrl,
        productPrice: price,
      };
  
      // Cek dulu udah di wishlist apa belom
      const existingItemQuery = query(wishlistRef, where('productID', '==', id));
      const existingItemsSnapshot = await getDocs(existingItemQuery);
  
      const existingItem = existingItemsSnapshot.docs.find(doc => doc.data().productID === id);
      
      if (!existingItemsSnapshot.empty) {
        console.log('Item already in wishlist. Removing it.');
        const itemDoc = existingItemsSnapshot.docs[0];
        await deleteDoc(itemDoc.ref);
        setIsLiked(false);
      } else {
        await addDoc(wishlistRef, newWishlistItem);
        setIsLiked(true);
        console.log('Item added to wishlist');
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }

  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, imageURL); 
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image from Firebase:", error);
      }
    };
    fetchImage();
  }, []);

  //Next
  useEffect(() => {
    if (!user) return; //kalau ternyata error user belom login, batal

    const checkWishlist = async () => {
      try {
        const wishlistRef = collection(doc(db, 'Users', user.uid), 'Wishlist');
        const existingItemQuery = query(wishlistRef, where('productID', '==', id));
        const existingItemsSnapshot = await getDocs(existingItemQuery);

        // Kalau product ada di database wishlist, tombol wishlistnya jadi true
        if (!existingItemsSnapshot.empty) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
      }
    };

    checkWishlist();
  }, [user, id]);

  return (
    <View>
      {showHeader && <Text style={styles.textHeader}>Popular items</Text>}
      
      <TouchableOpacity style={styles.card} onPress={handleCardPressed}>
        <View style={styles.imageWrapper}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text>Loading...</Text>
          )}
          <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
            <Icon 
              name={isLiked ? "heart" : "heart-o"} 
              size={20} 
              color="#EC2A00" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.description}>{category}</Text>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>Rp. {price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginRight: 5,
    backgroundColor: '#FFFFFC',
    borderRadius: 10,
    width: 170,
    overflow: 'hidden',
    marginTop: 5,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  wishlistButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FBFAF5',
    borderRadius: 50,
    padding: 8,
  },
  details: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'afacad_Bold',
    marginBottom: 5, 
  },
  price: {
    fontSize: 16,
    fontFamily: 'afacad_Bold',  
    marginBottom: 5, 
    color: '#1A47BC',
  },
  description: {
    fontSize: 12,
    fontFamily: 'afacad_Bold',
    color: '#8E8E8D',
  },
  textHeader: {
    color: '#1A47BC',
    fontSize: 16,
    fontFamily: 'afacad_Bold',
    marginTop: 10,
    marginBottom: 10,
  }
});
