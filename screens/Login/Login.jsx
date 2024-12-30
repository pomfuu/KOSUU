import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginIcon from '../../assets/KOSU/LoginIcon.svg'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../authconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../authcontext';

const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const navigation = useNavigation();

  const handleClick = async() => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      login(user.uid, user.email); 

      // Navigate home screen
      navigation.navigate('Bottom Navigation');
    } catch (err) {
      console.log(err.message);

      if (err.message.includes('invalid-email')) {
        alert('Invalid email address, please insert the proper email address.');
      }
      else if (err.message.includes('missing-password')) {
        alert('Please insert the password.');
      }
       else if (err.message.includes('invalid-credential')) {
        alert('Incorrect email and passsword combination.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } 
  };

  const handleRegist = () => {
    navigation.navigate('Register');
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeview}>
        <LoginIcon style={styles.icon} />
        <Text style={styles.welcome}>WELCOME BACK!</Text>
        <TextInput
            style={styles.inputUsername} 
            placeholder="Email" 
            placeholderTextColor="#1A47BC" 
            value={email}
            onChangeText={setEmail}
            />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="#1A47BC"
            secureTextEntry={!isPasswordVisible} 
            value={password}
            onChangeText={setPassword}
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
        </View>
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
      <TouchableOpacity onPress={handleForgetPassword}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.signin}>Forgot Your Password? <Text style={styles.sg2}>Reset Password</Text></Text>
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
    right: 15, // Align it to the right edge of the input
    top: '50%',
    transform: [{ translateY: -10 }], // Adjust for vertical center alignment
  },
  passwordContainer: {
    marginTop: 5,
    position: 'relative',
    width: 300,
  },
});