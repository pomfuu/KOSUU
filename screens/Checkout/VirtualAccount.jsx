import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import OrderConfirmation from './OrderConfirmation';
import { db } from '../../dbconfig';
import { useAuth } from '../../authcontext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const VirtualAccount = () => {
  const navigation = useNavigation();
  const vaNumber = '896 0838 7359 4727';

  const { user } = useAuth(); //Cek user yg login
  const route = useRoute();
  const { product, deliveryfee, servicefee, totalPrice } = route.params;

  const handleCopyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(vaNumber); 
      const copiedText = await Clipboard.getStringAsync(); 
      Alert.alert('Virtual Account Copied', `${copiedText}`);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      Alert.alert('Error', 'Failed to copy to clipboard. Please try again.');
    }
  };

  const handleOk = async () => {
    try {
      const formattedProducts = product.map((product) => ({
        productID: product.productID,
        productName: product.productName,
        productImage: product.productImage,
        productPrice: product.productPrice,
        ...(product.selectedVariant != null && { selectedVariant: product.selectedVariant }),
        ...(product.selectedSize != null && { selectedSize: product.selectedSize }),
        ...(product.selectedColor != null && { selectedColor: product.selectedColor }),
        quantity: (product.quantity || 1),
        vendor: product.vendor, 
      }));
  
      const uniqueVendors = [
        ...new Set(formattedProducts.map((product) => product.vendor)),
      ];
  
      const newProductData = {
        userID: user.uid,
        sellerID: uniqueVendors.join(', '), 
        product: formattedProducts,
        status: "Packed",
        orderDate: serverTimestamp(),
        totalPrice: Number(totalPrice),
      };
  
      console.log("Formatted Products: ", formattedProducts);
      console.log("New Product Data: ", newProductData);
  
      const docRef = await addDoc(collection(db, "Orders"), newProductData);
      navigation.navigate('OrderConfirmation');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  return (
      <View style={styles.container}>
        <HeaderNav title='Payment Virtual Account'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Container>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E' }}>Total</Text>
                <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E', textAlign: 'right' }}>Rp {totalPrice.toLocaleString()}</Text>
              </View>
              <View style={{ height: 0.5, backgroundColor: '#1A47BC', marginVertical: 15}} />
                <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color:'#1A47BC' }}>Virtual account number</Text>
                <View style={{ flexDirection:'row',justifyContent: 'space-between', alignItems: 'center', }}>
                  <Text style={{ fontSize: 24, fontFamily: 'afacad_Medium', color:'#1A47BC', marginTop: 10 }}>{vaNumber}</Text>
                  <TouchableOpacity onPress={handleCopyToClipboard}>
                    <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color:'#1A47BC', marginTop: 10 }}>Copy</Text> 
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text style= {{ fontSize: 16, fontFamily: 'afacad_Bold', color:'#1A47BC' }}>Payment instructions</Text>
                  <View style = {{ backgroundColor:'#EBF3FA', padding: 20, marginTop: 10, borderRadius: 5, paddingVertical: 20 }}>
                    <Text>
                      1 Login to your mBanking account and choose m-Transfer {'\n'} {'\n'}
                      2 Choose transfer by using Virtual Account and then tap the Virtual Account Number field {'\n'} {'\n'}
                      3 Input the given Virtual account number from above either by manual or tap the copy button and then paste it {'\n'} {'\n'}
                      4 Tap the send button and confirm the payment
                    </Text>
                  </View>
                </View>
                <Text style= {{ fontSize: 16, fontFamily: 'afacad_Bold', color:'#1A47BC', marginTop: 15 }}>Information</Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontFamily: 'afacad_Medium', color:'#8E8E8D'}}>Please verify the order to the virtual account number above before making another order with the virtual account so that the number remains the same</Text>
                  <TouchableOpacity onPress={handleOk} style={{ padding: 15, backgroundColor:'#1A47BC', borderRadius: 10, marginTop: 20}}>
                        <Text style={{textAlign: 'center', fontFamily:'afacad_Medium', color:'#FFFFFC', fontSize: 16 }}>OK</Text>
                  </TouchableOpacity>
            </View>
          </Container>
        </ScrollView>
      </View>
  );
};

export default VirtualAccount;

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