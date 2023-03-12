import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useAuthContext} from '../provider/auth';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

const UserStack = () => {
  const {setIsLoggedIn} = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, presentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;

const styles = StyleSheet.create({});
