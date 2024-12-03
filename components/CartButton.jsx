import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CartAdded from './Modal/CartAdded';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../authcontext';
import { db } from '../dbconfig';
import { getFirestore, doc, collection, setDoc, updateDoc, addDoc, getDocs, query, where, increment } from 'firebase/firestore';

const CartButton = ({ productId, productName, productImage, productPrice, selectedVariant, selectedSize, selectedColor, userId }) => {
    const [modal, setModal] = useState(false);
    const navigation = useNavigation();

    const handleCheckout = () =>{
        navigation.navigate('Checkout')
    }

    // const handleAddtoCart = () =>{
    //   setModal(true)
    // }

    //Logic ini untuk masukin data addtocart ke database
    const handleAddtoCart = async () => {
        // Ini cuman keperluan debugging buat nunjukin apakah datanya berhasil passing atau gak, diapus jg gapapa
        console.log('Product ID:', productId);
        console.log('Variant:', selectedVariant !== null ? selectedVariant : 'None');
        console.log('Size:', selectedSize !== null ? selectedSize : 'None');
        console.log('Color:', selectedColor !== null ? selectedColor : 'None');
        console.log('Image URL:', productImage);
        console.log('Price:', productPrice);
        console.log('User ID:', userId);
    
        // Nyari dokumen yg sama dengan ID dari user yg login sekarang
        const userRef = doc(db, 'Users', userId); 

        // Cari subcollection Cart di Users
        const cartRef = collection(userRef, 'Cart');

        // Cari dulu apakah user ini udah punya produk nya di shopping cartnya
        const productQuery = query(cartRef, 
            where("productID", "==", productId),
            ...(selectedVariant ? [where("selectedVariant", "==", selectedVariant)] : []),
            ...(selectedColor ? [where("selectedColor", "==", selectedColor)] : []),
            ...(selectedSize ? [where("selectedSize", "==", selectedSize)] : [])
        );

        // Query yang di atas, baru dijalanin
        const querySnapshot = await getDocs(productQuery);

        // Bikin dokumen baru di subcollection Cart dengan ID random
        if (querySnapshot.empty) {
            // If no matching product found, add new item to the cart
            const newCartItemRef = await addDoc(cartRef, {
                productID: productId,
                productName: productName,
                productImage: productImage,
                productPrice: Number(productPrice),
                userId: userId,
                quantity: 1, // Default quantity is 1
                ...(selectedVariant && { selectedVariant: selectedVariant }), 
                ...(selectedColor && { selectedColor: selectedColor }), 
                ...(selectedSize && { selectedSize: selectedSize })
            });
            console.log('New product added to cart:', newCartItemRef.id);
        } else {
            // If a matching product exists, increment the quantity
            querySnapshot.forEach(async (docSnap) => {
                const cartItemRef = doc(db, 'Users', userId, 'Cart', docSnap.id);
                await updateDoc(cartItemRef, {
                    quantity: increment(1) // Increment the quantity by 1
                });
                console.log('Quantity updated for product in cart:', docSnap.id);
            });
        }

        setModal(true);
      };

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