import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'
import OrderCard from '../Order/OrderCard';
import { Ionicons } from '@expo/vector-icons';
import RatingModal from './RatingModal';
import { useRoute } from '@react-navigation/native';

const Rating = () => {
  const route = useRoute(); // Retrieve data passed during navigation
  const { orderId, product } = route.params || {}; // Destructure orderId and product

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [modal, setModal] = useState(false);

  const handleRate = (idx) =>{
    setRating(idx);
  }

  const handleInputLength = (rev) => {
    if (rev.length <= 150) {
      setReview(rev);
    } else {
      setReview(rev.slice(0, 150));
    }
  };

  const handleSubmit = () =>{
    setModal(true)
  }

  const orderData = {
    id: orderId,
    product: [product],
  };

  console.log(product.productImage);

  return (
      <View style={styles.container}>
        <HeaderNav title='Rating'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
          <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>
            Order ID: {orderId}
          </Text>
          <View style={{ marginTop: 10, flexDirection: 'row', gap: 10 }}>
            {/* Product Image */}
            <Image source={{ uri: 'https://owcdn.net/img/675ec12e7ed1c.jpg' }} style={styles.image} />

            {/* Product Details */}
            <View>
              <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium' }}>
                {product.productName || 'No Name'}
              </Text>
              {product.selectedSize && (
                <Text style={styles.detailText}>Size: {product.selectedSize}</Text>
              )}
              {product.selectedColor && (
                <Text style={styles.detailText}>Color: {product.selectedColor}</Text>
              )}
              <Text style={styles.detailText}>Qty: {product.quantity || 1}</Text>
              <Text style={styles.priceText}>
                Rp{product.productPrice?.toLocaleString() || '0'}
              </Text>
            </View>
          </View>
        </View>

          <View style={{marginTop: 15}}>
             <View>
              <Text style={{fontSize: 18, fontFamily: 'afacad_Bold', color:'#1A47BC', marginLeft: 15,}}>Give your Rating</Text>
              <View style={styles.rateContainer}>
                {Array.from({length: 5}, (_,idx) => (
                  <TouchableOpacity key={idx} onPress={() => handleRate(idx+1)}>
                    <Ionicons 
                    name="star"
                    size={30}
                    color={idx < rating ? '#FEC904' : '#D9D9D9'}
                    style={{marginHorizontal: 4}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{padding: 15, marginTop: 10,}}>
                <TextInput
                style={styles.review}
                placeholder='Write your review here...'
                placeholderTextColor='#8E8E8D'
                fontSize= {16}
                fontFamily='afacad_Medium'
                multiline={true}
                textAlignVertical='top'
                value={review}
                color='#1A47BC'
                onChangeText={handleInputLength}
                />
                <Text style={{ fontFamily:'afacad_Medium' ,marginTop: 10, fontSize: 16, color: '#587BCF', textAlign:'right' }}>
                  {review.length}/150 characters
                </Text>
              </View>
              <TouchableOpacity style={[styles.button, {backgroundColor: rating > 0 ? '#1A47BC' : '#D9D9D9'}]} onPress={rating > 0? handleSubmit : null} disabled={rating === 0}> 
                  <Text style={styles.buttonText} animationType="fade">Submit Review</Text>
              </TouchableOpacity> 
              <RatingModal modal={modal} setModal={setModal}/>
             </View>
          </View>
        </ScrollView>
      </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  review:{
    backgroundColor:'#EBF3FA',
    padding: 20,
    borderRadius: 5,
    height: 150,
  },
  rateContainer:{
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
  button:{
    backgroundColor: '#1A47BC',
    borderRadius: 20,
    width: '95%',
    alignSelf: 'center'
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'afacad_SemiBold',
    color: '#FBFAF5',
    padding: 15,
}
});