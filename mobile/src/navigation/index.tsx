import React from 'react';
import {Text, View} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useAuthContext} from '../provider/auth';
import AuthStack from './AuthStack';
import UserStack from './UserStack';

export default function RootNavigation() {
  const {isLoggedIn} = useAuthContext();
  const {user} = useAuth();

  return user ? <UserStack /> : <AuthStack />;
}
