import React, {useCallback, useEffect, useState} from 'react';
import CustomText from '../../components/text';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {Icon, Input} from '@rneui/base';
import {SearchBar} from '@rneui/themed';
import {useDebounce} from '../../utils/debounce';
import {useGlobalStore} from '../../store/global';
import Filter from './filter';
import Category from '../../components/category';

interface TopStoriesProp {
  visible: boolean;
}

export default function TopStories({visible}: TopStoriesProp) {
  const {
    search,
    setSearch,
    headlines,
    setFilter,
    openFilter,
    category,
    setCategory,
  } = useGlobalStore();

  // Call useDebounce hook to create a debounced version of setSearch
  const debouncedSetSearch = useDebounce(search, 500);

  const updateSearch = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);
      console.log(headlines.length);
    },
    [search],
  );
  const categoryArr = [
    'all',
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  useEffect(() => {
    setTimeout(() => {
      console.log('update state', category);
    }, 1000);
  }, [category]);

  const renderItem = ({item}: {item: string}) => (
    <Category name={item} category={category} /> // Assuming NewsCard takes an 'article' prop
  );

  return (
    <Animated.View style={[{position: 'relative'}]}>
      {/* <CustomText text="Top Stories" fontSize={20} color={'#002010'} /> */}
      <View style={{backgroundColor: 'transparent'}}>
        <SearchBar
          placeholder="Search Headlines..."
          onChangeText={updateSearch}
          value={search}
          inputContainerStyle={style.inputContainer}
          style={style.default}
          containerStyle={style.container}
          leftIconContainerStyle={style.transparent}
          searchIcon={false}
          cancelIcon={false}
          clearIcon={false}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <FlatList
            renderItem={renderItem}
            data={categoryArr}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Icon
            name={'filter'}
            type="font-awesome"
            onPress={() => {
              console.log('clciked'), setFilter(true);
            }}
          />
        </View>
      </View>
      <Filter isVisible={openFilter} />
    </Animated.View>
  );
}

const style = StyleSheet.create({
  transparent: {backgroundColor: 'transparent'},
  container: {backgroundColor: 'transparent', borderColor: 'transparent'},
  default: {backgroundColor: 'white', borderColor: 'transparent'},
  inputContainer: {backgroundColor: 'transparent', borderRadius: 50},
});
