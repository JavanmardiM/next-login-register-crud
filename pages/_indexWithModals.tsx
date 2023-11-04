import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import PostPreview from "@/components/post/PostPreview";
import { Post } from "@/models/Post";
import { postService } from "@/services/post";
import UserLayout from "@/components/layout/UserLayout";
import SearchBar from "@/components/general/SearchBar";
import Modal from "@/components/general/Modal";
import PostForm from "@/components/post/PostForm";

const HomePage = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const onAcceptHandler = (type: string, postId?: string) => {
    if (type === "create") {
      setShowCreateModal(false);
    } else if (type === "edit") {
      setShowEditModal(false);
    } else if (type === "delete") {
      setShowDeleteModal(false);
    }
    // mutate(userId);
    setShowCreateModal(false);
  };
  const onCloseHandler = (type: string) => {
    if (type === "create") {
      setShowCreateModal(false);
    } else if (type === "edit") {
      setShowEditModal(false);
    } else if (type === "delete") {
      setShowDeleteModal(false);
    }
  };
  const onEditHandler = (id: string) => {
    setShowEditModal(true);
  };
  const onDeleteHandler = (id: string) => {
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

  const postPreviews = userListQuery.data?.map((post, index) => (
    <PostPreview
      key={post.id}
      {...post}
      index={index}
      handleDeletePost={onDeleteHandler}
      handleEditPost={onEditHandler}
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
    <UserLayout>
      <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-4 items-baseline mt-3 max-xl:mx-8">
        <div className="grow h-14 w-full sm:w-1/2">
          <SearchBar />
        </div>
        <div className="grow-0 h-14">
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowCreateModal(true)}
          >
            Make a New Post
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-5">
        {postPreviews}
      </div>
      <Modal
        title="Create New Post"
        body={<PostForm />}
        isOpen={showCreateModal}
        handleAccept={() => {
          onAcceptHandler("create");
        }}
        handleClose={() => {
          onCloseHandler("create");
        }}
      />
      <Modal
        title={`Delete Post`}
        body={deleteBody}
        isOpen={showDeleteModal}
        handleAccept={(postId) => {
          onAcceptHandler("delete", postId);
        }}
        handleClose={() => {
          onCloseHandler("delete");
        }}
      />
      <Modal
        title={`Edit Post`}
        body={<PostForm />}
        isOpen={showEditModal}
        handleAccept={(postId) => {
          onAcceptHandler("edit", postId);
        }}
        handleClose={() => {
          onCloseHandler("edit");
        }}
      />
    </UserLayout>
  );
};

export default HomePage;
