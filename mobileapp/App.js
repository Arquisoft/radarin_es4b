import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import Header from './src/components/Header';
import LocationSwitch from './src/components/LocationSwitch';
import LoginForm from './src/components/LoginForm';
import UserInfo from './src/components/UserInfo';

const App = () => {
  const [user, setUser] = useState();

  return (
    <SafeAreaProvider>
      <ScrollView>
        <Header></Header>
        <View
          style={{
            marginTop: 40,
            flex: 1,
          }}>
          {!webId && <LoginForm changeUser={setUser}></LoginForm>}
          {webId && (
            <View
              style={{
                marginTop: 20,
                marginStart: 15,
                marginEnd: 15,
              }}>
              <UserInfo user={user} changeUser={setUser}/>
              <Divider />
              <LocationSwitch webId={user.webId} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default App;
