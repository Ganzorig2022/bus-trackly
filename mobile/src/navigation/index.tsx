import React from 'react';
import {Text, View} from 'react-native';
import {useAuthContext} from '../provider/auth';
import AuthStack from './AuthStack';
import UserStack from './UserStack';

export default function RootNavigation() {
  const {isLoggedIn} = useAuthContext();

  return isLoggedIn ? <UserStack /> : <AuthStack />;
}
