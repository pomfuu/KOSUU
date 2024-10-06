import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'

const Order = () => {
  return (
    <View style={styles.container}>
    <HeaderNav title='My Order'/>
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      <Container>
        <View>
        </View>
      </Container>
    </ScrollView>
  </View>
  )
}

export default Order

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