import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderNav from '../navigation/HeaderNav'
import Container from '../styles/Container'
import { useRoute } from '@react-navigation/native'
import star from '../assets/KOSU/Icon/star_fill.png'
import Reviews from './Reviews'
import CartButton from './CartButton'
import Card1Image from '../assets/KOSU/Card1.png';

const CardDetail = () => {
  const route = useRoute();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const { name, category, price, image, rating, description, stock, material, sizeChart, dimension, condition, notes, variant, size, color } = route.params;

  const handleVariantPress = (index) => {
    if (selectedVariant === index) {
      setSelectedVariant(null)
    } else {
      setSelectedVariant(index)
    }
  };

  const handleSizePress = (index) => {
    if (selectedSize === index) {
      setSelectedSize(null)
    } else {
      setSelectedSize(index)
    }
  };

  const handleColorPress = (index) => {
    if (selectedColor === index) {
      setSelectedColor(null)
    } else {
      setSelectedColor(index)
    }
  };

  return (
    <View style={styles.container}>
      <HeaderNav title={name} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View>
          <Image style={styles.productImage} source={{ uri: image }} />
        </View>
        <View style={styles.detail}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#8E8E8D' }}>{category}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
              <Image source={star} style={{ height: 30, width: 30 }} />
              <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1E1E1E' }}>{rating}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 20, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginTop: 10 }}>{name}</Text>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D', marginTop: 5 }}>{description}</Text>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D', marginTop: 5 }}>Stock: {stock}</Text>
          <View style={{ backgroundColor: '#FFFFFC', borderRadius: 5, padding: 15, marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D' }}>Material: {material}</Text>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D', marginTop: 5 }}>Size Chart: {sizeChart}</Text>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D', marginTop: 5 }}>Dimension: {dimension}</Text>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D', marginTop: 5 }}>Conditions: {condition}</Text>
            <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#8E8E8D', marginTop: 5 }}>Notes: {notes}</Text>
          </View>

          {/* Variant */}
          <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginVertical: 5 }}>Variant</Text>
          {variant.map((item, index) => {
            const isSelected = selectedVariant === index;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.variantButton,
                  { backgroundColor: isSelected ? '#1A47BC' : '#F3F0E1' } 
                ]}
                onPress={() => handleVariantPress(index)}
              >
                <Text
                  style={{
                    color: isSelected ? '#F3F0E1' : '#1E1E1E',
                    fontFamily: 'afacad_Medium',
                    fontSize: 18,
                    textAlign: 'center'
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Size  */}
          <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginVertical: 5 }}>Size</Text>
          {size.map((item, index) => {
            const isSelected = selectedSize === index;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.variantButton,
                  { backgroundColor: isSelected ? '#1A47BC' : '#F3F0E1' }
                ]}
                onPress={() => handleSizePress(index)} 
              >
                <Text
                  style={{
                    color: isSelected ? '#F3F0E1' : '#1E1E1E',
                    fontFamily: 'afacad_Medium',
                    fontSize: 18,
                    textAlign: 'center'
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Color */}
          <Text style={{ fontSize: 18, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginVertical: 5 }}>Color</Text>
          <View style={{ flexDirection: 'row', }}>
            {color.map((item, index) => {
              const isSelected = selectedColor === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.variantButton,
                    { backgroundColor: isSelected ? '#1A47BC' : '#F3F0E1', marginRight: 5 }
                  ]}
                  onPress={() => handleColorPress(index)} 
                >
                  <Text
                    style={{
                      color: isSelected ? '#FBFAF5' : '#1E1E1E',
                      fontFamily: 'afacad_Medium',
                      fontSize: 18,
                      textAlign: 'center'
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Reviews/>
        </View>
      </ScrollView>
      <CartButton/>
    </View>
  );
};

  const renderDetail = (title, value = false) => {
    return (
      <View style={[styles.detailContainer]}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.detailValue}>{value}</Text>
        <View style={styles.horizontalLine} />
      </View>
    );
  };

  export default CardDetail
  
  const styles = StyleSheet.create({
    detail:{
      padding: 17,
    },
    container: {
      flex: 1,
      backgroundColor: '#FBFAF5',
    },
    scrollContainer: {
      backgroundColor: '#FBFAF5',
      padding: 10,
    },
    productImage: {
        width: '100%',
        height: 380,
        borderRadius: 5,
    },
    variantButton:{
      backgroundColor: '#F3F0E1',
      width: '30%',
      textAlign: 'center',
      padding: 7,
      borderRadius: 5,
    }
  });