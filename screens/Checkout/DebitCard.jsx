import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Container from '../../styles/Container';
import HeaderNav from '../../navigation/HeaderNav';
import { useNavigation } from '@react-navigation/native';

const DebitCard = () => {
  const navigation = useNavigation();
  const [cardNum, setCardNum] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isFormComplete, setIsFormComplete] = useState(false);

  const formatting = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    let formattedText = '';
    for (let i = 0; i < cleanedText.length; i++) {
      if (i === 4 || i === 8 || i === 12) {
        formattedText += ' ';
      }
      formattedText += cleanedText[i];
    }
    setCardNum(formattedText.trim());
  };

  const formatDate = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    if (cleanedText.length <= 2) {
      setExpiryDate(cleanedText);
    } else {
      setExpiryDate(`${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`);
    }
  };

  const handleOk = () => {
    navigation.navigate('OrderConfirmation');
  };

  useEffect(() => {
    // Check if all required fields are filled
    if (cardNum && expiryDate && cvc && name && email) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [cardNum, expiryDate, cvc, name, email]);

  return (
    <View style={styles.container}>
      <HeaderNav title='Debit Card Virtual Account' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Container>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E' }}>Total</Text>
              <Text style={{ fontFamily: 'afacad_Medium', fontSize: 16, color: '#1E1E1E', textAlign: 'right' }}>Rp306.000</Text>
            </View>
            <View style={{ height: 0.5, backgroundColor: '#1A47BC', marginVertical: 15 }} />
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Card Information</Text>
            <TextInput
              value={cardNum}
              onChangeText={formatting}
              style={styles.input}
              keyboardType="numeric"
              placeholder="1234 1234 1234 1234"
              maxLength={19}
            />
            <TextInput
              style={styles.input2}
              keyboardType="numeric"
              placeholder="MM/YY"
              maxLength={5}
              value={expiryDate}
              onChangeText={formatDate}
            />
            <TextInput
              style={styles.input3}
              keyboardType="numeric"
              placeholder="CVC"
              maxLength={3}
              value={cvc}
              onChangeText={setCvc}
            />
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1A47BC', marginTop: 15 }}>Name on card</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              maxLength={40}
              value={name}
              onChangeText={setName}
            />
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1A47BC', marginTop: 10 }}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              maxLength={40}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity
            onPress={handleOk}
            style={[
              styles.button,
              {
                backgroundColor: isFormComplete ? '#1A47BC' : '#8E8E8D'
              }
            ]}
            disabled={!isFormComplete}
          >
            <Text style={{ textAlign: 'center', fontFamily: 'afacad_Medium', color: '#FFFFFC', fontSize: 16 }}>OK</Text>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </View>
  );
};

export default DebitCard;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: '#8E8E8D',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#1A47BC',
  },
  input2: {
    borderWidth: 0.5,
    borderColor: '#8E8E8D',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    color: '#1A47BC',
  },
  input3: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#8E8E8D',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    color: '#1A47BC',
  },
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
  },
  scrollContainer: {
    backgroundColor: '#FBFAF5',
    padding: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
