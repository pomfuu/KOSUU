import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'
import CheckoutCard from './CheckoutCard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState('Virtual Account');
  const navigation = useNavigation()
  const handlePlaceOrder = () => {
    if(selectedOption === 'Virtual Account'){
      navigation.navigate('VirtualAccount')
    } else navigation.navigate('DebitCard')
  }

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
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E', textAlign: 'right' }}>Rp306.000</Text>
                </View>
                <View>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1A47BC', marginTop: 15 }}>Address detail</Text>
                  <View style={{backgroundColor:'#EBF3FA', borderRadius: 5, marginTop: 5}}>
                    <View style={{ padding: 20, flexDirection:'row', gap: 10, alignItems:'center', }}>
                      <Ionicons style={{color:'#1A47BC'}} size={16} name='location-outline'/>
                      <Text style={{fontSize: 14, fontFamily:'afacad_Medium'}}>Jalur Sutera Barat No.21 Apartemen Pacific Garden Tangerang Selatan, 15314</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1A47BC', marginTop: 15 }}>Payment detail</Text>
                  <Text style={{ backgroundColor:'#1A47BC', fontFamily:'afacad_Medium', color:'#FFFFFC', padding: 15, fontSize: 16, borderTopLeftRadius: 10, borderTopRightRadius: 10, textAlign:'center', marginTop: 5 }}>Choose payment method</Text>
                  <View style={{ paddingHorizontal: 15, paddingBottom: 15, paddingTop: 10, backgroundColor:'#F3F0E1', borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                    <TouchableOpacity
                      style={styles.optionContainer}
                      onPress={() => setSelectedOption('Virtual Account')}
                    >
                      <Ionicons
                        name={selectedOption === 'Virtual Account' ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color="#1A47BC"
                      />
                      <Text style={styles.optionText}>Virtual Account</Text>
                    </TouchableOpacity>
                      <View style={{ height: 0.5, backgroundColor: '#1A47BC', marginVertical: 5 }} />
                    <TouchableOpacity
                      style={styles.optionContainer}
                      onPress={() => setSelectedOption('Debit Card')}
                    >
                      <Ionicons
                        name={selectedOption === 'Debit Card' ? 'radio-button-on' : 'radio-button-off'}
                        size={24}
                        color="#1A47BC"
                      />
                      <Text style={styles.optionText}>Debit Card</Text>
                    </TouchableOpacity>
                  </View>
                    <TouchableOpacity onPress={handlePlaceOrder} style={{padding: 15, backgroundColor:'#1A47BC', borderRadius: 10, marginVertical: 10}}>
                      <Text style={{textAlign: 'center', fontFamily:'afacad_Medium', color:'#FFFFFC', fontSize: 16}}>Place Order</Text>
                    </TouchableOpacity>
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'afacad_Medium',
    marginLeft: 15,
    color: '#1E1E1E',
  },
});