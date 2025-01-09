import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../styles/Container';
import OrderImage from '../../assets/KOSU/Card1.png'; 
import { useNavigation } from '@react-navigation/native';

const CheckoutCard = ({ product }) => {
    const navigation = useNavigation();
    //const product = Array.isArray(product) ? product : [product];

    useEffect(() => {
      console.log(product);
    });

  return (
    <View>
      {product.map((item) => (
        <View key={item.id} style={styles.cardContainer}>
          <View style={styles.productRow}>
            <Image
              source={{ uri: item.productImage }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.productName}</Text>
              {item.selectedVariant && (
                <Text style={styles.variantText}>
                  Variant: {item.selectedVariant}
                </Text>
              )}
              {item.selectedSize && (
                <Text style={styles.variantText}>
                  Size: {item.selectedSize}
                </Text>
              )}
              {item.selectedColor && (
                <Text style={styles.variantText}>
                  Color: {item.selectedColor}
                </Text>
              )}
              <Text style={styles.quantityText}>
                Qty: {item.quantity || 1}
              </Text>
              <Text style={styles.productPrice}>
                Rp {item.productPrice}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  store: {
    fontFamily: 'afacad_Medium',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#1A47BC',
    width: '35%',
    borderRadius: 10,
    color: '#FBFAF5',
    alignSelf: 'center',
  },
  productRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'afacad_Medium',
    color: '#333',
    marginBottom: 5,
  },
  variantText: {
    fontSize: 14,
    fontFamily: 'afacad_Medium',
    color: '#8E8E8D',
    marginBottom: 3,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: 'afacad_Medium',
    color: '#8E8E8D',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'afacad_Bold',
    color: '#1A47BC',
    marginTop: 10,
  },
  noProducts: {
    fontSize: 16,
    fontFamily: 'afacad_Medium',
    color: '#8E8E8D',
    textAlign: 'center',
    marginTop: 20,
  },
});
