import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NewsArticle } from '../models/homeModel';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const placeHolder = require('../assets/placeholder.png')
interface NewsCardProps {
    NewsArticle : NewsArticle
}

type RootStackParamList = {
  Webview: { url: string ,title:string}; // Define the parameter types for your routes here
  // Add other routes as needed
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Webview'>;


const NewsCard: React.FC<NewsCardProps> = ({ NewsArticle }) => {
  
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const handleNavigate = () => {
    // navigation.navigate('Webview',);
    navigation.navigate('Webview', { url: NewsArticle.url,title: ""});
  };


  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleNavigate}>
      <Image source={NewsArticle.urlToImage == null ? placeHolder:{ uri: NewsArticle.urlToImage }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardHeading}>{NewsArticle.title}</Text>
        <Text style={styles.cardParagraph}>{NewsArticle.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow for iOS
    marginBottom: 16, // Add margin below the card
    marginHorizontal:12
  },
  cardImage: {
    width: '95%', // Set image width to 95%
    height: 150, // Set image height to 150px
    resizeMode: 'cover', // Resize image to cover the container
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
});

export default NewsCard;
