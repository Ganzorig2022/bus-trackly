/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RecoilRoot} from 'recoil';
import RootNavigation from './src/navigation';
import UserContextProvider from './src/provider/auth';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RecoilRoot>
        <UserContextProvider>
          <RootNavigation />
        </UserContextProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

export default App;
