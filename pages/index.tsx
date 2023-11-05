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
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const HomePage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState({ text: "", isSearching: false });
  const [selectedPostToDelete, setSelectedPostToDelete] =
    React.useState<Post>();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    (postId: string) => postService.deletePost(postId),
    {
      onSuccess: () => {
        setShowDeleteModal(false);
        queryClient.invalidateQueries("postList");
      },
      onError: (e: AxiosError) => {
        toast.error(`Failed: ${e?.message}`);
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
    setSelectedPostToDelete(selectedPost);
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
      refetchOnMount: true,
    }
  );
  useEffect(() => {
    if (userListQuery.error) {
      toast.error(userListQuery.error.message);
    }
  }, [userListQuery]);
  const postPreviews = userListQuery.data
    ?.filter(
      (item) =>
        item.title.includes(search.text) || item.content.includes(search.text)
    )
    .map((post, index) => (
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
            <SearchBar setSearchText={setSearch} />
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
        {!(userListQuery.isLoading || search.isSearching) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-5">
            {postPreviews}
          </div>
        )}
        {(userListQuery.isLoading || search.isSearching) && (
          <div className="mt-10 flex justify-center">
            <Spinner width={"w-20"} height={"h-20"} />
          </div>
        )}
        {postPreviews?.length === 0 && (
          <div className="mt-10 text-center">No Posts to Show!</div>
        )}
        <Modal
          data-testid="delete-modal"
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
    </>
  );
};

export default HomePage;
