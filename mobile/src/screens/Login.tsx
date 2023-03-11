import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthContext} from '../provider/auth';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const {setIsLoggedIn} = useAuthContext();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const submitHandler = async () => {
    const {email, password} = inputs;
    console.log('inputs');
    if (email === '' && password === '') {
      Alert.alert('Please provide the fields');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          //   console.log('User account created & signed in!');
          Alert.alert('User signed in!');
          setIsLoggedIn(true);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -40 : 0}>
      <SafeAreaView className="flex items-center justify-center color-red bg-red-100">
        <TextInput
          placeholder="Enter your email"
          onChangeText={text => setInputs(prev => ({...prev, email: text}))}
          value={inputs.email}
        />
        <TextInput
          placeholder="Enter your password"
          onChangeText={text => setInputs(prev => ({...prev, password: text}))}
          value={inputs.password}
        />
        <Pressable
          //   style={styles.button}
          onPress={submitHandler}>
          <Text>Login</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
