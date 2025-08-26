import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { toggleMenu } from 'store/features/uiSlice';

const MenuToggleButton = () => {
  const { menuOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(menuOpen ? 1 : 0, { duration: 300 });
  }, [menuOpen]);

  const menuStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ rotate: `${progress.value * 90}deg` }],
  }));

  // Close Icon Style
  const closeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ rotate: `${(1 - progress.value) * -90}deg` }],
  }));

  return (
    <Pressable onPress={() => dispatch(toggleMenu())}>
      <View className="relative h-9 w-9">
        {/* Menu Icon */}
        <Animated.View style={[menuStyle, { position: 'absolute' }]}>
          <MaterialCommunityIcons name="menu" size={36} color="#fff" />
        </Animated.View>

        {/* Close Icon */}
        <Animated.View style={[closeStyle, { position: 'absolute' }]}>
          <MaterialCommunityIcons name="close" size={36} color="#fff" />
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default MenuToggleButton;
