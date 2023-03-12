import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useRecoilValue} from 'recoil';
import {LocationCoordState} from '../atom/location';

const Map = () => {
  const origin = useRecoilValue(LocationCoordState);

  return (
    <View className="flex items-center justify-center">
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // mapType="satellite"
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsCompass={true}
          zoomEnabled
          loadingEnabled
          showsScale>
          {origin?.latitude && (
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              title="Origin"
              description={'This is you'}
              identifier="origin"
              //   draggable
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
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
