import { Identity, UserIdentity } from "../interface/api/identity.interface";

export function getAccessToken(): string | undefined {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return token;
  }
}

export function setAccessToken(token: string) {
  if (token) {
    localStorage.setItem("accessToken", token);
  }
}

export function setIdentity(identity: Omit<UserIdentity, "accessToken">) {
  if (identity) {
    localStorage.setItem("identity", JSON.stringify(identity));
  }
}

export function getIdentity(): UserIdentity | undefined {
  const identity = localStorage.getItem("identity");

  if (!identity) return undefined;

  return JSON.parse(identity);
}

export function clearToken() {
  localStorage.clear();
}
