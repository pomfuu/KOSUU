import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginIcon from '../../assets/KOSU/LoginIcon.svg'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Bottom Navigation');
  };

  const handleRegist = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeview}>
        <LoginIcon style={styles.icon} />
        <Text style={styles.welcome}>WELCOME BACK!</Text>
        <TextInput
            style={styles.inputUsername} 
            placeholder="Email" 
            placeholderTextColor="#1A47BC" />
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#1A47BC"
          secureTextEntry={!isPasswordVisible} 
        />
        <TouchableOpacity
          style={styles.eyeToggle}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'} 
            size={20}
            color="#1A47BC"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClick}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegist}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.signin}>Don't have an account? <Text style={styles.sg2}>Sign Up</Text></Text>
        </View>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  sg2:{
    fontSize: 20,
    fontFamily: 'afacad_Bold',
    color: '#1A47BC',
  },
  signin:{
    fontSize: 20,
    fontFamily: 'afacad_Medium',
    color: '#1A47BC',
  },
  inputUsername:{
    marginTop: 15,
    fontFamily: 'afacad_Medium',
    fontSize: 18,
    backgroundColor: '#F3F0E1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    borderRadius: 10,
    color: '#1A47BC',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'afacad_Medium',
    color: '#FBFAF5',
  },
  button: {
    marginTop: 25,
    backgroundColor: '#1A47BC',
    padding: 15,
    paddingHorizontal: 130,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderColor: 'none',
  },
  inputPassword:{
    marginTop: 5,
    fontFamily: 'afacad_Medium',
    fontSize: 18,
    backgroundColor: '#F3F0E1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    borderRadius: 10,
    color: '#1A47BC',
  },
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  safeview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 36,
    marginTop: 5,
    letterSpacing: -2,
    fontFamily: 'neue',
    color: '#1A47BC',
  },
  icon: {
    textAlign: 'center',
    marginBottom: 10,
  },
  eyeToggle: {
    position: 'absolute',
    right: 25,
    top: '107%',
    marginTop: -133,
  },
});