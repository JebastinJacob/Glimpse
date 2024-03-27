import React from 'react';
import { View, Image, Text, StyleSheet, NativeSyntheticEvent } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewErrorEvent } from 'react-native-webview/lib/RNCWebViewNativeComponent';
import { WebViewError } from 'react-native-webview/lib/WebViewTypes';
import ScrollableAppBar from './appbar';

interface CustomWebviewProps {
    route: { params: { url: string,title:string } };
}

const CustomWebview: React.FC<any> = ({ route }) => {
    const { url ,title} = route.params;
    console.log(url)
    const error =(event:NativeSyntheticEvent<WebViewError>)=>{
        console.log(event)
    }

  return (
<>
<ScrollableAppBar title={title} isVisible={false}/>
<WebView source={{uri:url}} style={styles.webview} onError={error}/>
</>

  );
};


const styles = StyleSheet.create({
    webview: {
    
        flex: 1,
      },
});

export default CustomWebview;
