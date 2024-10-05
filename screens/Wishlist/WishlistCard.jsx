import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import w1 from '../../assets/KOSU/Wishlist/w1.png'

const WishlistCard = () => {
  return (
    <View>
      <Image source={w1} style={styles.ImageWl}/>
    </View>
  )
}

export default WishlistCard

const styles = StyleSheet.create({
    ImageWl:{
        height: 115,
        width: 115,
        borderRadius: 5,
        overflow: 'hidden',
    }
})