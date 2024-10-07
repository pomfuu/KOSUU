import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReviewCard from './ReviewCard'

const Reviews = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={{ fontSize: 21, fontFamily: 'afacad_Medium', color:'#1A47BC', marginBottom: 10, }}>Reviews</Text>
      <ReviewCard/>
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
    wrapper:{
        marginTop: 20,
    },
  });