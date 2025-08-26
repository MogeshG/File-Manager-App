import { useNavigation } from '@react-navigation/native';
import { MenuItems } from 'constants/MenuItems';
import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from 'store/features/uiSlice';
import { RootState } from 'store/store';

const SideBar = ({ currentRoute }: { currentRoute: string }) => {
  const dispatch = useDispatch();
  const left = useSharedValue(1);
  const navigation = useNavigation();
  const overlayOpacity = useSharedValue(0);
  const { menuOpen } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    left.value = withTiming(menuOpen ? 0 : 1, { duration: 250 });
    overlayOpacity.value = withTiming(menuOpen ? 0.5 : 0, { duration: 300 });
  }, [menuOpen, overlayOpacity, left]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: `${-left.value * 100}%`,
    };
  });

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return (
    <>
      {menuOpen && (
        <Pressable
          onPress={() => dispatch(setMenuOpen(false))}
          className="absolute left-0 top-0 h-screen w-screen">
          <Animated.View style={overlayStyle} className="h-full w-full bg-black" />
        </Pressable>
      )}
      <Animated.View
        style={animatedStyle}
        className="bg-primary flex h-screen w-[60%] flex-col gap-2 overflow-hidden">
        {MenuItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => {
              dispatch(setMenuOpen(false));
              navigation.navigate(item.route);
            }}
            className={`border-3 flex w-full flex-row items-center gap-3 border-white  px-3 py-4 ${currentRoute === item.title ? 'bg-green-300' : 'bg-white'}`}>
            {item.icon}
            <Text>{item.title}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </>
  );
};

export default SideBar;
