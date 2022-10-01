import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from 'expo-font';

export default function App() {
  let [fontsLoaded] = useFonts({
    'inter-bold': require('./assets/fonts/Inter-Bold.ttf'),
    'inter-regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 30 }}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FC6544',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
