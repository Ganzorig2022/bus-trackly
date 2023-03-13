import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useRecoilState} from 'recoil';
import {LocationCoordState} from '../atom/location';
import {useFirebase} from '../firebase/useFirebase';
import {useAuth} from '../hooks/useAuth';

const Map = () => {
  const [phoneLocation, setPhoneLocation] = useRecoilState(LocationCoordState);
  const {user} = useAuth();
  const {updateDocument} = useFirebase('Drivers');

  const onDragEnd = (e: MarkerDragStartEndEvent) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setPhoneLocation({
      latitude,
      longitude,
    });

    updateDocument(user?.uid as string, {latitude, longitude});
  };

  // console.log(phoneLocation);

  return (
    <View className="flex-1 items-center justify-center">
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // mapType="satellite"
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: phoneLocation.latitude,
            longitude: phoneLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsCompass
          zoomEnabled={true}
          loadingEnabled
          showsScale
          showsUserLocation>
          {phoneLocation?.latitude && (
            <Marker
              coordinate={{
                latitude: phoneLocation.latitude,
                longitude: phoneLocation.longitude,
              }}
              title="Origin"
              description={'This is you'}
              identifier="origin"
              draggable
              onDragEnd={onDragEnd}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    marginTop: 200,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
});
