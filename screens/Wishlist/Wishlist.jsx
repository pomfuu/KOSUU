import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container'
import WishlistCard from './WishlistCard'

const Wishlist = () => {
  return (
    <Container>
      <SafeAreaView>
        <Text>Wishlist</Text>
        <WishlistCard/>
      </SafeAreaView>
    </Container>
  )
}

export default Wishlist

const styles = StyleSheet.create({})