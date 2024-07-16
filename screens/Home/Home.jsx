import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LandingLogo from '../../assets/KOSU/landingPageLogo.svg';
import Container from '../../styles/Container';
import styles from './home.style';
import Carousel from './Carousel';

const Home = () => {
  return (
    <Container>
      <SafeAreaView>
        <View>
          <Text>Home</Text>
          <Carousel/>
        </View>
      </SafeAreaView>
    </Container>
  )
}

export default Home
