import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import api from '../../utils/api';
import {SafeAreaView} from 'react-native';
import NewsCard from '../../components/newsCard';
import {FlatList} from 'react-native';
import {NewsArticle} from '../../models/homeModel';
import {useGlobalStore} from '../../store/global';
import ScrollableAppBar from '../../components/appbar';
import TopStories from './topStories';
import {retrieveNewsArticles, storeData} from '../../database/asyncstorage';
import SkeletonCard from '../../components/skeleton';
import {showToast} from '../../utils/toast';

const Home = () => {
  const {headlines, search, setHeadlines, isNetwork, filterValues, category} =
    useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);

  const getNewsData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (isNetwork) {
        //setting the  endpoint
        var searchEndpoint = 'top-headlines?country=in&pageSize=10';
        if (search != '' && category == 'all')
          searchEndpoint = `everything?q=${search}&from=${filterValues.fromDate}&to=${filterValues.toDate}&sortBy=${filterValues.type}`;
        else if (category !== 'all')
          searchEndpoint = `top-headlines?category=${category}&q=${search}&from=${filterValues.fromDate}&to=${filterValues.toDate}&sortBy=${filterValues.type}`;
        else searchEndpoint = 'top-headlines?country=in&pageSize=10';

        const response = await api.get<any>(searchEndpoint);
        setHeadlines(response.articles);
        storeData('headlines', response.articles);
      } else {
        try {
          const articles = await retrieveNewsArticles();
          if (articles) {
            setHeadlines(articles); // Dispatch action only if articles exist
          } else {
            showToast('No news articles found');
          }
        } catch (error) {
          showToast('Something went wrong');
          console.error('Error retrieving news articles:', error);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      showToast(error.message);
      setIsLoading(false);
    }
  }, [search, isNetwork, category, filterValues]);

  useEffect(() => {
    getNewsData();
  }, [search, isNetwork, category, filterValues]);

  const [scrolling, setScrolling] = useState<boolean>(false);
  const [initialPos, setInitialPos] = useState<boolean>(false);

  useEffect(() => {
    getNewsData();
  }, []);

  const renderItem = ({item}: {item: NewsArticle}) => (
    <NewsCard NewsArticle={item} /> // Assuming NewsCard takes an 'article' prop
  );

  const handleScroll = () => {
    setScrolling(true);
  };

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<any>;
  }) => {
    const firstVisibleIndex = viewableItems[0]?.index;

    if (firstVisibleIndex === 0) {
      setInitialPos(true);
    } else if (scrolling) {
      setInitialPos(false);
      setScrolling(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollableAppBar title={'Glimpse'} isVisible={!initialPos} />
      {isNetwork && <TopStories visible={initialPos} />}
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <>
          {headlines.length === 0 ? (
            <Text style={styles.noFoundText}>No News Found</Text>
          ) : (
            <View style={styles.spacing}>
              <FlatList
                data={headlines}
                renderItem={renderItem}
                scrollEnabled
                onScroll={handleScroll}
                onViewableItemsChanged={handleViewableItemsChanged}
                keyboardDismissMode={'on-drag'}
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacing: {
    marginVertical: 20,
  },
  noFoundText: {
    color: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});

Home.propTypes = {};

export default Home;
