import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Logo from '../../assets/KOSU/Icon/landingPageOne.svg';

const LandingPageOne = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LandingPageTwo' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick}>
            <Logo />
      </TouchableOpacity>
    </View>
  );
};

export default LandingPageOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})