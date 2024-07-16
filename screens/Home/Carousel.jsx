import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import Slider1 from '../../assets/KOSU/Slider1.svg';

const Carousel = () => {
  return (
    <View style={styles.carouselContainer}>
      <Swiper
        dotColor='#FBFAF5'
        activeDotColor='#FEC904'
        containerStyle={{ borderRadius: 5, width: '100%', marginTop: 15 }}
      >
        <View style={styles.slide}>
          <Slider1 width="100%" height="100%" />
        </View>
        <View style={styles.slide}>
          <Slider1 width="100%" height="100%" />
        </View>
      </Swiper>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
