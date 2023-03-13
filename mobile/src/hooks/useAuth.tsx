import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useFirebase} from '../firebase/useFirebase';

export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const {activateUser, readDocument} = useFirebase('Drivers');

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        activateUser(user?.uid as string, true);
        readDocument(user?.uid as string);

        setInitializing(false);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
  };
}
