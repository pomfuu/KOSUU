import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CardImage from '../assets/KOSU/Card1.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({name, price, category}) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleWishlist = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={CardImage} style={styles.image} />
          <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
            <Icon 
              name={isLiked ? "heart" : "heart-o"} 
              size={20} 
              color={isLiked ? "#EC2A00" : "#EC2A00"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.description}>{category}</Text>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
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
  }
});
