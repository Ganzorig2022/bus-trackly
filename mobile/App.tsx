/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigation from './src/navigation';
import UserContextProvider from './src/provider/auth';

function App(): JSX.Element {
  return (
    <>
      <UserContextProvider>
        <RootNavigation />
      </UserContextProvider>
    </>
  );
}

export default App;
