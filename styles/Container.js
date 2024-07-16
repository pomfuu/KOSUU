import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FBFAF5'
  },
});

export default Container;
