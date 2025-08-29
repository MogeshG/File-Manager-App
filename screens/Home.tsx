import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import fileSystem from 'utils/fileSystem';
import FileGrid from 'components/FileGrid';
import Feather from '@expo/vector-icons/Feather';

const Home = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [listView, setListView] = useState(false);
  const getFiles = async () => {
    const directories = (await fileSystem()) || [];
    setFiles(directories);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <View className="flex h-full w-full flex-col p-2">
      <View className="flex flex-row justify-between px-6">
        <Text>Settings</Text>
        {listView ? (
          <Feather name="list" size={28} color="black" onPress={() => setListView(false)} />
        ) : (
          <Feather name="grid" size={28} color="black" onPress={() => setListView(true)} />
        )}
      </View>
      <FileGrid listView={listView} />
    </View>
  );
};

export default Home;
