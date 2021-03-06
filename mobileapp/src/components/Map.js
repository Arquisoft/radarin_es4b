import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import getText, {getDateTimeString} from '../i18n.js';
import {Icon, Avatar} from 'react-native-elements';

const Map = forwardRef(
  (
    {region, changeRegion, lastUserLocation, locationDistance, user, friends},
    ref,
  ) => {
    const map = useRef(null);

    useImperativeHandle(ref, () => ({
      centerMap: location => {
        if (location) {
          map.current.animateToRegion(
            {
              ...region,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            500,
          );
        }
      },
    }));

    return (
      <View style={styles.container}>
        <View style={styles.absoluteContainer}>
          <MapView
            ref={map}
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
                pinColor={'aqua'}>
                <Avatar
                  rounded
                  size={'small'}
                  source={
                    user.photo
                      ? {uri: user.photo}
                      : require('../../resources/images/icon-user-default.png')
                  }
                />
              </Marker>
            )}
            {friends.map(friend => (
              <Marker
                key={friend.URL}
                coordinate={{
                  latitude: friend.latitud,
                  longitude: friend.longitud,
                }}
                description={getDateTimeString(new Date(friend.fecha))}
                title={friend.nombre}>
                {!friend.foto && (
                  <Avatar
                    rounded
                    size={'small'}
                    title={friend.nombre.charAt(0)}
                    overlayContainerStyle={{backgroundColor: '#BDBDBD'}}
                  />
                )}
                {friend.foto && (
                  <Avatar
                    rounded
                    size={'small'}
                    title={friend.nombre.charAt(0)}
                    source={{uri: friend.foto}}
                  />
                )}
              </Marker>
            ))}
          </MapView>
          {lastUserLocation && (
            <Icon
              name="my-location"
              color="#007bff"
              size={26}
              containerStyle={{
                margin: 20,
              }}
              onPress={() => {
                if (map.current)
                  map.current.animateToRegion(
                    {
                      ...region,
                      latitude: lastUserLocation.coords.latitude,
                      longitude: lastUserLocation.coords.longitude,
                    },
                    500,
                  );
              }}
              raised
            />
          )}
        </View>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
