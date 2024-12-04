import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import empty from '../../assets/KOSU/Icon/SearchNone.png';

const SearchEmpty = () => {
  return (
    <View style={styles.container}>
      <Image source={empty} style={styles.image} />
    </View>
  );
};

export default SearchEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFAF5',
  },
  image: {
    width: 150, 
    height: 150,
    resizeMode: 'contain', 
  },
});
