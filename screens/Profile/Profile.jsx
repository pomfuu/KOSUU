import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container'
import Tes from '../../components/Tes';
import ProfileImage from '../../components/ProfileImage';

//Tes push 5 Oct 23:06
const Profile = () => {
  return (
    <Container>
      <SafeAreaView>
        <Text>Profile</Text>
        <View style={styles.container}>
        <ProfileImage />
        <Text style={styles.name}>Cristiano Podado</Text>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.accountDetails}>Account Information</Text>
        </View>
      
      </SafeAreaView>
    </Container>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', // Center items vertically
  },
  name: {
    fontSize: 16,
    fontFamily:'afacad_Bold',
  },
  detailsContainer: {
    alignSelf: 'stretch', // Make this view take the full width
    alignItems: 'flex-start', // Align text to the left
    paddingHorizontal: 20, // Optional: Add padding for better appearance
  },
  accountDetails: { 
    fontSize: 14,
  },
})