import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useRef, useCallback, useMemo, useState, useEffect} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import {useRecoilState, useRecoilValue} from 'recoil';
import {LocationCoordState} from '../atom/location';
import {useAuth} from '../hooks/useAuth';
import {useFirebase} from '../firebase/useFirebase';
import {UserData} from '../atom/userData';
import {checkPermission} from '../util/checkPermission';

const LocationShare = () => {
  const BottomSheetRef = useRef<BottomSheet>(null);
  const [hide, setHide] = useState(false);
  const [changeBtnText, setChangeBtnText] = useState('Байршил хуваалцах');
  const [locationShareStatus, setLocationShareStatus] = useState(
    'Та байршлаа хуваалцаагүй байна',
  );
  const [phoneLocation, setPhoneLocation] = useRecoilState(LocationCoordState);
  const {user} = useAuth();
  const {activateUser, updateDocument} = useFirebase('Drivers');
  const userData = useRecoilValue(UserData);

  //when user just logged in, then get position
  useEffect(() => {
    checkPermission();
    if (user) getPosition();
  }, [user]);

  const getPosition = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
          setPhoneLocation({latitude, longitude});
          updateDocument(user?.uid as string, {latitude, longitude});
          setChangeBtnText('Зогсоох');
          setLocationShareStatus('Та байршлаа хуваалцсан байна');
        });
      }
    });
  };

  // variables
  const snapPoints = useMemo(() => ['25%', '60%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) setHide(true);
    if (index === 1) setHide(false);
  }, []);

  const shareLocationHandler = () => {
    if (changeBtnText === 'Байршил хуваалцах') getPosition();
    if (changeBtnText === 'Зогсоох') {
      console.log('HOW TO STOP SHARE lOCATION??? Do something');

      openSettings().catch(() => console.warn('cannot open settings'));
    }
  };

  const logoutHandler = async () => {
    auth()
      .signOut()
      .then(() => {});

    activateUser(user?.uid as string, false);
  };

  // console.log(phoneLocation);

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
              className="w-12 h-12 rounded-full"
            />
            <View className="flex space-y-1">
              <View className="flex flex-row items-center space-x-2">
                <Text className="text-black font-bold">
                  {userData?.firstName}
                </Text>
                <Text className="text-black font-bold">
                  {userData?.lastName}
                </Text>
              </View>
              {hide && (
                <Text className="text-gray-500">{locationShareStatus}</Text>
              )}
            </View>
          </View>
          {!hide && (
            <View className="flex items-center justify-center space-y-4">
              <Pressable
                className="bg-black rounded-lg px-4 py-2 w-[200px]"
                onPress={shareLocationHandler}>
                <Text className="text-bold text-white text-center">
                  {changeBtnText}
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
