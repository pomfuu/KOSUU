import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../styles/Container'
import HeaderNav from '../../navigation/HeaderNav'

const Rating = () => {
  return (
      <View style={styles.container}>
        <HeaderNav title='Rating'/>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          <Container>
            <View>
            </View>
          </Container>
        </ScrollView>
      </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
});