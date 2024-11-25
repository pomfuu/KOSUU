import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container';
import HeaderNav from '../../navigation/HeaderNav';
import OrderImage from '../../assets/KOSU/Card1.png'; 

const Cart = () => {
  return (
    <View style={styles.container}>
    <HeaderNav title='My Cart'/>
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}>
      <Container>
        <View>
          <Text style={{fontSize: 16, fontFamily: 'afacad_Bold', color:'#1A47BC'}}>Cart Items</Text>
          <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D', marginTop: '5'}}>Total 99 Items</Text>
          <View>
            <Text style={styles.store}>Store Name</Text>
                <View style={{flexDirection:'row', marginTop: 10, gap: 10,}}>
                    <Image source={OrderImage} style={styles.image} /> 
                    <View style={{position:'relative'}}>
                        <View>
                            <Text style={{fontSize: 16, fontFamily: 'afacad_Medium'}}>Klee Dodoco Named</Text>
                            <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D', marginTop: 5}}>Size : One Size</Text>
                            <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D'}}>Color : One Color</Text>
                            <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D'}}>Qty : 1</Text>
                            <Text style={{fontSize: 18, fontFamily: 'afacad_Bold', color:'#1A47BC', marginTop: 10}}>Rp259.000</Text>
                        </View>
                    </View>
                </View>
          </View>
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
});