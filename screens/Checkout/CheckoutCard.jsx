import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Container from '../../styles/Container';
import OrderImage from '../../assets/KOSU/Card1.png'; 
import { useNavigation } from '@react-navigation/native';

const CheckoutCard = ({ product }) => {
    const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text style={styles.store}>Store Name</Text>
            <View style={{flexDirection:'row', marginTop: 10, gap: 10,}}>
                <Image source={{ uri: product.image }} style={styles.image} /> 
                <View style={{position:'relative'}}>
                    <View>
                        <Text style={{fontSize: 16, fontFamily: 'afacad_Medium'}}>{product.name}</Text>
                        {product.selectedVariantValue && <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D', marginTop: 5}}>Variant : {product.selectedVariantValue}</Text>}
                        {product.selectedSizeValue && <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D'}}>Size : {product.selectedSizeValue}</Text>}
                        {product.selectedColorValue && <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D'}}>Color : {product.selectedColorValue}</Text>}
                        <Text style={{fontSize: 16, fontFamily: 'afacad_Medium', color:'#8E8E8D'}}>Qty : 1</Text>
                        <Text style={{fontSize: 18, fontFamily: 'afacad_Bold', color:'#1A47BC', marginTop: 10}}>Rp {(product.price).toLocaleString()}</Text>
                    </View>
                </View>
            </View>
      </View>
    </View>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
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
    position: 'absolute',
    bottom: 0,
    right: -100,
  },
});
