import {Text} from '@rneui/base';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import ScrollableAppBar from '../../components/appbar';
import {useGlobalStore} from '../../store/global';

const placeHolder = require('../../assets/placeholder.png');

type RootStackParamList = {
  Webview: {url: string; title: string}; // Define the parameter types for your routes here
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Webview'>;

export default function NewsScreen({route}: any) {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {isNetwork, headlines} = useGlobalStore();

  const NewsArticle =
    route.params != undefined
      ? route.params.NewsArticle
      : headlines
      ? headlines[0]
      : [];

  const date = new Date(NewsArticle!.publishedAt);
  const handleNavigate = () => {
    navigation.navigate('Webview', {url: NewsArticle.url, title: ''});
  };

  //function to formate the date
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${date.getFullYear()}-${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  return (
    <>
      <ScrollableAppBar title={''} isVisible={false} />

      {headlines ? (
        <>
          <Image
            source={
              NewsArticle.urlToImage == null
                ? placeHolder
                : {uri: NewsArticle.urlToImage}
            }
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardHeading}>{NewsArticle.title}</Text>
            <Text style={styles.cardParagraph}>{NewsArticle.description}</Text>
            <Text style={styles.timeParagraph}>{formattedDate}</Text>
            <Text style={styles.timeParagraph}>{NewsArticle.content}</Text>
            {isNetwork && (
              <TouchableOpacity onPress={handleNavigate}>
                <Text style={styles.readParagraph}>Read More</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <Text>No News Available Now</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow for iOS
    marginBottom: 16, // Add margin below the card
    marginHorizontal: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImage: {
    width: '100%', // Set image width to 95%
    height: 150, // Set image height to 150px
    resizeMode: 'cover', // Resize image to cover the container
    alignSelf: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 16, // Add padding to content area
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold', // Set heading to bold
  },
  cardParagraph: {
    fontSize: 14,
    color: 'gray', // Set paragraph text to light gray
  },
  timeParagraph: {
    marginTop: 7,
    fontSize: 12,
    color: 'black', // Set paragraph text to light gray
  },
  readParagraph: {
    marginTop: 7,
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue', // Set paragraph text to light gray
  },
});
