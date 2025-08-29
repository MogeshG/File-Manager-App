import * as FileSystem from 'expo-file-system';

export const copyFile = async (sourcePath: string, destinationPath: string): Promise<boolean> => {
  try {
    const sourceInfo = await FileSystem.getInfoAsync(sourcePath);
    if (!sourceInfo.exists) {
      console.error('Source does not exist:', sourcePath);
      return false;
    }

    const destFolder = destinationPath.substring(0, destinationPath.lastIndexOf('/') + 1);
    const destFolderInfo = await FileSystem.getInfoAsync(destFolder);
    if (!destFolderInfo.exists) {
      await FileSystem.makeDirectoryAsync(destFolder, { intermediates: true });
    }

    await FileSystem.copyAsync({
      from: sourcePath,
      to: destinationPath,
    });

    return true;
  } catch (error) {
    console.error('Error copying file:', error);
    return false;
  }
};
