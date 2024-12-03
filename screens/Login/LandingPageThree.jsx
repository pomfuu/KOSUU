import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import Icon from '../../assets/KOSU/LandingPage3.svg'

const LandingPageThree = () => {
  const navigation = useNavigation();

  const handleClick = () =>{
    navigation.navigate('Login');
  }

  const handleClickSignIn = () =>{
      navigation.navigate('Register');
  }

  return (
    <View style={styles.containerStyle}>
      <Icon/>
      <View style={styles.welcome}>
        <Text style={styles.wctext}>WELCOME</Text>
        <TouchableOpacity onPress={handleClick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickSignIn}>
          <Text style={styles.buttonText2}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default LandingPageThree

const styles = StyleSheet.create({
  containerStyle:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome:{
    position: 'absolute',
    left: 30,
    bottom: 40,
  },
  wctext:{
    color: '#FBFAF5',
    marginBottom: 5,
    fontFamily: 'neue',
    fontSize: 42,
    letterSpacing: -2,
  },
  button: {
    backgroundColor: '#FBFAF5',
    padding: 15,
    paddingHorizontal: 147,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderColor: 'none',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'afacad_Bold',
    color: '#1A47BC',
  },
  buttonText2:{
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
    fontFamily: 'afacad_Medium',
    color: '#FBFAF5',
  }
})