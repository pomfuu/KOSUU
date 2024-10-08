import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import w1 from '../../assets/KOSU/Card1.png';

const WishlistCard = () => {
  return (
    <View style={styles.wrapper}>
      <Image source={w1} style={styles.ImageWl}/>
      <View style={styles.placeholder}>
        <Text style = {{fontFamily: 'afacad_Bold', fontSize: 16}}>Wishlist Title Placeholder</Text>
        <Text style = {{fontFamily: 'afacad_Medium', fontSize: 14, color: '#8E8E8D'}}>Store Name</Text>
        <Text style = {{fontFamily: 'afacad_Medium', fontSize: 16, color: '#1A47BC', marginTop: 5,}}>Rp1000000</Text>
        <TouchableOpacity style={styles.button}>
            <Text style ={{color: '#FBFAF5', fontFamily: 'afacad_Medium', fontSize: 14, textAlign: 'center',}}>Remove from wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WishlistCard

const styles = StyleSheet.create({
    wrapper:{
      flexDirection: 'row',
      marginBottom: 5,
    },
    placeholder:{
      paddingLeft: 15,
      flex: 1,
    },
    ImageWl:{
        height: 115,
        width: 115,
        borderRadius: 5,
        overflow: 'hidden',
    },
    button:{
      backgroundColor: '#1A47BC',
      paddingVertical: 8,
      width: '70%',
      borderRadius: 5,
      textAlign: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      left:15,
    }
})