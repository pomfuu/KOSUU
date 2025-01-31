import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import utilityStyles from './utils/styles';
import LandingLogo from './assets/KOSU/landingPageLogo.svg';
import { Home, Profile, Wishlist } from './screens';
import ButtonTabNavigation from './navigation/ButtonTabNavigation';
import CustomText from './styles/CustomText';
import CardDetail from './components/CardDetail';
import LandingPageOne from './screens/Login/LandingPageOne';
import LandingPageTwo from './screens/Login/LandingPageTwo';
import LandingPageThree from './screens/Login/LandingPageThree';
import Login from './screens/Login/Login';
import Register from './screens/Login/Register';
import Rating from './screens/Rating/Rating';
import { AuthProvider } from './authcontext';
import Checkout from './screens/Checkout/Checkout';
import DebitCard from './screens/Checkout/DebitCard';
import VirtualAccount from './screens/Checkout/VirtualAccount';
import OrderConfirmation from './screens/Checkout/OrderConfirmation';
import SearchList from './components/Search/SearchList';
import SearchEmpty from './components/Search/SearchEmpty';
import SearchFilter from './components/Search/SearchFilter';
import FilteredCategories from './screens/Home/FilteredCategories';
import ForgetPassword from './screens/Login/ForgetPassword';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Text strings must be rendered within a Text component',
]);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    neue_Regular: require("./assets/font/montreal/NeueMontreal-Regular.otf"),
    neue_Medium: require("./assets/font/montreal/NeueMontreal-Medium.otf"),
    afacad_Regular: require("./assets/font/afacad/static/Afacad-Regular.ttf"),
    afacad_Medium: require("./assets/font/afacad/static/Afacad-Medium.ttf"),
    afacad_SemiBold: require("./assets/font/afacad/static/Afacad-SemiBold.ttf"),
    afacad_Bold: require("./assets/font/afacad/static/Afacad-Bold.ttf"),
    neue: require("./assets/font/montreal/NeueMontreal-Medium.otf")
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

    <AuthProvider>
      <NavigationContainer style={[styles.textStyle, styles.container]}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Bottom Navigation'
            component={ButtonTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SearchFilter'
            component={SearchFilter}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SearchEmpty'
            component={SearchEmpty}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Wishlist'
            component={Wishlist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SearchList'
            component={SearchList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Checkout'
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='VirtualAccount'
            component={VirtualAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='DebitCard'
            component={DebitCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='OrderConfirmation'
            component={OrderConfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CardDetail" 
            component={CardDetail}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='Profile'
            component={Profile}
          />
          <Stack.Screen
            name='LandingPageOne'
            component={LandingPageOne}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='LandingPageTwo'
            component={LandingPageTwo}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='Rating'
            component={Rating}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='LandingPageThree'
            component={LandingPageThree}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='Register'
            component={Register}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='FilteredCategories'
            component={FilteredCategories}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name='ForgetPassword'
            component={ForgetPassword}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
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
