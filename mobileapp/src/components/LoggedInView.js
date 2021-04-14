import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-elements';
import LocationSwitch from './LocationSwitch.js';
import UserInfo from './UserInfo.js';
import DistanceSlider from './DistanceSlider.js';
import Map from './Map.js';
import {getObject, storeObject, getValue, storeValue} from '../storage.js';
import {setMaxDistance} from '../location.js';

const LoggedInView = ({user, changeUser}) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 32.5245988789034,
    longitude: -3.0120493099093437,
    latitudeDelta: 26.71393659121558,
    longitudeDelta: 13.803074732422829,
  });
  const [distance, setDistance] = useState(100);
  const [lastLocation, setLastlocation] = useState(null);
  const didMount = useRef(false);

  useEffect(() => {
    getObject('region').then(region => {
      if (region !== null) setMapRegion(region);
    });
    getValue('maxDistance').then(value => {
      if (value !== null) setDistance(JSON.parse(value));
    });
    getObject('lastLocation').then(location => {
      if (location !== null) setLastlocation(location);
    });
  }, []);

  useEffect(() => {
    let mounted = didMount.current;
    let onTimeout = false;
    if (didMount.current) {
      if (!onTimeout) {
        onTimeout = true;
        setTimeout(() => {
          if (mounted)
            storeObject('region', mapRegion).then(() => (onTimeout = false));
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
          if (mounted)
            storeValue('maxDistance', JSON.stringify(distance)).then(
              () => (onTimeout = false),
            );
        }, 1000);
      }
    } else didMount.current = true;
    return function cleanup() {
      mounted = false;
    };
  }, [distance]);

  return (
    <View>
      <View
        style={{
          marginStart: 15,
          marginEnd: 15,
        }}>
        <UserInfo user={user} changeUser={changeUser} />
        <Divider />
        <LocationSwitch webId={user.webId} onLocationChange={setLastlocation} />
        <DistanceSlider distance={distance} changeDistance={setDistance} />
      </View>
      <Map
        region={mapRegion}
        changeRegion={setMapRegion}
        lastUserLocation={lastLocation}
        locationDistance={distance}
      />
    </View>
  );
};

export default LoggedInView;
