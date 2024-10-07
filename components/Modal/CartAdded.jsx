import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import yayicon from '../../assets/KOSU/Icon/yay-face.png';
import { Ionicons } from '@expo/vector-icons';

const CartAdded = ({ modal, setModal }) => {
  const navigation = useNavigation();

  const handleGoToCart = () => {
    setModal(false);
    navigation.navigate('Cart');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal}
      onRequestClose={() => setModal(false)} 
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Ionicons style={styles.iconClose} size={25} color='#1A47BC' name='close' onPress={()=> setModal(false)}/>
            <Image style={{ height: 75, width: 75, marginBottom: 10 }} source={yayicon}/>
          <Text style={styles.modalText}>Product added to cart!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGoToCart}
            animationType="fade"
          >
            <Text style={styles.buttonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CartAdded;

const styles = StyleSheet.create({
  iconClose: {
    position: 'absolute',
    top: 15,
    right: 15,
  },  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    fontFamily: 'afacad_Medium',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1A47BC',
    padding: 10,
    borderRadius: 20,
    width: 180,
},
buttonText: {
    color: '#FBFAF5',
    fontSize: 16,
    fontFamily: 'afacad_Medium',
    textAlign: 'center',
  },
});
