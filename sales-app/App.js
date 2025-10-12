import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import AppTabs from './src/view/components/navigator/HomeNav';
import { AuthProvider } from './src/view/components/authProvider/AuthProvider';
import LoginView from './src/view/LoginView';
import SplashView from './src/view/SplashView';
import HomeNav from './src/view/components/navigator/HomeNav';

const RootStack = createNativeStackNavigator();

export default function App() {

  return (

    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Splash" component={SplashRoute} />
            <RootStack.Screen name="Login" component={LoginView} />
            <RootStack.Screen name="AppTabs" component={HomeNav} />
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function SplashRoute({ navigation }) {
  return <SplashView View onFinish={() => navigation.replace('Login')} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
