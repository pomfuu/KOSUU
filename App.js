import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import utilityStyles from './utils/styles';
import LandingLogo from './assets/KOSU/landingPageLogo.svg';
import { Wishlist } from './screens';
import ButtonTabNavigation from './navigation/ButtonTabNavigation';
import CustomText from './styles/CustomText';
import CardDetail from './components/CardDetail';

const Stack = createNativeStackNavigator();

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

  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.style =  { fontFamily: 'afacad_Medium' }
  
  return (
    <NavigationContainer style={[styles.textStyle, styles.container]}>
      <Stack.Navigator>
        <Stack.Screen
          name='Bottom Navigation'
          component={ButtonTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Wishlist'
          component={Wishlist}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CardDetail" 
          component={CardDetail}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'afacad_Bold',
    color: '#1E1E1E'
  },
});
