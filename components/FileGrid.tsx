import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { addHistory, removeLastHistory } from 'store/features/uiSlice';

interface FileItem {
  name: string;
  isDir: boolean;
  path: string;
}

export default function FileExplorer({ listView }: { listView: boolean }) {
  const { history } = useSelector((state: RootState) => state.ui);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(FileSystem.documentDirectory!);
  const dispatch = useDispatch();

  const setHistory = (current: string) => {
    dispatch(addHistory(current));
  };

  const fetchFiles = async (path: string) => {
    try {
      const fileNames = await FileSystem.readDirectoryAsync(path);

      const fileDetails: FileItem[] = await Promise.all(
        fileNames.map(async (file) => {
          const filePath = path + file;
          const info = await FileSystem.getInfoAsync(filePath);
          return { name: file, isDir: info.isDirectory, path: filePath };
        })
      );

      setFiles(fileDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const getIcon = (fileName: string, isDir: boolean) => {
    if (isDir) return 'folder';
    if (fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return 'image';
    if (fileName.match(/\.(mp4|mov|avi|mkv)$/i)) return 'video';
    if (fileName.match(/\.(mp3|wav|ogg)$/i)) return 'music';
    if (fileName.match(/\.(pdf|docx?|txt)$/i)) return 'file-text';
    return 'file';
  };

  const handlePress = (file: FileItem) => {
    if (file.isDir) {
      setHistory(currentPath);
      setCurrentPath(file.path + '/');
    } else {
      console.log('File clicked:', file.path);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevPath = history[history.length - 1];
      setCurrentPath(prevPath);
      dispatch(removeLastHistory());
    }
  };

  return (
    <View className="flex-1">
      <View className="p-2">
        <Button title="Back" onPress={goBack} disabled={history.length === 0} />
        <Text className="mt-2 text-sm text-gray-500">
          {currentPath?.replace(FileSystem.documentDirectory!, '~')}
        </Text>
      </View>

      <ScrollView className="p-2">
        <View className={listView ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4'}>
          {files.map((file) => (
            <TouchableOpacity
              key={file.name}
              className={
                listView
                  ? 'flex-row items-center gap-4 rounded-xl bg-gray-200 p-4'
                  : 'w-[30%] items-center rounded-xl bg-gray-200 p-4'
              }
              onPress={() => handlePress(file)}>
              <Feather name={getIcon(file.name, file.isDir)} size={28} color="black" />
              <Text
                className={listView ? 'flex-1 text-base' : 'mt-2 text-center text-sm'}
                numberOfLines={2}
                ellipsizeMode="tail">
                {file.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
