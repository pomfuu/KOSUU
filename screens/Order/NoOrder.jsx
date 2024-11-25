import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoProduct from '../../assets/KOSU/NoProduct.svg'

const NoOrder = () => {
  return (
    <View>
      <NoProduct styles={styles.pos}/>
    </View>
  )
}

export default NoOrder

const styles = StyleSheet.create({
  pos:{
    alignContent: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  }
})