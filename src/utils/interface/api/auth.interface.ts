export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserInformation extends UserCredentials {
  id: number;
  first_name: string;
  last_name: string;
}
