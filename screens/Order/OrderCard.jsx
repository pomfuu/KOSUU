import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Container from '../../styles/Container';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ orderData, isActive }) => {
  const navigation = useNavigation();

  const handleClick = (product, index) => {
    navigation.navigate('Rating', { 
      orderId: orderData.id, 
      product: product, 
      productIndex: index,
    });
  };

  return (
    <View>
      <Text style={styles.orderId}>
        <Text style={{ fontFamily: 'afacad_Bold' }}>Order ID: </Text> {orderData.id}
      </Text>
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.store}>Store Name</Text>
          {orderData.product?.map((product, index) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
              <Image
                source={{ uri: product.productImage }}
                style={styles.image}
              />
              <View style={{ position: 'relative', flex: 1 }}>
                <View>
                  <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium' }}>
                    {product.productName || 'No Name'}
                  </Text>
                  {product.selectedSize && (
                    <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D', marginTop: 5 }}>
                      Size : {product.selectedSize}
                    </Text>
                  )}
                  {product.selectedColor && (
                    <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D', marginTop: 5 }}>
                      Color : {product.selectedColor}
                    </Text>
                  )}
                  {product.selectedVariant && (
                    <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D', marginTop: 5 }}>
                      Variant : {product.selectedVariant}
                    </Text>
                  )}
                  <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D', marginTop: 5 }}>
                    Qty : {product.quantity || 1}
                  </Text>
                  <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC', marginTop: 10 }}>
                    Rp{product.productPrice?.toLocaleString() || '0'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleClick(product, index)}
                  style={[styles.button, { backgroundColor: isActive ? '#1A47BC' : '#D9D9D9', marginTop: 10 }]}
                  disabled={!isActive}
                >
                  <Text style={{ color: '#FBFAF5', fontFamily: 'afacad_Medium', fontSize: 16, textAlign: 'center' }}>
                    Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 1,
  },
  orderId: {
    fontFamily: 'afacad_Medium',
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  store: {
    fontFamily: 'afacad_Medium',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#1A47BC',
    width: '35%',
    borderRadius: 10,
    borderColor: 'none',
    color: '#FBFAF5',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#1A47BC',
    paddingVertical: 8,
    width: 100,
    borderRadius: 5,
    bottom: 0,
    right: 0,
  },
});

export default OrderCard;
