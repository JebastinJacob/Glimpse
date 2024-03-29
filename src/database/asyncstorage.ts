import AsyncStorage from '@react-native-async-storage/async-storage';
import {NewsArticle} from '../models/homeModel';

// Type to represent stored data (adapt to your specific needs)
interface StoredData {
  // ... your data properties here
  key1: string;
  key2: number;
}

/**
 * Stores data in AsyncStorage.
 * @param key The key to store the data under.
 * @param data The data to store.
 */
const storeData = async (key: string, data: any): Promise<void> => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error storing data in AsyncStorage:', error);
  }
};

/**
 * Retrieves data from AsyncStorage.
 * @param key The key to retrieve data for.
 * @returns The stored data or null if not found.
 */
const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const serializedData = await AsyncStorage.getItem(key);
    console.log(serializedData);
    if (!serializedData) return null;
    const data = JSON.parse(serializedData) as T;
    return data;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    return null;
  }
};

export const retrieveNewsArticles = async (): Promise<NewsArticle[] | null> => {
  try {
    const serializedData = await AsyncStorage.getItem('newsArticles'); // Assuming key is 'newsArticles'
    if (!serializedData) {
      return null; // No data found
    }

    const data: NewsArticle[] = JSON.parse(serializedData);
    return data;
  } catch (error) {
    console.error('Error retrieving news articles from AsyncStorage:', error);
    return null;
  }
};

/**
 * Retrieves data from AsyncStorage.
 * @param key The key to retrieve data for.
 * @returns The stored data or null if not found.
 */
const removeKey = async <T>(key: string): Promise<T | null> => {
  try {
    const serializedData = await AsyncStorage.removeItem(key);

    return null;
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
    return null;
  }
};

export {storeData, getData, removeKey};
