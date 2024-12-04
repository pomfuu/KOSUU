import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

const CartCard = ({ product, isSelected, onToggleSelect, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.store}>Store Name</Text>
      <View style={styles.row}>
        <CheckBox
          checked={isSelected}
          onPress={onToggleSelect}
          checkedColor="#1A47BC"
          uncheckedColor="#8E8E8D"
          containerStyle={styles.checkbox}
        />
        <Image source={{ uri: product.productImage }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{product.productName}</Text>
          {product.selectedSize && <Text style={styles.info}>Size: {product.selectedSize}</Text>}
          {product.selectedColor && <Text style={styles.info}>Color: {product.selectedColor}</Text>}
          <Text style={{ marginTop: 5, fontFamily: 'afacad_Medium' }}>
            Qty: {product.quantity}
          </Text>
          <Text style={styles.price}>
            Subtotal Rp{Number(product.productPrice * product.quantity).toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  store: {
    fontFamily: 'afacad_Medium',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    backgroundColor: '#1A47BC',
    color: '#FBFAF5',
    borderRadius: 10,
    width: '35%',
  },
  checkbox: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'afacad_Medium',
  },
  info: {
    fontSize: 16,
    fontFamily: 'afacad_Medium',
    color: '#8E8E8D',
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontFamily: 'afacad_Bold',
    color: '#1A47BC',
    marginTop: 10,
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
<<<<<<< Updated upstream
});
=======
});
>>>>>>> Stashed changes
