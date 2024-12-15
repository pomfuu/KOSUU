import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { SearchBar as RNE_SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../dbconfig';
import { useNavigation } from '@react-navigation/native';
import SearchEmpty from './SearchEmpty';

const SearchList = ({ route }) => {
    const { query } = route.params || '';
    const [searchTerm, setSearchTerm] = useState(query || '');
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
  
    const fetchProducts = async (searchTerm = '') => {
      try {
        const cardsCollection = collection(db, 'Products');
        const snapshot = await getDocs(cardsCollection);
        const cardList = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(card => {
            if (searchTerm === '') return true;
            return card.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
  
        setProducts(cardList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    useEffect(() => {
      fetchProducts(searchTerm);
    }, [searchTerm]);
  
    const clearSearch = () => {
      setSearchTerm('');
    };
  
    const handleSearchSubmit = () => {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      navigation.navigate('SearchFilter', { products: filteredProducts });
    };
  
    const navigateToCardDetail = (product) => {
      navigation.navigate('CardDetail', { ...product });
    };
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <RNE_SearchBar
            placeholder="Search any cosplay product"
            onChangeText={setSearchTerm}
            value={searchTerm}
            onSubmitEditing={handleSearchSubmit}
            clearIcon={
              <Icon
                name="close"
                type="material"
                color="#1A47BC"
                onPress={clearSearch}
              />
            }
            containerStyle={{
              backgroundColor: '#FBFAF5',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingHorizontal: 0,
              marginTop: -10,
            }}
            inputContainerStyle={{
              backgroundColor: '#F3F0E1',
              borderRadius: 5,
              height: 35,
            }}
            inputStyle={{
              fontSize: 16,
              fontFamily: 'afacad_Medium',
              color: '#1E1E1E',
            }}
            leftIconContainerStyle={{
              paddingLeft: 10,
            }}
            rightIconContainerStyle={{
              paddingRight: 10,
            }}
          />
  
          {products.length === 0 ? (
            <SearchEmpty />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToCardDetail(item)}>
                  <Text style={styles.item}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FBFAF5',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    fontSize: 16,
    fontFamily: 'afacad_Medium',
    color: '#1E1E1E',
  },
});

export default SearchList;
