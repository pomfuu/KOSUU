import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LandingLogo from '../../assets/KOSU/landingPageLogo.svg';
import Container from '../../styles/Container';
import styles from './home.style';
import Carousel from './Carousel';
import { ScrollView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Categories from './Categories';
import Card from '../../components/Card';

const Home = () => {
  return (
    <Container>
      <SafeAreaView>
        <SearchBar />
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styless.carouselWrapper}>
            <Carousel />
            <Categories />
            <Card />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default Home;

const styless = StyleSheet.create({
  carouselWrapper: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
  },
});
