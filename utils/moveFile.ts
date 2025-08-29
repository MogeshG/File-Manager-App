import * as FileSystem from 'expo-file-system';

export const moveFile = async (sourcePath: string, destinationPath: string): Promise<boolean> => {
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

    await FileSystem.moveAsync({
      from: sourcePath,
      to: destinationPath,
    });

    return true;
  } catch (error) {
    console.error('Error moving file:', error);
    return false;
  }
};
