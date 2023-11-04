import { PostListRes, PostDTO } from "@/models/Post";
import _axios from "axios";
import { userAPI } from "./config";

export const postService = {
  getPostList,
  createPost,
  editPost,
  deletePost,
};

function getPostList(): Promise<PostListRes> {
  return userAPI.get(`/api/blog/getAll`);
}
function createPost(payload: PostDTO): Promise<PostListRes> {
  return userAPI.post(`/api/blog/create`, payload);
}
function editPost(payload: PostDTO, postId: string): Promise<PostListRes> {
  return userAPI.put(`/api/blog/${postId}/edit`, payload);
}
function deletePost(postId: string): Promise<PostListRes> {
  return userAPI.delete(`/api/blog/${postId}/delete`);
}
