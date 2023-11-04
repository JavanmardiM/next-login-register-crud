import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { storage } from "@/Utilities/storage";

export { AuthLayout as Layout };

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = typeof window !== "undefined" && !!storage.getToken();
    if (isLoggedIn) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div >{children}</div>;
}
