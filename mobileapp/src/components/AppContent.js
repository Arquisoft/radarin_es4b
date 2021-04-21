import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import LoginForm from './LoginForm';
import {getObject, storeObject} from '../storage.js';
import LoggedInView from './LoggedInView.js';
import * as CurrentUser from '../user.js';

const AppContent = () => {
  const [user, setUser] = useState();
  const didMount = useRef(false);

  useEffect(() => {
    getObject('user').then(user => {
      if (user) setUser(user);
    });
  }, []);

  useEffect(() => {
    if (didMount.current) {
      storeObject('user', user);
      CurrentUser.setWebId(user?.webId);
    } else didMount.current = true;
  }, [user]);

  return (
    <View
      style={{
        marginTop: 30,
        flex: 1,
      }}>
      {!user && (
        <ScrollView>
          <LoginForm changeUser={setUser}></LoginForm>
        </ScrollView>
      )}
      {user && <LoggedInView user={user} changeUser={setUser}></LoggedInView>}
    </View>
  );
};

export default AppContent;