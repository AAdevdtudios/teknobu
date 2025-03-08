"use client";

import { emailSchema, nameSchema, passwordSchema, registerSchema } from "@/utils/schemas";
import { register } from "@/lib/actions";
import DynamicForms from "./dynamicInput";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { FormField } from "@/utils/types";


export default function RegisterForm() {
  const router = useRouter()
  const registerFields: FormField[] = [
    {
      name: "fullname",
      type: "text",
      label: "Full name",
      placeholder: "John Doe",
      schema: nameSchema,
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your@email.com",
      schema: emailSchema,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "********",
      isPassword: true,
      schema: passwordSchema,
    },
  ];
  const handleRegister = async (data: unknown) => {
    const parsed = registerSchema.safeParse(data);
    console.log(parsed.data);

    if (!parsed.success) {
      const errorMessage = parsed.error.errors.map(err => err.message).join(", ");
      toast.error(`Validation error: ${errorMessage}`);
      return;
    }
    const result = await register(parsed.data);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    router.push("/")
  };

  return (
    <DynamicForms
      title="Create an account"
      description="Enter your details below to create your account"
      submitText="Register"
      fields={registerFields}
      onSubmit={handleRegister}
    />
  );
}