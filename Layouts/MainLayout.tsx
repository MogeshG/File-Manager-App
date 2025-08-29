import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header/Header';
import SideBar from 'components/SideBar/SideBar';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home';
import OtherScreen from 'screens/Other';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setShowHiddenFiles } from 'store/features/uiSlice';

const Stack = createStackNavigator();

export default function MainLayout() {
  const dispatch = useDispatch();

  const setHiddenFiles = async () => {
    const showHidden = (await AsyncStorage.getItem('showHidden')) || false;
    dispatch(setShowHiddenFiles(showHidden));
  };

  useEffect(() => {
    setHiddenFiles();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1">
        <Header />

        <View className="flex-1 flex-row">
          <View className="flex-1">
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Other" component={OtherScreen} />
            </Stack.Navigator>
          </View>

          <SideBar />
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
