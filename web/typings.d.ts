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

type Location = {
  latitude: number;
  longitude: number;
};

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIn',
}
