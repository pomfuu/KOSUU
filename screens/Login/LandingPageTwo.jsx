import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Background from '../../assets/KOSU/Icon/LandingPageTwo.svg';
import ExpandRound from '../../assets/KOSU/Icon/expand_round.svg'
import { CommonActions, useNavigation } from '@react-navigation/native';

const LandingPageTwo = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LandingPageThree' }],
      })
    );
  }

  return (
    <View style={styles.containerStyle}>
      <Background style={{ marginBottom: 5 }} />
      <TouchableOpacity onPress={handleClick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
          <ExpandRound style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default LandingPageTwo

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1A47BC',
    padding: 15,
    width: '87%',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    position: 'absolute',
    borderColor: 'none',
  },
  buttonText: {
    textAlign: 'left',
    fontSize: 20,
    marginLeft: 10,
    fontFamily: 'afacad_Medium',
    color: '#FBFAF5',
  },
  icon: {
    marginEnd: 10,
  }
})