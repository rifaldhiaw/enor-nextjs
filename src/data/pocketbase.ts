import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import { useLayoutEffect } from "react";

export const pb = new PocketBase("http://127.0.0.1:8090");

export const useProtected = () => {
  const router = useRouter();

  useLayoutEffect(() => {
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
