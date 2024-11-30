
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
import { doc, collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsCollection = collection(db, 'Products');
        const snapshot = await getDocs(cardsCollection);
        const cardList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCards(cardList);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  const renderCard = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <Card {...item} />
      </View>
    );
    
  };
  return (
    
    <Container>
      <SafeAreaView>
        <SearchBar/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.carouselWrapper}>
            <Carousel />
            <Categories />
            <Text style={styles.textHeader}>Popular items</Text>
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
            <PopularCategories/>
            <Text style={styles.textHeader}>Explore more items</Text>
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
export default Home;

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
