import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { ReactQueryDevtools } from "react-query/devtools";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import { storage } from "@/Utilities/storage";
import authService from "@/services/auth";
import { userAPI } from "@/services/config";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 300000,
          },
        },
      })
  );
  function authCheck(url: string) {
    const isLoggedIn = typeof window !== "undefined" && !!storage.getToken();
    setUser(authService.userValue);
    const publicPaths = ["/auth/login", "/auth/register"];
    const path = url.split("?")[0];
    if (!isLoggedIn && !publicPaths.includes(path)) {
      setIsAuthorized(false);
      router.push({
        pathname: "/auth/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setIsAuthorized(true);
    }
  }
  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setIsAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
    // eslint-disable-next-line
  }, []);

  const initiateApiHeader = () => {
    let token = typeof window !== "undefined" && storage.getToken();
    if (token) {
      userAPI.defaults.headers["Authorization"] = `Bearer ${token}`;
      userAPI.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      storage.clearToken();
      return;
    }
  };

  useEffect(() => {
    initiateApiHeader();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {isAuthorized && <Component {...pageProps} />}
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
