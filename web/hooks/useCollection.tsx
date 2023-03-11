import { db } from '@/firebase/config';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface QueryType {
  id: string;
  data: DriverType;
}

export const useCollection = (collectionName: string, docId?: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [driverData, setDriverData] = useState<DriverType[]>([]);
  const [snapshotData, setSnapshotData] = useState<DriverType[]>([]);

  useEffect(() => {
    if (docId) {
      (async () => {
        try {
          setLoading(true);
          const docRef = doc(db, collectionName, docId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data() as any);
          } else {
            console.log('No such document!');
          }
        } catch (error: any) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [collectionName, docId]);

  //real time update listener
  useEffect(() => {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      let result = [] as any;

      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data() });
      });

      setSnapshotData(result);
    });

    return () => unsubscribe();
  }, [collectionName]);

  //   const getData = async (docId) => {
  //     try {
  //       setLoading(true);
  //       const docRef = doc(db, collectionName, docId);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         return docSnap.data();
  //       } else {
  //         console.log('No such document!');
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const updateData = (data) => updateDoc(doc(db, collectionName, docId), data);

  //   const createDriverData = async (userId: string, data: DriverType) => {
  //     try {
  //       const newDriver = await setDoc(doc(db, collectionName, userId), data);
  //       return newDriver;
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };
  const createDriverData = async (data: DriverType) => {
    try {
      const newDriver = await addDoc(collection(db, collectionName), data);
      return newDriver;
    } catch (error) {
      console.log('error', error);
    }
  };
  const getAllDrivers = async () => {
    try {
      const q = query(collection(db, collectionName));
      const result: DriverType[] = [];

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        result.push({
          ...(doc.data() as DriverType),
        });
      });
      setDriverData(result);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //   const getActiveDrivers = async (
  //     sortKey: string,
  //     sortValue: boolean,
  //     orderField: string
  //   ) => {
  //     try {
  //       const q = query(
  //         collection(db, collectionName),
  //         where(sortKey, '==', sortValue),
  //         orderBy(orderField, 'desc')
  //       );
  //       const result: QueryType[] = [];

  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         result.push({
  //           id: doc.id,
  //           data: doc.data() as DriverType,
  //         });
  //       });
  //       setDriverData(result);
  //     } catch (error: any) {
  //       console.log(error.message);
  //     }
  //   };

  // image upload Component Firebase
  return {
    snapshotData,
    data,
    driverData,
    loading,
    // getData,
    createDriverData,
    // getActiveDrivers,
    getAllDrivers,
    // createData,
    // updateData,
  };
};
