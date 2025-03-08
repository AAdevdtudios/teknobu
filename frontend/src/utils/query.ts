import { currentUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR from "swr";
import { UserResponse } from "./types";

export default function useUser() {
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR<UserResponse>(
    "current-user",
    currentUser,
    {
      onError: (err) => {
        toast.error(err.message);
        router.push("/");
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}
