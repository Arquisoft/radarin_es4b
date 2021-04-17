import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import getText, {getDateTimeString} from '../i18n.js';

const Map = ({
  region,
  changeRegion,
  lastUserLocation,
  locationDistance,
  friends,
}) => {
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
            description={getDateTimeString(
              new Date(lastUserLocation.timestamp),
            )}
            pinColor={'aqua'}
          />
        )}
        {friends.map(friend => (
          <Marker
            key={friend.URL}
            coordinate={{
              latitude: friend.latitud,
              longitude: friend.longitud,
            }}
            description={getDateTimeString(new Date(friend.fecha))}
            title={friend.nombre}></Marker>
        ))}
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
