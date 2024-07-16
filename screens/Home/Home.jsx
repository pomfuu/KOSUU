import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LandingLogo from '../../assets/KOSU/landingPageLogo.svg';
import Container from '../../styles/Container';
import styles from './home.style';
import Carousel from './Carousel';
import { ScrollView } from 'react-native';
import SearchBar from '../../components/SearchBar';

const Home = () => {
  return (
    <Container>
        <SafeAreaView>
            <SearchBar/>
          <ScrollView ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <View>
                <Text>Home</Text>
                <Carousel/>
              </View>
            </ScrollView>
        </SafeAreaView>
    </Container>
  )
}

export default Home
