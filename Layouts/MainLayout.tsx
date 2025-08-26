import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header/Header';
import SideBar from 'components/SideBar/SideBar';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/Home';
import OtherScreen from 'screens/Other';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Stack = createNativeStackNavigator();

export default function MainLayout() {
  const currentRoute = useSelector((state: RootState) => state.ui.currentRoute);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <SideBar currentRoute={currentRoute} />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Other" component={OtherScreen} />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
