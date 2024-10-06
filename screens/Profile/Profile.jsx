import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../styles/Container'
import Tes from '../../components/Tes';
import ProfileImage from '../../assets/KOSU/Profile/pic2.jpg';
import EditIcon from '../../assets/KOSU/Profile/edit.png'

const Profile = () => {
  return (
    <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={ProfileImage} style={styles.image} />
          <Text style={styles.name}>Yoon Jeonghan</Text>
        </View>
        <Container>
          <TouchableOpacity style={styles.editProfile}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image source={EditIcon} style={{height:25, width: 25,}}/>
              <Text style={{fontSize: 16, fontFamily: 'afacad_Bold', color: '#1E69F2'}}>Edit Personal Information</Text>
            </View>
          </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <Text style={{fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC'}}>Account Information</Text>
            </View>
        </Container>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: '#FBFAF5',
  },
  editProfile:{
    backgroundColor: '#FBFAF5',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    position: 'absolute',
    shadowColor: '#1E1E1E', 
    top: -20,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25, 
    shadowRadius: 9,           
    elevation: 1,        
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A47BC',
    paddingTop: 70,
    paddingBottom: 35,
  },
  name: {
    fontSize: 20,
    fontFamily:'afacad_SemiBold',
    marginTop: 10,
    color: '#FFFFFC',
  },
  detailsContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    marginVertical: 25,
  },
  accountDetails: { 
    fontSize: 14,
  },
  image:{
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: '#FFFFFC',
    borderWidth: 1.5,
  }
})