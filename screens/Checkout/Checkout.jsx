import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'
import CheckoutCard from './CheckoutCard';

const Checkout = () => {
  return (
      <View style={styles.container}>
        <HeaderNav title='Checkout'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Container>
            <View>
              <CheckoutCard/>
              <View style={{marginTop: 20}}>
                <Text style={{fontFamily:'afacad_Bold', fontSize: 16, color:'#1A47BC', marginBottom: 5}}>Price details</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#8E8E8D' }}>Product price</Text>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#8E8E8D', textAlign: 'right' }}>Rp295.000</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#8E8E8D' }}>Delivery fee</Text>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#8E8E8D', textAlign: 'right' }}>Rp10.000</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#8E8E8D' }}>Service fee</Text>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#8E8E8D', textAlign: 'right' }}>Rp1.000</Text>
                </View>
                <View style={{ height: 0.5, backgroundColor: '#8E8E8D', marginTop: 15 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E' }}>Total</Text>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E', textAlign: 'right' }}>Rp1.000</Text>
                </View>
              </View>
            </View>
          </Container>
        </ScrollView>
      </View>
  );
};

export default Checkout;

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