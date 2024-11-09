import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../styles/Container'
import WishlistCard from './WishlistCard'
import HeaderNav from '../../navigation/HeaderNav'

const Wishlist = () => {
  return (
      <View style={styles.container}>
        <HeaderNav title='Wishlist'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Container>
            <View>
              <WishlistCard/> 
            </View>
          </Container>
        </ScrollView>
      </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
});