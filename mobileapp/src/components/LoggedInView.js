import React, {useState, useEffect, useRef} from 'react';
import {View, AppState} from 'react-native';
import {Divider} from 'react-native-elements';
import LocationSwitch from './LocationSwitch.js';
import UserInfo from './UserInfo.js';
import DistanceSlider from './DistanceSlider.js';
import Map from './Map.js';
import {getObject, storeObject, getValue, storeValue} from '../storage.js';
import {
  startFriendUpdates,
  setMaxDistance,
  setForegroundFriendsHandler,
  getCurrentFriendsClose,
  setOnFriendNotificationCallback,
} from '../friends.js';
import * as CurrentUser from '../user.js';
import {setForegroundLocationHandler} from '../location.js';

const LoggedInView = ({user, changeUser}) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 32.5245988789034,
    longitude: -3.0120493099093437,
    latitudeDelta: 26.71393659121558,
    longitudeDelta: 13.803074732422829,
  });
  const [distance, setDistance] = useState(100);
  const [lastLocation, setLastlocation] = useState(null);
  const [friends, setFriends] = useState([]);
  const didMount = useRef(false);
  const map = useRef(null);

  useEffect(() => {
    let mounted = true;
    
    setForegroundLocationHandler(location => {
      if (mounted) {
        setLastlocation(location);
        getCurrentFriendsClose();
      }
    });

    setForegroundFriendsHandler(friends => {
      if (mounted) setFriends(friends);
    });

    setOnFriendNotificationCallback(friend => {
      if (map.current) {
        // Espera a que se realice el primer centrado sobre la posición
        // del propio usuario y después centra sobre el amigo
        setTimeout(
          () =>
            map.current.centerMap({
              coords: {
                latitude: friend.latitud,
                longitude: friend.longitud,
              },
            }),
          500,
        );
      }
    });

    getObject('region').then(region => {
      if (region !== null && mounted) setMapRegion(region);
    });

    getValue('maxDistance').then(value => {
      if (value !== null && mounted) setDistance(JSON.parse(value));
    });

    getObject(`${user.webId}-lastLocation`).then(location => {
      if (location !== null && mounted) {
        setLastlocation(location);
        CurrentUser.setLastUserLocation(location);
      }
    });

    startFriendUpdates();

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      mounted = false;
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = state => {
    if (state === 'active') {
      getCurrentFriendsClose();
      getObject(`${user.webId}-lastLocation`).then(location => {
        if (location !== null) setLastlocation(location);
      });
    }
  };

  useEffect(() => {
    let mounted = didMount.current;
    let onTimeout = false;
    if (didMount.current) {
      if (!onTimeout) {
        onTimeout = true;
        setTimeout(() => {
          if (mounted) {
            storeObject('region', mapRegion).then(() => (onTimeout = false));
          }
        }, 1000);
      }
    } else didMount.current = true;
    return function cleanup() {
      mounted = false;
    };
  }, [mapRegion]);

  useEffect(() => {
    let mounted = didMount.current;
    let onTimeout = false;
    if (didMount.current) {
      setMaxDistance(distance);
      if (!onTimeout) {
        onTimeout = true;
        setTimeout(() => {
          if (mounted) {
            getCurrentFriendsClose();
            storeValue('maxDistance', JSON.stringify(distance)).then(
              () => (onTimeout = false),
            );
          }
        }, 500);
      }
    } else didMount.current = true;
    return function cleanup() {
      mounted = false;
    };
  }, [distance]);

  useEffect(() => {
    if (didMount.current) {
      if (map.current) map.current.centerMap(lastLocation);
    }
  }, [lastLocation]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginStart: 15,
          marginEnd: 15,
        }}>
        <UserInfo user={user} changeUser={changeUser} />
        <Divider />
        <LocationSwitch />
        <DistanceSlider distance={distance} changeDistance={setDistance} />
      </View>
      <Map
        ref={map}
        region={mapRegion}
        changeRegion={setMapRegion}
        lastUserLocation={lastLocation}
        locationDistance={distance}
        friends={friends}
      />
    </View>
  );
};

export default LoggedInView;
