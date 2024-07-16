import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container';

const Cart = () => {
  return (
    <Container>
      <SafeAreaView>
        <Text>Cart</Text>
      </SafeAreaView>
    </Container>
  )
}

export default Cart

const styles = StyleSheet.create({})