type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};
type Location = {
  longitude: number;
  latitude: number;
};

interface DriverType {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  active: boolean;
  role: 'USER' | 'ADMIN';
  location: {
    latitude: number;
    longitude: number;
  };
}
