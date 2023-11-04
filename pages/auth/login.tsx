import { LoginDTO } from "@/models/Auth";
import Link from "next/link";
import React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import authService from "@/services/auth";
import { storage } from "@/Utilities/storage";
import { Layout } from "@/components/layout/AuthLayout";
import { userAPI } from "@/services/config";
import Spinner from "@/components/general/Spinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  // const [formData, setFormData] = useState<any>({ email: "", password: "" });
  // const [error, setError] = useState<any>({ email: "", password: "", name: "" });
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginValues: LoginDTO = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    mutate(loginValues);
  };

  const { mutate, isLoading, isError } = useMutation(
    (loginValues: LoginDTO) => authService.login(loginValues),
    {
      onSuccess: (queryData, loginValues) => {
        userAPI.defaults.headers[
          "Authorization"
        ] = `Bearer ${queryData.data.response}`;
        if (typeof window !== "undefined" && queryData.data.response)
          storage.setToken(queryData.data.response);
        router.push({
          pathname: "/",
        });
      },
    }
  );
  // const handleSubmit = async (e: any) => {
  //   // e.preventDefault();
  //   // if (!formData.email) {
  //   //     setError({ ...error, email: "Email Field is Required" })
  //   //     return;
  //   // }
  //   // if (!formData.password) {
  //   //     setError({ ...error, password: "Password Field is required" })
  //   //     return;
  //   // }
  //   // if (!formData.name) {
  //   //     setError({ ...error, name: "Name Field is required" })
  //   //     return;
  //   // }
  //   // const res = await register_now(formData);
  //   // if (res.success) {
  //   //     toast.success(res.message)
  //   // }
  //   // else {
  //   //     toast.error(res.message)
  //   // }
  // };
  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900 text-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    email
                  </label>
                  <input
                    // onChange={(e) =>
                    //   setFormData({ ...formData, email: e.target.value })
                    // }
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                  {/* {error.email && (
                    <p className="text-sm text-red-500">{error.email}</p>
                  )} */}
                </div>
                <div className="text-left">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    // onChange={(e) =>
                    //   setFormData({ ...formData, password: e.target.value })
                    // }
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {/* {error.password && (
                    <p className="text-sm text-red-500">{error.password}</p>
                  )} */}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="mr-4">Sign in</span>
                    {isLoading && (
                      <div className="mx-3">
                        <Spinner />
                      </div>
                    )}
                  </div>
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account{" "}
                  <Link
                    href="/auth/register"
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <ToastContainer /> */}
    </Layout>
  );
}
