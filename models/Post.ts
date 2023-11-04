export interface Post {
  id: string;
  title: string;
  content: string;
  lastUpdateDate: string;
}
export interface PostListRes {
  status: string;
  response: string;
  data: {
    posts: Post[];
  };
}
export interface PostDTO {
  title: string;
  content: string;
}
