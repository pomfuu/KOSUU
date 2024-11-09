import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import React, { useState } from 'react';
import Container from '../../styles/Container';
import ProfileImage from '../../assets/KOSU/Profile/pic2.jpg';
import EditIcon from '../../assets/KOSU/Profile/edit.png';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CalendarIcon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

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
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={ProfileImage} style={styles.image} />
        <Text style={styles.name}>Yoon Jeonghan</Text>
      </View>
      <Container>
        <TouchableOpacity style={styles.editProfile}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image source={EditIcon} style={{ height: 25, width: 25 }} />
            <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1E69F2' }}>Edit Personal Information</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Account Information</Text>
          <View style={styles.accountDetailWrapper}>
            <Text style={styles.detailTitle}>Name</Text>
            <Text style={styles.detailValue}>Yoon Jeonghan</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.detailTitle}>Email Address</Text>
            <Text style={styles.detailValue}>YoonJeonghan@gmail.com</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.detailTitle}>Mobile Number</Text>
            <Text style={styles.detailValue}>083873594727</Text>
            <View style={styles.horizontalLine} />
            <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.detailTitle}>Date of Birth</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontSize: 16, fontFamily: 'afacad_SemiBold', color: '#1E1E1E', marginTop: 10 }}>
                    {date.toLocaleDateString()}
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
              </View>
              <View>
                  <Text style={styles.detailTitle}>Gender</Text>
                  <Text style={styles.detailValue}>Male</Text>
                <View style={styles.horizontalLine} />
              </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Address Details</Text>
          <View style={styles.accountDetailWrapper2}>
            <Text style={styles.detailTitle}>Street Address</Text>
            <Text style={styles.detailValue}>Jalur Sutera Barat No.21 Apartemen Pacific Garden</Text>
            <View style={styles.horizontalLine} />
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text style={styles.detailTitle}>City</Text>
                <Text style={styles.detailValue}>Tangerang Selatan</Text>
                <View style={styles.horizontalLine} />
              </View>
              <View style={{ paddingLeft: 40 }}>
                <Text style={styles.detailTitle}>Postal Code</Text>
                <Text style={styles.detailValue}>15314</Text>
                <View style={styles.horizontalLine} />
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontFamily: 'afacad_Bold', color: '#1A47BC' }}>Account Settings</Text>
            <View style={styles.accountDetailWrapper3}>
            <TouchableOpacity>
              <View style={{ flexDirection: 'row'}}>
                <Text style={{ fontSize: 16, fontFamily: 'afacad_Bold', color: '#1E69F2' }}>Logout</Text>
              </View>
            </TouchableOpacity>
            </View>
        </View>
      </Container>
    </ScrollView>
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
    marginBottom: 80,
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
    paddingTop: 70,
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
