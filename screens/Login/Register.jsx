import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegistIcon from '../../assets/KOSU/RegisterIcon2.svg'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {db} from '../../dbconfig';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userData = {
        name: username,
        ProfileImage: "gs://teskosudulu.firebasestorage.app/istockphoto-517998264-612x612.jpg", // Gambar default untuk di awal, ga ada gambar
        address: "",
        city: "",
        dateofbirth:"",
        gender: "",
        mobilenumber:"",
        postalcode:""
      };
      
      await setDoc(doc(db, "Users", uid), userData);

      console.log('User registered:', userCredential.user);
      alert('Registration successful!');

      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error.message);
      alert(error.message);
    }
  };


  const handleClick = () => {
    navigation.navigate('Bottom Navigation');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeview}>
        <RegistIcon style={styles.icon} />
        <Text style={styles.welcome}>REGISTER ACCOUNT</Text>
        <TextInput
            style={styles.inputUsername} 
            placeholder="Username" 
            placeholderTextColor="#1A47BC"
            value={username}
            onChangeText={(text) => setUsername(text)}
            />
        <TextInput
            style={styles.inputUsername} 
            placeholder="Email" 
            placeholderTextColor="#1A47BC"
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          placeholderTextColor="#1A47BC"
          secureTextEntry={!isPasswordVisible} 
          value={password}
          onChangeText={(text) => setPassword(text)}
          />
        
        <TextInput
          style={styles.inputPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#1A47BC"
          secureTextEntry={!isConfirmPasswordVisible} 
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
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
        <TouchableOpacity
          style={styles.eyeToggle2}
          onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
        >
          <Icon
            name={isConfirmPasswordVisible ? 'eye' : 'eye-slash'} 
            size={20}
            color="#1A47BC"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.signin}>Already have an account? <Text style={styles.sg2}>Log in</Text></Text>
        </View>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Register;

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
    marginBottom: 10,
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
    marginTop: 20,
    backgroundColor: '#1A47BC',
    padding: 15,
    paddingHorizontal: 121,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderColor: 'none',
  },
  inputPassword:{
    fontFamily: 'afacad_Medium',
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: '#F3F0E1',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    borderRadius: 10,
    color: '#1A47BC',
  },
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  safeview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    marginBottom: 15,
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
    top: '70.5%',
  },
  eyeToggle2: {
    position: 'absolute',
    right: 25,
    top: '81.5%',
  },
});