import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CartAdded from './Modal/CartAdded';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../authcontext';
import { db } from '../dbconfig';
import { getFirestore, doc, collection, setDoc, updateDoc, addDoc, getDocs, query, where, increment } from 'firebase/firestore';

const CartButton = ({ product, userId }) => {
    const [modal, setModal] = useState(false);
    const navigation = useNavigation();

    const isDisabled = !product.selectedVariantValue || !product.selectedSizeValue || !product.selectedColorValue;

    const handleAddtoCart = async () => {
        console.log('Product ID:', product.id);
        console.log('Variant:', product.selectedVariantValue);
        console.log('Size:', product.selectedSizeValue);
        console.log('Color:', product.selectedColorValue);
        console.log('Image URL:', product.image);
        console.log('Price:', product.price);
        console.log('User ID:', userId);
        console.log('vendor:', product.vendor);

        const userRef = doc(db, 'Users', userId); 
        const cartRef = collection(userRef, 'Cart');

        const productQuery = query(cartRef, 
            where("productID", "==", product.id),
            ...(product.selectedVariantValue ? [where("selectedVariant", "==", product.selectedVariantValue)] : []),
            ...(product.selectedColorValue ? [where("selectedColor", "==", product.selectedColorValue)] : []),
            ...(product.selectedSizeValue ? [where("selectedSize", "==", product.selectedSizeValue)] : [])
        );

        const querySnapshot = await getDocs(productQuery);

        if (querySnapshot.empty) {
            const newCartItemRef = await addDoc(cartRef, {
                productID: product.id,
                productName: product.name,
                productImage: product.image,
                productPrice: Number(product.price),
                userId: userId,
                vendor: product.vendor,
                quantity: 1,
                ...(product.selectedVariantValue && { selectedVariant: product.selectedVariantValue }), 
                ...(product.selectedColorValue && { selectedColor: product.selectedColorValue }), 
                ...(product.selectedSizeValue && { selectedSize: product.selectedSizeValue })
            });
            console.log('New product added to cart:', newCartItemRef.id);
        } else {
            querySnapshot.forEach(async (docSnap) => {
                const cartItemRef = doc(db, 'Users', userId, 'Cart', docSnap.id);
                await updateDoc(cartItemRef, {
                    quantity: increment(1)
                });
                console.log('Quantity updated for product in cart:', docSnap.id);
            });
        }

        setModal(true);
    };

    const handleCheckout = () => {
        const productWithSelections = {
            id: product.id,
            selectedVariant: product.selectedVariantValue,
            selectedSize: product.selectedSizeValue,
            selectedColor: product.selectedColorValue,
            productName: product.name,
            productID: product.id,
            productPrice: product.price,
            productImage: product.image,
            vendor: product.vendor,
        };

        console.log("Product for Checkout:", productWithSelections);
        navigation.navigate('Checkout', { product: productWithSelections });
    };

    return (
        <View style={{ marginVertical: 15, backgroundColor: '#FBFAF5', paddingHorizontal: 20, paddingVertical: 10 }}>
            <TouchableOpacity 
                style={[styles.button, isDisabled && styles.disabledButton]} 
                onPress={handleAddtoCart} 
                disabled={isDisabled}
            >
                <Text style={[styles.buttonText, isDisabled && styles.disabledText]} animationType="fade">
                    Add to Cart
                </Text>
            </TouchableOpacity> 
            <CartAdded modal={modal} setModal={setModal} />

            <TouchableOpacity 
                style={[styles.button2, isDisabled && styles.disabledButton]} 
                onPress={handleCheckout} 
                disabled={isDisabled}
            >
                <Text style={[styles.buttonText2, isDisabled && styles.disabledText]} animationType="fade">
                    Checkout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

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