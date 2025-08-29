import { useNavigation } from '@react-navigation/native';
import { MenuItems } from 'constants/MenuItems';
import { useEffect } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoute, setMenuOpen, setShowHiddenFiles } from 'store/features/uiSlice';
import { RootState } from 'store/store';

const SideBar = () => {
  const dispatch = useDispatch();
  const left = useSharedValue(-1);
  const navigation = useNavigation();
  const overlayOpacity = useSharedValue(0);
  const { menuOpen, currentRoute, showHiddenFiles } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    left.value = withTiming(menuOpen ? 0 : -1, { duration: 250 });
    overlayOpacity.value = withTiming(menuOpen ? 0.5 : 0, { duration: 300 });
  }, [menuOpen]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: left.value * 300 }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return (
    <>
      {menuOpen && (
        <Pressable
          onPress={() => dispatch(setMenuOpen(false))}
          className="absolute left-0 top-0 h-full w-full">
          <Animated.View style={[overlayStyle, { backgroundColor: 'black', flex: 1 }]} />
        </Pressable>
      )}

      <Animated.View
        className="absolute left-0 top-0 z-50 h-full w-[60%] bg-primary"
        style={[sidebarStyle]}>
        {MenuItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => {
              dispatch(setMenuOpen(false));
              dispatch(setCurrentRoute(item.route));
              navigation.navigate(item.route);
            }}
            className="flex flex-row items-center gap-3 p-6"
            style={{
              backgroundColor: currentRoute === item.title ? '#86efac' : '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}>
            {currentRoute === item.title ? item.iconFilled : item.icon}
            <Text>{item.title}</Text>
          </Pressable>
        ))}
        <View className="bg-accent mt-4 flex flex-col gap-3">
          <View className="flex-row items-center justify-between rounded-2xl p-3">
            <Text className="text-base font-semibold">Show Hidden Files</Text>
            <Switch
              value={showHiddenFiles}
              onValueChange={(val) => dispatch(setShowHiddenFiles(val))}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default SideBar;
