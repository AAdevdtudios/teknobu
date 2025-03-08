"use client";

import { emailSchema, loginSchema, passwordSchema } from "@/utils/schemas";
import DynamicForms from "./dynamicInput";
import { FormField } from "@/utils/types";
import { login } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForms() {
  const router = useRouter()

  // const login = useLogin();
  // const { toast } = useToast();
  const loginFields: FormField[] = [
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

  const handleLogin = async (data: unknown) => {
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      const errorMessage = parsed.error.errors.map(err => err.message).join(", ");
      toast.error(`Validation error: ${errorMessage}`);
      return;
    }

    const result = await login(parsed.data);
    if (result.error) {
      toast.error(result.error);
      return;
    }

    // Only redirect if there's no error
    router.push("/profile");
  };


  return (
    <DynamicForms
      title="Welcome back"
      description="Enter your email to sign in to your account"
      submitText="Sign In"
      fields={loginFields}
      onSubmit={handleLogin} />
  );
}
