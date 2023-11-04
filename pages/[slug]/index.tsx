import { useQuery, useQueryClient } from "react-query";
import Image from "next/image";
import { Post } from "@/models/Post";
import { useRouter } from "next/router";
import UserLayout from "@/components/layout/UserLayout";
import moment from "moment";
import Link from "next/link";

function PostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const slug = router.query.slug;
  const imageIndex = router.query.index?.toString();
  const posts = queryClient.getQueryData<Post[]>("postList");
  const post: Post = posts?.find((item: any) => item.id === slug) as Post;

  if (post == null) {
    return (
      <UserLayout>
        <div className="py-5">
          <h1 className="text-center mb-5 title">
            404: This Page Doesnt Exist
          </h1>
          <article className="text-center article">
            Go to homepage to find latest articles!
          </article>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex justify-end mr-10 mt-10">
        <Link
          href={"/"}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Back</span>
        </Link>
      </div>
      <div className="mx-4 my-5">
        <div className="my-2 text-center px-1 font-semibold  text-[#e53170] text-base md:text-lg tracking-wide"></div>
        <h1 className=" text-black text-center text-3xl md:text-4xl font-extrabold mb-10">
          {post!.title}
        </h1>

        <article className="article">
          <figure className="flex justify-center">
            <Image
              src={`/images/${imageIndex}.jpg`}
              alt=""
              width={300}
              height={300}
              priority
            />
          </figure>
          <div className="flex flex-col justify-center my-4 ">
            <div className="font-medium text-gray-600 text-base text-center md:text-lg tracking-wide">
              Modified Date: {moment(post!.lastUpdateDate).format("YYYY-MM-DD")}
            </div>
            <div className="text-gray-600 text-base md:text-lg font-medium text-center text-justify my-10">
              <span>{post!.content}</span>
            </div>
          </div>
        </article>
      </div>
    </UserLayout>
  );
}

export default PostPage;
