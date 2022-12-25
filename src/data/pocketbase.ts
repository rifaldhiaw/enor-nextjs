import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import { useEffect } from "react";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

export const useProtected = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!pb.authStore.isValid) {
        router.push("/login");
      }
    };

    checkAuth();
    pb.authStore.onChange(() => {
      checkAuth();
    });
  }, []);
};
