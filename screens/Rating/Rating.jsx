import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'
import OrderCard from '../Order/OrderCard';
import { Ionicons } from '@expo/vector-icons';
import RatingModal from './RatingModal';

const Rating = () => {
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

  return (
      <View style={styles.container}>
        <HeaderNav title='Rating'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <OrderCard/>
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