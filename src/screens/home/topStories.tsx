import React, {useCallback, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '@rneui/base';
import {SearchBar} from '@rneui/themed';
import {useGlobalStore} from '../../store/global';
import Filter from './filter';
import Category from '../../components/category';
import {filterValue} from '../../store/store';
import {primaryColor} from '../../utils/colors';

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
    filterHistory,
  } = useGlobalStore();

  console.log('filterHistory category: ', filterHistory);
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

  function updateFilter(item: filterValue) {
    console.log('item: ', item);

    if (item) {
      setFilterValues(item);
    }
  }

  const renderItemFilter = ({
    item,
    index,
  }: {
    item: filterValue;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => updateFilter(item)}
      style={{
        marginLeft: 20,
        marginBottom: 10,
        backgroundColor: primaryColor,
        padding: 10,
        borderRadius: 10,
      }}>
      <Text style={style.filter}>{`Filter ${index + 1}`}</Text>
    </TouchableOpacity>
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
          <View style={{flexDirection: 'column'}}>
            <FlatList
              renderItem={renderItemFilter}
              data={filterHistory}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
            />
            {/* {filterHistory.map((item, index) => {
              return;
            })} */}
            <View style={{flexDirection: 'row'}}>
              <FlatList
                renderItem={renderItem}
                data={categoryArr}
                horizontal
                style={{
                  width: Dimensions.get('screen').width - 70,
                  marginLeft: 10,
                }}
                showsHorizontalScrollIndicator={false}
              />
              <View style={{flexDirection: 'row'}}>
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
          </View>
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
  filter: {color: 'white'},
});
