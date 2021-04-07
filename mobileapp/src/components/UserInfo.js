import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import CustomButton from './CustomButton';
import getText from '../i18n.js';

const UserInfo = ({user, changeUser}) => {
  return (
    <View style={styles.container}>
      <Icon name="account-circle" size={20} />
      <Text style={styles.text}>{user.name}</Text>
      <CustomButton
        action={() => changeUser(null)}
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
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    marginEnd: 'auto',
    marginStart: 5,
  },
  button: {
    width: 100,
  },
});

export default UserInfo;
