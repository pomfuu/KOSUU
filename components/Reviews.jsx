import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard'
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../dbconfig';

const Reviews = ({product}) => {
  const [reviewItems, setReviewItems] = useState([]);

  const fetchReviews = async (productID) => {
    try {
      const cartRef = collection(db, 'Products', productID, 'Rating');
      const q = query(cartRef);
      const querySnapshot = await getDocs(q);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviewItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchReviews(product.id);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 21, fontFamily: 'afacad_Medium', color:'#1A47BC', marginBottom: 10, }}>Reviews</Text>
      {reviewItems.map((item) => (
        <ReviewCard
          key={item.id}
          name={item.name}
          profileImage={item.profileImage} 
          review={item.review}
        />
      ))}
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
    wrapper:{
        marginTop: 20,
    },
  });