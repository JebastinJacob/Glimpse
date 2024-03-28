import React from 'react';
import { View, Image, Text, StyleSheet, NativeSyntheticEvent } from 'react-native';
import WebView from 'react-native-webview';
import ScrollableAppBar from './appbar';

interface CustomWebviewProps {
    route: { params: { url: string,title:string } };
}

const CustomWebview: React.FC<any> = ({ route }) => {
    const { url ,title} = route.params;


  return (
<>
<ScrollableAppBar title={title} isVisible={false}/>
<WebView source={{uri:url}} style={styles.webview}/>
</>

  );
};


const styles = StyleSheet.create({
    webview: {
    
        flex: 1,
      },
});

export default CustomWebview;
