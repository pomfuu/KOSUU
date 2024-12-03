import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import profPic from '../assets/KOSU/Profile/pic2.jpg'
import profPic2 from '../assets/KOSU/Profile/profilePicture.png'

const ReviewCard = () => {
  return (
    <View style={{ gap: 10, }}>
        <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
                <Image source={profPic} style={{ height: 55, width: 55, marginVertical: 15, marginLeft: 25, borderRadius: 100 }} />
            </View>
            <View style={{ marginLeft: 15, }}>
                <Text style={{ fontSize: 16, fontFamily:'afacad_SemiBold' }}>Yoon Jeonghan</Text>
                <Text style={{ fontSize: 16, fontFamily:'afacad_Regular' }}>Kinda pricey for its price tbh</Text>
            </View>
        </View>
        </View>
        <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
                <Image source={profPic2} style={{ height: 55, width: 55, marginVertical: 15, marginLeft: 25, borderRadius: 100 }} />
            </View>
            <View style={{ marginLeft: 15, }}>
                <Text style={{ fontSize: 16, fontFamily:'afacad_SemiBold' }}>Alfonso Elrich</Text>
                <Text style={{ fontSize: 16, fontFamily:'afacad_Regular' }}>Good Quality</Text>
            </View>
        </View>
        </View>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#F3F0E1',
        borderRadius: 5,
    }
})