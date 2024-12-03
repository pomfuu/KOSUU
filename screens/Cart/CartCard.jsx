import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import OrderImage from '../../assets/KOSU/Card1.png'; 
import { CheckBox } from 'react-native-elements';

const CartCard = ({ onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.store}>Store Name</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
        <CheckBox
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          checkedColor="#1A47BC"
          uncheckedColor="#8E8E8D"
          containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent' }}
        />
        <Image source={OrderImage} style={styles.image} />
        <View style={{ position: 'relative', flex: 1 }}>
          <View>
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium' }}>Klee Dodoco Named</Text>
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D', marginTop: 5 }}>
              Size : One Size
            </Text>
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Medium', color: '#8E8E8D' }}>
              Color : One Color
            </Text>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC', marginTop: 10 }}>
              Rp259.000
            </Text>
          </View>
        </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={onDelete}>
            <Text style={styles.deleteText}>-</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  image: {
    width: 120, 
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain', 
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
    marginTop: 10
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#D9D9D9',
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFFFFC',
    fontSize: 18,
  },
})