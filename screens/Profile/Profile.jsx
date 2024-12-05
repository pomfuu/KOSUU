import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Container from '../../styles/Container';
import ProfileImage from '../../assets/KOSU/Profile/pic2.jpg';
import EditIcon from '../../assets/KOSU/Profile/edit.png';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CalendarIcon from 'react-native-vector-icons/FontAwesome';
import LogoutIcon from 'react-native-vector-icons/FontAwesome';
import HeaderNav from '../../navigation/HeaderNav';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../authcontext';
import { db } from '../../dbconfig';
import { doc, collection, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../../config';
import { ref, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const userDoc = doc(db, 'Users', user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log('User data:', userData);
          setCards([userData]);  
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } 
    fetchCards();
  }, []);

  const userInfo = cards.length > 0 ? cards[0] : {};

  const [editedaddress, seteditedaddress] = useState(userInfo.address);
  const [editedcity, seteditedcity] = useState(userInfo.city);
  const [editedgender, seteditedgender] = useState(userInfo.gender);
  const [editedmobilenumber, seteditedmobilenumber] = useState(userInfo.ediedmobilenumber);
  const [editedname, seteditedname] = useState(userInfo.name);
  const [editedpostalcode, seteditedpostalcode] = useState(userInfo.postalcode);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (userInfo.ProfileImage) {
          const imageRef = ref(storage, userInfo.ProfileImage); 

          // Get the download URL
          const url = await getDownloadURL(imageRef);
          setImageUri(url);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImage();
  }, [userInfo]);

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      const userDocRef = doc(db, 'Users', user.uid);
      
      await updateDoc(userDocRef, {
        name: editedname !== undefined && editedname !== '' ? editedname : userInfo.name,
        address: editedaddress !== undefined && editedaddress !== '' ? editedaddress : userInfo.address,
        city: editedcity !== undefined && editedcity !== '' ? editedcity : userInfo.city,
        mobilenumber: editedmobilenumber !== undefined && editedmobilenumber !== '' ? editedmobilenumber : userInfo.mobilenumber,
        postalcode: editedpostalcode !== undefined && editedpostalcode !== '' ? editedpostalcode : userInfo.postalcode,
      });

      console.log('Address and city updated in Firestore.');
      setIsEditing(false);
  
      // Optionally update local userInfo state
      setCards(prevCards => {
        const updatedCards = [...prevCards];
        updatedCards[0] = { 
          ...updatedCards[0],
          name: editedname || userInfo.name,
          address: editedaddress || userInfo.address,
          city: editedcity || userInfo.city,
          mobilenumber: editedmobilenumber || userInfo.mobilenumber,
          postalcode: editedpostalcode || userInfo.postalcode, };
        return updatedCards;
      });
    } catch (error) {
      console.error('Error updating user address:', error);
    }
  };

  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowDate(false);
      return;
    }
    const currDate = selectedDate || date;
    setDate(currDate);
    setShowDate(false);
  };

  const showDatePicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: 'date',
        display: 'calendar',
      });
    } else {
      setShowDate(true);
    }
  };

  
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
    
    <View style={{ flex: 1 }}>
    <View style={styles.profHead}></View>
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.name}>{userInfo.name}</Text>
      </View>
      <Container>
      <TouchableOpacity
        style={styles.editProfile}
        onPress={isEditing ? handleSavePress : handleEditPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1E69F2' }}>
            {isEditing ? 'Save Changes' : 'Edit Personal Information'}
          </Text>
        </View>
      </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Account Information</Text>
          <View style={styles.accountDetailWrapper}>
            <Text style={styles.detailTitle}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input} 
                value={editedname}
                onChangeText={seteditedname} 
                placeholder={userInfo.name}
              />
            ) : (
              <Text style={styles.detailValue}>{userInfo.name}</Text>
            )}
            <View style={styles.horizontalLine} />
            <Text style={styles.detailTitle}>Email Address</Text>
            <Text style={styles.detailValue}>{user.email}</Text>
            <View style={styles.horizontalLine} />

            {/* untuk phone number */}
            <Text style={styles.detailTitle}>Mobile Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input} 
                value={editedmobilenumber}
                onChangeText={seteditedmobilenumber} 
                placeholder={userInfo.mobilenumber}
                keyboardType="phone-pad" 
              />
            ) : (
              <Text style={styles.detailValue}>{userInfo.mobilenumber}</Text>
            )}

            <View style={styles.horizontalLine} />
              {/* <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.detailTitle}>Date of Birth</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontSize: 16, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginTop: 10 }}>
                  {userInfo.dateofbirth ? new Date(userInfo.dateofbirth.toDate()).toLocaleDateString() : '01/12/2024'}
                  </Text>
                  <TouchableOpacity style={{ paddingLeft: 40, paddingRight: 40 }} onPress={showDatePicker}>
                    <CalendarIcon name="calendar" size={18} color="#1E69F2" />
                  </TouchableOpacity>
                    {showDate && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                      />
                    )}
                </View>
                <View style={styles.horizontalLine} />
              </View> */}

              {/* <View>
                  <Text style={styles.detailTitle}>Gender</Text>
                  <Text style={styles.detailValue}>{userInfo.gender}</Text>
                <View style={styles.horizontalLine} />
              </View> */}

          </View>
        </View>


        <View>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Address Details</Text>
          <View style={styles.accountDetailWrapper2}>

            {/* Untuk address */}
          <Text style={styles.detailTitle}>Street Address</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedaddress} 
              onChangeText={seteditedaddress} 
              placeholder={userInfo.address}
            />
          ) : (
            <Text style={styles.detailValue}>{userInfo.address}</Text>
          )}
            <View style={styles.horizontalLine} />
            <View style={{ flexDirection: 'row' }}>

              {/* Untuk city */}
              <View>
                <Text style={styles.detailTitle}>City</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={editedcity} 
                    onChangeText={seteditedcity} 
                    placeholder={userInfo.city}
                  />
                ) : (
                  <Text style={styles.detailValue}>{userInfo.city}</Text>
                )}
                <View style={styles.horizontalLine} />
              </View>

              {/* Untuk postal code */}
              <View style={{ paddingLeft: 40 }}> 
                <Text style={styles.detailTitle}>Postal Code</Text>
                {isEditing ? (
              <TextInput
                style={styles.input}
                value={editedpostalcode} 
                onChangeText={seteditedpostalcode} 
                placeholder={userInfo.postalcode}
              />
              ) : (
                <Text style={styles.detailValue}>{userInfo.postalcode}</Text>
              )}
                <View style={styles.horizontalLine} />
              </View>

            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Account Settings</Text>
            <View style={styles.accountDetailWrapper3}>
            <TouchableOpacity onPress={handleLogout}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LogoutIcon name="sign-out" size={20} color="#1E69F2" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1E69F2' }}>Logout</Text>
              </View>
            </TouchableOpacity>
            </View>
        </View>
      </Container>
    </ScrollView>
    </View>
    
    </KeyboardAvoidingView>
  );
};

