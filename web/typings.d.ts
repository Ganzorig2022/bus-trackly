interface DriverType {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  active: boolean;
  role: 'USER' | 'ADMIN';
}

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIn',
}
