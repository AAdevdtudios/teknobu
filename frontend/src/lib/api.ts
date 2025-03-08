import { TLoginUser, TRegisterSchema } from "@/utils/schemas";
import { UserResponse } from "@/utils/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  register: async (credentials: TRegisterSchema) => {
    try {
      console.log("Making a Query to");

      console.log(API_URL);

      const response = await axiosInstance.post("/auth/register", credentials);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    }
  },

  login: async (credentials: TLoginUser) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      if (response.status !== 200) {
        throw new Error("Unauthorized user");
      }
      return response.data;
    } catch (error) {
      console.error("Login API error:", error);
      throw new Error("Login failed");
    }
  },

  checkUser: async (token: string): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Check user error:", error);
      throw new Error("Failed to check user");
    }
  },
};
