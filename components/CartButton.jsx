import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CartAdded from './Modal/CartAdded';
import { useNavigation } from '@react-navigation/native';

const CartButton = ({ productId, productName, productImage, productPrice, selectedVariant, selectedSize, selectedColor, userId }) => {
    const [modal, setModal] = useState(false);
    const navigation = useNavigation();

    const handleCheckout = () =>{
        navigation.navigate('Checkout')
    }

    // const handleAddtoCart = () =>{
    //   setModal(true)
    // }

    try {
        // Cari dokumen users berdasarkan userID
        const userRef = doc(db, 'Users', userId); 

        // cari subcollection cart di user
        const cartRef = collection(userRef, 'Cart');

        // Create a new document in the Cart subcollection with randomized ID
        const newCartItemRef = await addDoc(cartRef, {
            productID: productId,
            productName: productName,
            productImage: productImage,
            productPrice: Number(productPrice), // Make sure price is stored as a number
            userId: userId,
            quantity: 1, // Default quantity is 1
            // Conditionally add variant, size, and color if selected
            ...(selectedVariantValue && { selectedVariant: selectedVariantValue }), 
            ...(selectedSizeValue && { selectedSize: selectedSizeValue }), 
            ...(selectedColorValue && { selectedColor: selectedColorValue })
        });

        console.log("Document written with ID: ", newCartItemRef.id);

        // Show the modal
        setModal(true);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    return (
        <View style={{ marginVertical: 15, backgroundColor: '#FBFAF5', paddingHorizontal: 20, paddingVertical: 10, }}>
        <TouchableOpacity style={styles.button} onPress={handleAddtoCart}>
            <Text style={styles.buttonText} animationType="fade">Add to Cart</Text>
        </TouchableOpacity> 
        <CartAdded modal={modal} setModal={setModal}/>

        <TouchableOpacity onPress={handleCheckout} style={styles.button2}>
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