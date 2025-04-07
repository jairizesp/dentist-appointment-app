import { setAccessToken, setIdentity } from "../utils/helpers/tokenHelper";
import { UserCredentials } from "../utils/interface/api/auth.interface";
import { Identity } from "../utils/interface/api/identity.interface";
import apiClient from "./axios";

export async function userLogin(payload: UserCredentials): Promise<Identity> {
  try {
    const response = await apiClient.post("/auth/login", payload);
    const result: Identity = response.data;

    if (result.data) {
      setAccessToken(result.access_token);
      setIdentity(result.data);
    }

    return result;
  } catch (error: any) {
    throw error?.response?.data;
  }
}
