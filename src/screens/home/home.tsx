import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {BackHandler, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View} from 'react-native';

import api from '../../utils/api';
import { SafeAreaView } from 'react-native';
import NewsCard from '../../components/newsCard';
import { FlatList } from 'react-native';
import { NewsArticle } from '../../models/homeModel';
import { useGlobalStore } from '../../store/global';
import ScrollableAppBar from '../../components/appbar';
import TopStories from './topStories';



const json = require("../../../dummy.json")


const Home = () => {
  const { headlines,search, setHeadlines } = useGlobalStore();

  const getNewsData = useCallback(async () => {
  
    try {
      const response = await api.get<any>(search == "" ?'top-headlines?country=in&pageSize=10' : `everything?q=${search}`);
      setHeadlines(response.articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }


  }, [search]);

  useEffect(() => {
    getNewsData()
  }, [search])
  

const [scrolling, setScrolling] = useState<boolean>(false);
const [initialPos, setInitialPos] = useState<boolean>(false);


useEffect(() => {
  getNewsData()
}, [])

  

const renderItem = ({ item }: { item: NewsArticle }) => (
  <NewsCard NewsArticle={item} /> // Assuming NewsCard takes an 'article' prop
);

const handleScroll = () => {
  setScrolling(true);
};


const handleViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<any> }) => {
  const firstVisibleIndex = viewableItems[0]?.index; 

  if (firstVisibleIndex === 0) {
    setInitialPos(true)
    console.log('Scrolled to first index!');
    // Trigger your first index event here
  } else if (scrolling) {
    setInitialPos(false)
    console.log('Started scrolling!');
    // Trigger your scrolling event here
    setScrolling(false);
  }
};


  return (
    <SafeAreaView style ={styles.container}>
      <ScrollableAppBar title={'Glimpse'}  isVisible={!initialPos}/>
      {headlines &&  <TopStories visible={initialPos}/>}
     <View style={styles.spacing}> 
        <FlatList data={headlines} renderItem={renderItem}  scrollEnabled  onScroll={handleScroll}
      onViewableItemsChanged={handleViewableItemsChanged} keyboardDismissMode={"on-drag"}/>
      </View>
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacing:{
    marginVertical:20
  }
});

Home.propTypes = {};

export default Home;
