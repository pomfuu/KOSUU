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

    // const handleCardPressed = () => {
    //     navigation.navigate('CardDetail', { 
    //       id,
    //       name, 
    //       category, 
    //       price, 
    //       image: imageUrl, 
    //       rating, 
    //       description, 
    //       stock, 
    //       material, 
    //       sizeChart, 
    //       dimension, 
    //       condition, 
    //       notes, 
    //       variant, 
    //       size, 
    //       color 
    //     });
    //   };


    //Logic ini untuk masukin data addtocart ke database
    const handleAddtoCart = async () => {
        // Ini cuman keperluan debugging buat nunjukin apakah datanya berhasil passing atau gak, diapus jg gapapa
        console.log('Product ID:', product.id);
        console.log('Variant:', product.selectedVariantValue !== null ? product.selectedVariantValue : 'None');
        console.log('Size:', product.selectedSizeValue !== null ? product.selectedSizeValue : 'None');
        console.log('Color:', product.selectedColorValue !== null ? product.selectedColorValue : 'None');
        console.log('Image URL:', product.image);
        console.log('Price:', product.price);
        console.log('User ID:', userId);
    
        // Nyari dokumen yg sama dengan ID dari user yg login sekarang
        const userRef = doc(db, 'Users', userId); 

        // Cari subcollection Cart di Users
        const cartRef = collection(userRef, 'Cart');

        // Cari dulu apakah user ini udah punya produk nya di shopping cartnya
        const productQuery = query(cartRef, 
            where("productID", "==", product.id),
            ...(product.selectedVariantValue ? [where("selectedVariant", "==", product.selectedVariantValue)] : []),
            ...(product.selectedColorValue ? [where("selectedColor", "==", product.selectedColorValue)] : []),
            ...(product.selectedSizeValue ? [where("selectedSize", "==", product.selectedSizeValue)] : [])
        );

        // Query yang di atas, baru dijalanin
        const querySnapshot = await getDocs(productQuery);

        // Bikin dokumen baru di subcollection Cart dengan ID random
        if (querySnapshot.empty) {
            // If no matching product found, add new item to the cart
            const newCartItemRef = await addDoc(cartRef, {
                productID: product.id,
                productName: product.name,
                productImage: product.image,
                productPrice: Number(product.price),
                userId: userId,
                quantity: 1,
                ...(product.selectedVariantValue && { selectedVariant: product.selectedVariantValue }), 
                ...(product.selectedColorValue && { selectedColor: product.selectedColorValue }), 
                ...(product.selectedSizeValue && { selectedSize: product.selectedSizeValue })
            });
            console.log('New product added to cart:', newCartItemRef.id);
        } else {
            // Kalau barangnya udah ada di cart
            querySnapshot.forEach(async (docSnap) => {
                const cartItemRef = doc(db, 'Users', userId, 'Cart', docSnap.id);
                await updateDoc(cartItemRef, {
                    quantity: increment(1) // Quantity nya aja tambahin 1
                });
                console.log('Quantity updated for product in cart:', docSnap.id);
            });
        }

        setModal(true);
      };

      
    const handleCheckout = () =>{
        
        const productWithSelections = {
            id: product.id,
            selectedVariant: product.selectedVariantValue,
            selectedSize: product.selectedSizeValue,
            selectedColor: product.selectedColorValue,
            productName: product.name,
            productID: product.id,
            productPrice: product.price,
            productImage: product.image,
          };
        
          // Navigate to Checkout and pass the new product object
          console.log("hmm " + productWithSelections);
        navigation.navigate('Checkout', { product: productWithSelections });
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