const renderDetail = (title, value, isHalfColumn = false) => {
  return (
    <View style={[styles.detailContainer, isHalfColumn && styles.halfColumn]}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailValue}>{value}</Text>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  detailTitle: { fontSize: 16, fontFamily: 'afacad_Bold', color: '#587BCF'},
  detailValue: { fontSize: 16, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginTop: 10 },
  profHead:{
    padding: 20,
    backgroundColor: '#1A47BC',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#FFFFFC',
    width: '100%',
    marginVertical: 5,
    marginBottom: 20,
  },
  accountDetailWrapper: {
    marginTop: 10,
    backgroundColor: '#EAF3FA',
    padding: 20,
    width: '100%',
    borderRadius: 5,
  },
  accountDetailWrapper2: {
    marginTop: 10,
    backgroundColor: '#EAF3FA',
    padding: 20,
    width: '100%',
    borderRadius: 5,
    marginBottom: 25,
  },
  accountDetailWrapper3: {
    padding: 20,
    width: '100%',
    borderRadius: 5,
    marginBottom: 120,
  },
  wrapper: {
    backgroundColor: '#FBFAF5',
  },
  editProfile: {
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
    paddingTop: 40,
    paddingBottom: 35,
  },
  name: {
    fontSize: 20,
    fontFamily: 'afacad_SemiBold',
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
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: '#FFFFFC',
    borderWidth: 1.5,
  },
});
