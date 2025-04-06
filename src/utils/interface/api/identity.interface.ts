export interface UserIdentity {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
}

export interface Identity {
  access_token: string;
  data: UserIdentity;
}
