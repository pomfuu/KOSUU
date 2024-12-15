import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Card from '../Card';

const SearchFilter = ({ route }) => {
  const { products } = route.params || [];

  const renderCard = ({ item }) => (
    <Card
      id={item.id}
      name={item.name}
      category={item.category}
      price={item.price}
      rating={item.rating}
      description={item.description}
      stock={item.stock}
      material={item.material}
      sizeChart={item.sizeChart}
      dimension={item.dimension}
      condition={item.condition}
      notes={item.notes}
      variant={item.variant}
      size={item.size}
      color={item.color}
      imageURL={item.imageURL}
      showHeader={false}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FBFAF5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
  },
});

export default SearchFilter;
