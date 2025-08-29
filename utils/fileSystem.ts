import * as FileSystem from 'expo-file-system';

const fileSystem = async () => {
  try {
    const directories = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    return directories;
  } catch (error) {
    console.error(error);
  }
};

export default fileSystem;
