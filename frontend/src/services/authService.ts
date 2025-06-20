import api from "./api";
import type { UserResponse } from "./userService";

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface SigninRequest {
  username: string;
  password: string;
}

interface SigninResponse {
  token: string;
  user: UserResponse;
}

export async function signup(request: SignupRequest) {
  const response = await api.post("/auth/signup", request);
  return response.data;
}

export const signin = async (
  request: SigninRequest
): Promise<SigninResponse> => {
  const response = await api.post("/auth/signin", request);
  return response.data;
};
