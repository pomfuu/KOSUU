import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CartAdded from './Modal/CartAdded';

const CartButton = () => {
    const [modal, setModal] = useState(false);

    const handleAddtoCart = () =>{
      setModal(true)
    }

    return (
        <View style={{ marginVertical: 15, backgroundColor: '#FBFAF5', paddingHorizontal: 20, paddingVertical: 10, }}>
        <TouchableOpacity style={styles.button} onPress={handleAddtoCart}>
            <Text style={styles.buttonText} animationType="fade">Add to Cart</Text>
        </TouchableOpacity> 
        <CartAdded modal={modal} setModal={setModal}/>

        <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText2} animationType="fade">Checkout</Text>
        </TouchableOpacity>
        </View>
    )
}

export default CartButton

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#F3F0E1',
        borderRadius: 20,
    },
    button2:{
        backgroundColor: '#1A47BC',
        borderRadius: 20,
        marginTop: 5,
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'afacad_SemiBold',
        color: '#1A47BC',
        padding: 15,
    },
    buttonText2:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'afacad_SemiBold',
        color: '#FBFAF5',
        padding: 15,
    }
})