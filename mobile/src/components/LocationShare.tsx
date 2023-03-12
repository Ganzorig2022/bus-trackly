import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useCallback, useMemo, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';

const LocationShare = () => {
  const BottomSheetRef = useRef<BottomSheet>(null);
  const [hide, setHide] = useState(false);

  // variables
  const snapPoints = useMemo(() => ['15%', '35%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) setHide(true);
    if (index === 1) setHide(false);
  }, []);

  const logoutHandler = async () => {
    auth()
      .signOut()
      .then(() => {});
  };

  const shareLocationHandler = () => {};

  return (
    <View className="flex-1 p-6">
      <BottomSheet
        ref={BottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View className="flex items-center justify-center space-y-4 mt-2">
          <View
            className={`${
              hide ? 'flex-row justify-center space-x-2' : 'flex-col space-y-4'
            } items-center`}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
              }}
              // style={{resizeMode: 'contain'}}
              className="w-12 h-12 rounded-full"
            />
            <View className="flex space-y-1">
              <View className="flex flex-row items-center space-x-2">
                <Text className="text-black font-bold">Ганболд</Text>
                <Text className="text-black font-bold">Насанбат</Text>
              </View>
              {hide && (
                <Text className="text-gray-500">
                  Та байршлаа хуваалцаагүй байна
                </Text>
              )}
            </View>
          </View>
          {!hide && (
            <View className="flex items-center justify-center space-y-4">
              <Pressable
                className="bg-black rounded-lg px-4 py-2 w-[200px]"
                onPress={shareLocationHandler}>
                <Text className="text-bold text-white text-center">
                  Байршил хуваалцах
                </Text>
              </Pressable>
              <Pressable
                className="rounded-lg px-4 py-2 w-[200px] border border-black"
                onPress={logoutHandler}>
                <Text className="text-bold text-black text-center">Гарах</Text>
              </Pressable>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default LocationShare;

const styles = StyleSheet.create({});
