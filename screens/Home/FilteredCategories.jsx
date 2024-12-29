import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container';
import Carousel from './Carousel';
import SearchBar from '../../components/SearchBar';
import Categories from './Categories';
import Card from '../../components/Card';
import Tes from '../../components/Tes';
import PopularCategories from './PopularCategories';
import { db } from '../../dbconfig';
import { doc, query, collection, where, getDocs } from 'firebase/firestore';
import { user } from '../../authconfig';
import HeaderNav from '../../navigation/HeaderNav';

const FilteredCategories = ({ route }) => {
  const { category } = route.params;
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async (searchTerm = '') => {
    try {
        const cardsCollection = query(collection(db, 'Products'), where('category', '==', category));
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

      setCards(cardList);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm]);

  const handleSearchChange  = (searchText) => {
    setSearchTerm(searchText);
  };

  const renderCard = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <Card {...item} id={item.id}/>
      </View>
    );
  };
  return (
    <Container>
    <HeaderNav title={`Filter By ${category}`}  />
      <SafeAreaView>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.carouselWrapper}>
            <View>
              <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
    
  );
  
};

export default FilteredCategories;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 150
  },
  carouselWrapper: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardWrapper: {
    flex: 1,
  },
  textHeader: {
    color: '#1A47BC',
    fontSize: 16, 
    fontFamily: 'afacad_Bold',
    marginTop: 10,
    marginBottom: 5,
  },
});
