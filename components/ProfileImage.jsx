import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import CardImage from '../assets/KOSU/Card1.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfPic = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={CardImage} style={styles.cardImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 100, // Set the desired width
    height: 100, // Set the same height
    borderRadius:50, // Half of width/height for circular shape
    overflow: 'hidden', // Optional: to ensure the image stays within the border
  },
});

export default ProfPic