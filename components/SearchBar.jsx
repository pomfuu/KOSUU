import React, { useState } from 'react';
import { SearchBar as RNE_SearchBar } from 'react-native-elements';
import { View, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CustomSearchBar = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const updateSearch = (search) => {
    setSearch(search);
  };

  const handleSearch = () => {
    if (onSearchChange) {
      onSearchChange(search || '');
    }
  };

  const handleTap = () => {
    Keyboard.dismiss();
    navigation.navigate('SearchList', { query: search });
  };

  return (
    <View>
      <RNE_SearchBar
        placeholder="Search any cosplay product"
        onChangeText={updateSearch}
        value={search}
        clearIcon={
          <Icon
            name="close"
            type="material"
            color="#1A47BC"
            onPress={() => {
              setSearch('');
              onSearchChange('');
            }}
          />
        }
        containerStyle={{
          backgroundColor: '#FBFAF5',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          paddingHorizontal: 0,
        }}
        inputContainerStyle={{
          backgroundColor: '#F3F0E1',
          borderRadius: 5,
          height: 35,
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
        onSubmitEditing={handleSearch}
        onFocus={handleTap}
      />
    </View>
  );
};

export default CustomSearchBar;
