import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../dbconfig';

const Carousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Banner'));
        const bannerData = querySnapshot.docs.map(doc => doc.data().bannerUrl);
        console.log(bannerData);
        setBanners(bannerData.slice(0, 2));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <Swiper
        dotColor="#FBFAF5"
        activeDotColor="#FEC904"
        containerStyle={{ borderRadius: 5, width: '100%', height: 250 }}
      >
        {banners.map((url, index) => (
          <View style={styles.slide} key={index}>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: 170,
    marginTop: 0,
    paddingTop: 0,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
