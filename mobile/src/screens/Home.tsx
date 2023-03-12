import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Map from '../components/Map';
import LocationShare from '../components/LocationShare';

const Home = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="mx-5 my-10">
        <Text className="font-bold text-xl text-black">Миний байршил</Text>
      </View>
      <Map />
      <LocationShare />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
