import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import getText from '../i18n.js';

const Map = ({region, changeRegion, lastUserLocation, locationDistance}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChange={changeRegion}
        moveOnMarkerPress={false}>
        {lastUserLocation && (
          <Circle
            center={{
              latitude: lastUserLocation.coords.latitude,
              longitude: lastUserLocation.coords.longitude,
            }}
            radius={locationDistance}></Circle>
        )}
        {lastUserLocation && (
          <Marker
            key={'user'}
            coordinate={{
              latitude: lastUserLocation.coords.latitude,
              longitude: lastUserLocation.coords.longitude,
            }}
            title={getText('lastLocation')}
            pinColor={'aqua'}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
