import React, { useState } from 'react';
import { SearchBar as RNE_SearchBar } from 'react-native-elements';

const CustomSearchBar = () => {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <RNE_SearchBar
      placeholder="Search any cosplay product"
      onChangeText={updateSearch}
      value={search}
      clearIcon={{ color: '#1A47BC', name: 'close' }}
      onClear={() => updateSearch('')}
      containerStyle={{
        backgroundColor: '#FBFAF5',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingHorizontal: 0,
      }}
      inputContainerStyle={{
        backgroundColor: '#F3F0E1',
        borderRadius: 5,
        height: 45,
      }}
      inputStyle={{
        fontSize: 16,
        fontFamily: 'afacad_Medium',
        color: '#1E1E1E',
      }}
      leftIconContainerStyle={{
        paddingLeft: 10,
      }}
      rightIconContainerStyle={{
        paddingRight: 10,
      }}
    />
  );
};

export default CustomSearchBar;
