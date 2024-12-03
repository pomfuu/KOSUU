import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container';
import HeaderNav from '../../navigation/HeaderNav';
import OrderImage from '../../assets/KOSU/Card1.png'; 

const Cart = () => {

  const cartItems = [
    {
      id: 1,
      name: 'Klee Dodoco Named',
      size: 'One Size',
      color: 'One Color',
      quantity: 1,
      price: 259000,
      image: OrderImage
    },
    {
      id: 2,
      name: 'Another Product',
      size: 'Medium',
      color: 'Blue',
      quantity: 2,
      price: 199000,
      image: OrderImage 
    },
    {
      id: 3,
      name: 'Third Product',
      size: 'Large',
      color: 'Red',
      quantity: 1,
      price: 159000,
      image: OrderImage
    }
  ]

  return (
    <View style={styles.container}>
      <HeaderNav title='My Cart'/>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Container>
          <View>
            <Text style={styles.cartTitle}>Cart Items</Text>
            <Text style={styles.totalItemsText}>Total {cartItems.length} Items</Text>
            
            {cartItems.map((item) => (
              <View key={item.id} style={styles.itemContainer}>
                <Text style={styles.store}>Store Name</Text>
                <View style={styles.itemRow}>
                  <Image source={item.image} style={styles.image} /> 
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemInfo}>Size : {item.size}</Text>
                    <Text style={styles.itemInfo}>Color : {item.color}</Text>
                    <Text style={styles.itemInfo}>Qty : {item.quantity}</Text>
                    <Text style={styles.itemPrice}>Rp{item.price.toLocaleString()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Container>
      </ScrollView>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  image: {
    width: 120, 
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain', 
  },
  
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
  cartTitle: {
    fontSize: 16, 
    fontFamily: 'afacad_Bold', 
    color:'#1A47BC'
  },
  totalItemsText: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium', 
    color:'#8E8E8D', 
    marginTop: 5
  },
  store: {
    fontSize: 14,
    fontFamily: 'afacad_Medium',
    marginTop: 10,
    marginBottom: 5
  },
  itemContainer: {
    marginBottom: 15
  },
  itemRow: {
    flexDirection:'row', 
    marginTop: 10, 
    gap: 10,
  },
  itemDetails: {
    position:'relative'
  },
  itemName: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium'
  },
  itemInfo: {
    fontSize: 16, 
    fontFamily: 'afacad_Medium', 
    color:'#8E8E8D', 
    marginTop: 5
  },
  itemPrice: {
    fontSize: 18, 
    fontFamily: 'afacad_Bold', 
    color:'#1A47BC', 
    marginTop: 0
  }
});