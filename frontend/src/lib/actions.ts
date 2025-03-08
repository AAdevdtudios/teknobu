"use server";
import { loginSchema, TLoginUser, TRegisterSchema } from "@/utils/schemas";
import { authService } from "./api";
import { getSession } from "./session";

export const login = async (credentials: TLoginUser) => {
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    const errorMessage = parsed.error.errors
      .map((err) => err.message)
      .join(", ");
    console.error("Validation error during login:", errorMessage);
    return { error: `Validation failed: ${errorMessage}` };
  }

  try {
    const data = await authService.login(parsed.data);
    const session = await getSession();
    session.loggedIn = true;
    session.token = data.access_token;
    await session.save();
    return { success: true };
  } catch (error) {
    console.error("Error in login action:", error);
    return { error: "Unable to authenticate user" };
  }
};

export const register = async (credentials: TRegisterSchema) => {
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) {
    const errorMessage = parsed.error.errors
      .map((err) => err.message)
      .join(", ");
    console.error("Validation error during login:", errorMessage);
    return { error: `Validation failed: ${errorMessage}` };
  }
  try {
    console.log(credentials);

    await authService.register(credentials);
    return { success: true };
  } catch (error) {
    console.error("Error in login action:", error);
    return { error: "Unable to authenticate user" };
  }
};
export const logout = async () => {
  const session = await getSession();
  session.destroy();
};

export const currentUser = async () => {
  try {
    const session = await getSession();
    console.log(session.token);

    if (session.token == null) throw new Error("User not logged in");
    const data = await authService.checkUser(session.token);
    return data;
  } catch (error) {
    throw error;
  }
};
