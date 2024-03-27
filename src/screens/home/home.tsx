import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import { SafeAreaView } from 'react-native';
import NewsCard from '../../components/card';
import { FlatList } from 'react-native';
import { NewsArticle } from '../../models/homeModel';
import { useGlobalStore } from '../../store/global';


const json = require("../../../dummy.json")


const Home = () => {
  const { headlines, setHeadlines } = useGlobalStore();
const getNewsData =async () =>{
  const response = await api.get<any>('top-headlines?country=in')
  setHeadlines(response.articles);
}


useEffect(() => {
  getNewsData()
}, [])


const renderItem = ({ item }: { item: NewsArticle }) => (
  <NewsCard NewsArticle={item} /> // Assuming NewsCard takes an 'article' prop
);


  return (
    <SafeAreaView style ={styles.container}>

      {headlines &&  <FlatList data={headlines} renderItem={renderItem}  scrollEnabled />}

    </SafeAreaView>
      // <ScrollableAppBar title="Glimpse" />
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

Home.propTypes = {};

export default Home;
