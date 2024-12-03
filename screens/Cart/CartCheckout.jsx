import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const CartCheckout = () => {
    const navigation = useNavigation();

    const handleCheckout = () =>{
        navigation.navigate('Checkout')
    }

    return (
        <View style={{ marginVertical: 15, backgroundColor: '#FBFAF5', paddingHorizontal: 5, paddingVertical: 10, }}>
            <TouchableOpacity onPress={handleCheckout} style={styles.button2}>
                <Text style={styles.buttonText2} animationType="fade">Checkout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartCheckout

const styles = StyleSheet.create({
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