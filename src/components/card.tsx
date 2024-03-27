import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NewsArticle } from './../models/homeModel';

interface NewsCardProps {
    NewsArticle : NewsArticle
}

const NewsCard: React.FC<NewsCardProps> = ({ NewsArticle }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: NewsArticle.urlToImage }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardHeading}>{NewsArticle.title}</Text>
        <Text style={styles.cardParagraph}>{NewsArticle.description}</Text>
      </View>
    </View>
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
