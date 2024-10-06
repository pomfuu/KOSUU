import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderNav from '../navigation/HeaderNav'
import Container from '../styles/Container'
import { useRoute } from '@react-navigation/native'

const CardDetail = () => {
    const route = useRoute();
    const {name, category, price, image} = route.params;
    
    return (
      <View style={styles.container}>
      <HeaderNav title={name}/>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
          <View>
            <Image style={styles.productImage} source={image} />
          </View>
      </ScrollView>
    </View>
    )
  }
  
  export default CardDetail
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FBFAF5',
    },
    scrollContainer: {
      backgroundColor: '#FBFAF5',
      padding: 10,
    },
    productImage: {
        width: '100%',
        height: 380,
        borderRadius: 5,
    }
  });