import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Categories</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Costume Set</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Accessories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bags</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Shoes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Properties</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Other</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
  button: {
    flex: 1,
    marginRight: 3,
    backgroundColor: '#1A47BC',
    borderRadius: 5,
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FBFAF5',
    fontSize: 12,
  },
  textHeader:{
    color: '#1A47BC',
    fontSize: 16, 
    fontFamily:'afacad_Bold',
    alignItems:'flex-start',
    justifyContent:'flex-start',
  }
})
