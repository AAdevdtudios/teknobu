import LoginForms from "@/components/loginForm";
import Link from "next/link";


export default function LoginPage() {



  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForms />
        <div className="flex flex-col space-y-2 text-center text-sm">

          <Link
            href="/register"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}