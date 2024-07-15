import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import utilityStyles from './utils/styles';
import LandingLogo from './assets/KOSU/landingPageLogo.svg';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    neue_Regular: require("./assets/font/montreal/NeueMontreal-Regular.otf"),
    neue_Medium: require("./assets/font/montreal/NeueMontreal-Medium.otf"),
    afacad_Regular: require("./assets/font/afacad/static/Afacad-Regular.ttf"),
    afacad_Medium: require("./assets/font/afacad/static/Afacad-Medium.ttf"),
    afacad_SemiBold: require("./assets/font/afacad/static/Afacad-SemiBold.ttf"),
    afacad_Bold: require("./assets/font/afacad/static/Afacad-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <LandingLogo width={150}/>
      {/* <Text style={[utilityStyles.fs5, styles.textStyle]}>Hello!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'afacad_Regular',
    color: '#1E1E1E'
  },
});
