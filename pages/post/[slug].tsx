import { useMutation, useQueryClient } from "react-query";
import UserLayout from "@/components/layout/UserLayout";
import PostForm from "@/components/post/PostForm";
import { Post, PostDTO } from "@/models/Post";
import { useRouter } from "next/router";
import { postService } from "@/services/post";

interface EditPostProps {
  text?: number;
}
const EditPost = (props: EditPostProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postId = router.query.slug as string;
  const posts = queryClient.getQueryData<Post[]>("postList");
  const selectedPost: Post = posts?.find(
    (item: any) => item.id === postId
  ) as Post;

  const { mutate, isLoading, isError } = useMutation(
    (formValues: PostDTO) => postService.editPost(formValues, postId),
    {
      onSuccess: (queryData) => {
        queryClient.invalidateQueries("postList");
        router.push({
          pathname: "/",
        });
      },
    }
  );

  const onSubmit = (post: PostDTO) => {
    mutate(post);
  };
  return (
    <UserLayout>
      <PostForm
        data={selectedPost}
        isLoading={isLoading}
        title="Edit Post"
        handleSubmit={onSubmit}
      />
    </UserLayout>
  );
};

export default EditPost;
