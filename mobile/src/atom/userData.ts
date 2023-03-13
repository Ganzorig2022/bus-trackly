import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {atom} from 'recoil';

const defaultState: FirebaseFirestoreTypes.DocumentData | undefined = {
  id: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  active: false,
  role: 'USER',
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const UserData = atom<FirebaseFirestoreTypes.DocumentData | undefined>({
  key: 'UserDataState',
  default: defaultState,
});
