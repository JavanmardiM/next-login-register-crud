import Link from "next/link";
import React from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import authService from "@/services/auth";
import { RegisterDTO } from "@/models/Auth";
import { Layout } from "@/components/layout/AuthLayout";
import Spinner from "@/components/general/Spinner";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function Register() {
  // const [formData, setFormData] = useState<any>({ email: "", password: "" });
  // const [error, setError] = useState<any>({ email: "", password: "", name: "" });
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const registerPayload: RegisterDTO = {
      username: data.get("username") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    mutate(registerPayload);
  };

  const { mutate, isLoading, isError } = useMutation(
    (registerPayload: RegisterDTO) => authService.register(registerPayload),
    {
      onSuccess: (queryData, registerPayload) => {
        router.push({
          pathname: "/auth/login",
        });
      },
      onError: (e: AxiosError) => {
        toast.error(`Failed: ${e?.message}`);
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
    <>
      <Layout>
        <section className="bg-gray-50 dark:bg-gray-900 text-center">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign Up
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div className="text-left">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      // onChange={(e) =>
                      //   setFormData({ ...formData, name: e.target.value })
                      // }
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Username"
                      required
                    />
                    {/* {error.username && (
                    <p className="text-sm text-red-500">{error.username}</p>
                  )} */}
                  </div>
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
                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="mr-4">Sign up</span>
                      {isLoading && (
                        <div className="mx-3">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    ALready have an account
                    <Link
                      href="/auth/login"
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                    >
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
