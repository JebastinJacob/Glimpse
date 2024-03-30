import React, {useCallback, useEffect} from 'react';
import {Animated, FlatList, StyleSheet, View} from 'react-native';
import {Icon} from '@rneui/base';
import {SearchBar} from '@rneui/themed';
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
    setFilterValues,
  } = useGlobalStore();

  const updateSearch = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);
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

  const renderItem = ({item}: {item: string}) => (
    <Category name={item} category={category} /> // Assuming NewsCard takes an 'article' prop
  );

  return (
    <Animated.View style={[{position: 'relative'}]}>
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
              setFilter(true);
            }}
          />
          <Icon
            name={'cancel'}
            type="material"
            onPress={() => {
              setCategory('all');
              setSearch('');
              setFilterValues({
                fromDate: '',
                toDate: '',
                type: '',
              });
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
