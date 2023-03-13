import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {UserData} from '../atom/userData';

export const useFirebase = (path: string) => {
  const [data, setData] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >({});

  const [userData, setUserData] = useRecoilState(UserData);

  const updateDocument = useCallback(
    async (docId: string, {latitude, longitude}: Location) => {
      return firestore()
        .collection(path)
        .doc(docId)
        .update({
          location: {latitude, longitude},
        })
        .then(() => {
          console.log('User updated!');
        });
    },
    [path],
  );

  const activateUser = (docId: string, active: boolean) => {
    firestore()
      .collection(path)
      .doc(docId)
      .update({
        active: active,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  const readDocument = (docId: string) => {
    firestore()
      .collection(path)
      .doc(docId)
      .get()
      .then(documentSnapshot => {
        // console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          setUserData({...documentSnapshot.data()});
        }
      });
  };

  return {
    data,
    readDocument,
    updateDocument,
    activateUser,
  };
};
