import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Slider} from 'react-native-elements';
import {setMaxDistance} from '../location.js';
import {getValue, storeValue} from '../storage.js';
import getText from '../i18n.js';

const DistanceSlider = () => {
  const [distance, setDistance] = useState(100);
  const didMount = useRef(false);

  useEffect(() => {
    getValue('maxDistance').then(value => {
      if (value !== null) setDistance(JSON.parse(value));
    });
  }, []);

  useEffect(() => {
    if (didMount.current) {
      setMaxDistance(distance);
      storeValue('maxDistance', JSON.stringify(distance));
    } else didMount.current = true;
  }, [distance]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Icon name="notifications-active" size={20} />
        <View style={{flex: 3}}>
          <Text style={styles.text}>{getText('maxDistance')}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.distanceText}>{distance.toFixed()} m</Text>
        </View>
      </View>
      <Slider
        style={styles.slider}
        value={distance}
        onValueChange={value => setDistance(value)}
        allowTouchTrack={true}
        maximumValue={1000}
        minimumValue={10}
        thumbTintColor={'#007bff'}
        thumbStyle={styles.thumb}
        thumbTouchSize={{height: 23, width: 23}}
        trackStyle={styles.track}
        step={10}></Slider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginStart: 7,
  },
  distanceText: {
    fontSize: 16,
    textAlign: 'right',
    marginEnd: 10,
  },
  slider: {
    marginTop: 5,
    width: 250,
  },
  thumb: {
    height: 22,
    width: 22,
  },
  track: {
    height: 3,
  },
});

export default DistanceSlider;