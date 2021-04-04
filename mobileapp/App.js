import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import Header from './src/components/Header';
import WebIDForm from './src/components/WebIDForm';
import LocationSwitch from './src/components/LocationSwitch';

const App = () => {
  const [webId, setWebId] = useState();

  return (
    <SafeAreaProvider>
      <ScrollView>
        <Header></Header>
        <View
          style={{
            marginTop: 50,
            flex: 1
          }}>
          <WebIDForm changeWebId={setWebId}></WebIDForm>
          {webId && (
            <View
              style={{
                marginTop: 20,
                marginStart: 15,
                marginEnd: 15
              }}>
              <Divider />
              <LocationSwitch webId={webId} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default App;
