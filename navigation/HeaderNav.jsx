import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

const HeaderNav = ({title}) => {
    
    const navigation = useNavigation();

  return (
    <View style = {styles.headerContainer}>
        <TouchableOpacity onPress={() => 
            navigation.navigate('Home')
        }>
            <Ionicons name='chevron-back' color="#1A47BC" size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>

    </View>
  )
}

export default HeaderNav

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingTop: 55,
        backgroundColor: '#FFFFFC',
        height: 110,
      },
      title: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'afacad_Bold',
        color: '#1A47BC',
      },
})