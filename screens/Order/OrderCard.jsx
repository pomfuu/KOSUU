import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Container from '../../styles/Container';
import OrderImage from '../../assets/KOSU/Card1.png'; 
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ isActive }) => {
    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('Rating');
    };

  return (
    <View>
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
                    <TouchableOpacity 
                        onPress={handleClick}
                        style={[styles.button, { backgroundColor: isActive ? '#1A47BC' : '#D9D9D9' }]}
                        disabled={!isActive}>
                        <Text style ={{color: '#FBFAF5', fontFamily: 'afacad_Medium', fontSize: 16, textAlign: 'center',}}>Review</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </View>
    </View>
  );
};

export default OrderCard;

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
