import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import cat1 from '../../assets/KOSU/Home/pCat1.png';
import cat2 from '../../assets/KOSU/Home/pCat2.png';
import cat3 from '../../assets/KOSU/Home/pCat3.png';

const PopularCategories = () => {
  return (
    <View>
      <Text style={styles.textHeader}>Popular Categories</Text>
      <View style={styles.imageWrapper}>
        <ImageBackground source={cat1} style={styles.imageBackground}>
          <Text style={styles.categoryLabel}>Costume Set </Text>
        </ImageBackground>
        <ImageBackground source={cat2} style={styles.imageBackground}>
          <Text style={styles.categoryLabel}>Accesories</Text>
        </ImageBackground>
        <ImageBackground source={cat3} style={styles.imageBackground}>
          <Text style={styles.categoryLabel}>Bags</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default PopularCategories;

const styles = StyleSheet.create({
  textHeader: {
    color: '#1A47BC',
    fontSize: 16, 
    fontFamily: 'afacad_Bold',
    marginTop: 10,
    marginBottom: 5,
  },
  imageWrapper: {
    flexDirection: 'collumn',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  imageBackground: {
    borderRadius: 10,
    width: '100%',
    height: 100,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#FBFAF5',
    backgroundColor: '#1A47BC',
    width: 100,
    paddingVertical: 8,
    textAlign: 'center',
    fontFamily: 'afacad_Medium',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
});
