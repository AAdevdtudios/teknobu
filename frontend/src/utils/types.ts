import { ZodTypeAny } from "zod";
import { SessionOptions } from "iron-session";
import { ReactNode } from "react";

export type FormField = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  schema: ZodTypeAny;
  defaultValue?: string;
};

export type DynamicFormProps = {
  title: string;
  titleStyles?: string;
  description?: string;
  descriptionStyles?: string;
  labelStyles?: string;
  fields: FormField[];
  onSubmit: (data: unknown) => Promise<void>;
  submitText?: string;
};

export type SessionData = {
  token?: string;
  loggedIn: boolean;
};

export const sessionOptions: SessionOptions = {
  password: process.env.COOKIE_SECRET_KEY as string,
  cookieName: "SEC",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export type UserResponse = {
  email: string;
  fullname: string;
  created_at: string;
};

export type LinkItems = {
  icon: ReactNode;
  title: string;
};
