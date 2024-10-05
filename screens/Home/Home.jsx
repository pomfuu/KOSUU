import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container';
import Carousel from './Carousel';
import SearchBar from '../../components/SearchBar';
import Categories from './Categories';
import Card from '../../components/Card';

const Home = () => {

  const cards = [
    { id: '1', name: 'Product 1', price: 'Rp1000000', category: 'Category placeholder' },
    { id: '2', name: 'Product 2', price: 'Rp2000000', category: 'Category placeholder' },
    { id: '3', name: 'Product 3', price: 'Rp3000000', category: 'Category placeholder' },
    { id: '4', name: 'Product 4', price: 'Rp4000000', category: 'Category placeholder' },
  ];

  const renderCard = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <Card name={item.name} price={item.price} category={item.category} />
      </View>
    );
  };

  return (
    <Container>
      <SafeAreaView>
        <SearchBar />
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    marginHorizontal: 5,
  },
  textHeader: {
    color: '#1A47BC',
    fontSize: 16, 
    fontFamily: 'afacad_Bold',
    marginTop: 10,
  },
});
