import { Post, PostDTO } from "@/models/Post";
import Link from "next/link";
import Spinner from "../general/Spinner";
import { useEffect, useState } from "react";

interface PostFormProps {
  handleSubmit: (data: PostDTO) => void;
  title: string;
  isLoading: boolean;
  data?: Post;
}
const PostForm = (props: PostFormProps) => {
  const [formData, setFormData] = useState<PostDTO>({
    title: "",
    content: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formValues: PostDTO = {
      title: data.get("title") as string,
      content: data.get("content") as string,
    };
    props.handleSubmit(formValues);
  };
  useEffect(() => {
    setFormData({
      title: props.data?.title || "",
      content: props.data?.content || "",
    });
  }, [props.data]);
  return (
    <div className="mt-10 max-xl:mx-8">
      <div className="border-r border-b border-l border-t border-gray-400 lg:border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {props.title}
          </div>
          <div className="mt-10 w-100">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  value={formData?.title}
                  onChange={(e) =>
                    setFormData((perv) => ({ ...perv, title: e.target.value }))
                  }
                />
                <label
                  htmlFor="title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="content"
                  id="content"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  value={formData?.content}
                  onChange={(e) =>
                    setFormData((perv) => ({
                      ...perv,
                      content: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="content"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Content
                </label>
              </div>
              <Link
                href={"/"}
                className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex text-center"
              >
                <span>Back</span>
              </Link>
              <button
                type="submit"
                className="md:ml-3 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="mr-4">Submit</span>
                  {props.isLoading && (
                    <div className="mx-3">
                      <Spinner />
                    </div>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
