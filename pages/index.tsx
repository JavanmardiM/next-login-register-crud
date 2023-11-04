import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PostPreview from "@/components/post/PostPreview";
import { Post } from "@/models/Post";
import { postService } from "@/services/post";
import UserLayout from "@/components/layout/UserLayout";
import SearchBar from "@/components/general/SearchBar";
import Modal from "@/components/general/Modal";
import Spinner from "@/components/general/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const HomePage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostToDelete, setSselectedPostToDelete] =
    React.useState<Post>();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    (postId: string) => postService.deletePost(postId),
    {
      onSuccess: () => {
        setShowDeleteModal(false);
        queryClient.invalidateQueries("postList");
      },
    }
  );

  const onAcceptHandler = (post: Post) => {
    mutate(post?.id);
  };
  const onCloseHandler = () => {
    setShowDeleteModal(false);
  };
  const onDeleteHandler = (postId: string) => {
    const selectedPost: Post = queryClient
      .getQueryData<Post[]>("postList")
      ?.find((item: any) => item.id === postId) as Post;
    setSselectedPostToDelete(selectedPost);
    setShowDeleteModal(true);
  };

  const userListQuery = useQuery<Post[], Error>(
    "postList",
    async () => {
      const res = await postService.getPostList();
      return res.data.posts;
    },
    {
      staleTime: 300000,
      refetchOnMount: false,
    }
  );
  useEffect(() => {
    if (userListQuery.error) {
      toast.error(userListQuery.error.message);
    }
  }, [userListQuery]);
  const postPreviews = userListQuery.data?.map((post, index) => (
    <PostPreview
      key={post.id}
      {...post}
      index={index}
      handleDeletePost={onDeleteHandler}
    />
  ));
  const deleteBody = (
    <div className="relative p-6 flex-auto">
      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
        Are you sure to delete this post?
      </p>
    </div>
  );
  return (
    <>
      <UserLayout>
        <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-4 items-baseline mt-3 max-xl:mx-8">
          <div className="grow h-14 w-full sm:w-1/2">
            <SearchBar />
          </div>
          <div className="grow-0 h-14">
            <Link
              href={"/post"}
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              <span>Make a New Post</span>
            </Link>
          </div>
        </div>
        {!userListQuery.isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-5">
            {postPreviews}
          </div>
        )}
        {userListQuery.isLoading && (
          <div className="mt-10 flex justify-center">
            <Spinner width={40} height={40} />
          </div>
        )}
        <Modal
          title={`Delete '${selectedPostToDelete?.title}' Post`}
          data={selectedPostToDelete}
          body={deleteBody}
          isOpen={showDeleteModal}
          isLoading={isLoading}
          handleAccept={(postId) => {
            onAcceptHandler(postId);
          }}
          handleClose={() => {
            onCloseHandler();
          }}
        />
      </UserLayout>
      <ToastContainer />
    </>
  );
};

export default HomePage;
