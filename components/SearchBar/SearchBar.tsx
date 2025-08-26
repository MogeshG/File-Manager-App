import { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setSearchOpen } from 'store/features/uiSlice';
import { setSearch } from 'store/features/dataSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.data);
  const searchRef = useRef<TextInput>(null);
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(0.6, { duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value * 100}%`,
    };
  });

  const closeSearch = () => {
    dispatch(setSearchOpen(false));
  };

  return (
    <Animated.View style={animatedStyle} className="relative overflow-hidden">
      <TextInput
        ref={searchRef}
        value={search}
        onChangeText={(val) => dispatch(setSearch(val))}
        placeholder="Search..."
        autoFocus
        onBlur={() => {
          if (search.length === 0) {
            width.value = withTiming(0, { duration: 300 }, () => {
              runOnJS(closeSearch)();
            });
          }
        }}
        className="w-full rounded-full bg-white px-9"
      />

      <Feather className="absolute left-[8px] top-[15%]" name="search" size={20} color="#1f1f1f" />

      {search.length > 0 && (
        <AntDesign
          className="absolute right-[8px] top-[15%]"
          name="close"
          size={20}
          color="black"
          onPress={() => dispatch(setSearch(''))}
        />
      )}
    </Animated.View>
  );
};

export default SearchBar;
