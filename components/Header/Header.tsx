import { View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import SearchBar from 'components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setSearchOpen, toggleMenu } from 'store/features/uiSlice';
import MenuToggleButton from './MenuToggleButton';

const Header = () => {
  const dispatch = useDispatch();
  const { searchOpen } = useSelector((state: RootState) => state.ui);

  return (
    <View className="bg-primary flex h-[5rem] flex-row items-center justify-between px-4">
      <MenuToggleButton />
      {searchOpen ? (
        <SearchBar />
      ) : (
        <Feather
          name="search"
          size={30}
          color="#fff"
          onPress={() => dispatch(setSearchOpen(true))}
        />
      )}
    </View>
  );
};

export default Header;
