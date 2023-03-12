import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
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

    if (email === '' && password === '') {
      Alert.alert('Please provide the fields');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
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

          Alert.alert(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -40 : 0}>
      <SafeAreaView className="flex flex-col items-center justify-center text-black  h-full">
        <View className="w-[300px] m-5 bg-white rounded-xl items-center space-y-4 p-6">
          <Image
            source={require('../../assets/bus_track_logo.png')}
            className="m-5"
            style={{resizeMode: 'contain'}}
          />
          <TextInput
            placeholder="Enter your email"
            onChangeText={text => setInputs(prev => ({...prev, email: text}))}
            value={inputs.email}
            className="rounded p-2 border border-gray-400 w-full"
          />
          <TextInput
            placeholder="Enter your password"
            onChangeText={text =>
              setInputs(prev => ({...prev, password: text}))
            }
            value={inputs.password}
            className="rounded p-2 border border-gray-400 w-full"
          />
          <Pressable
            className="bg-black rounded px-4 py-2 w-full"
            onPress={submitHandler}>
            <Text className="text-bold text-white text-center">Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 2,
  },
});
