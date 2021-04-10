import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import CustomButton from './CustomButton';
import getText from '../i18n.js';
import {unsubscribe} from '../location.js';

const UserInfo = ({user, changeUser}) => {
  return (
    <View style={styles.container}>
      <Avatar rounded size={'medium'} source={{uri: user.photo}} />
      <Text style={styles.text}>{user.name}</Text>
      <CustomButton
        action={() => {
          unsubscribe();
          changeUser(null);
        }}
        text={getText('logOut')}
        customContentStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    marginEnd: 'auto',
    marginStart: 15,
  },
  button: {
    width: 100,
  },
});

export default UserInfo;
