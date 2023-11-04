import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import UserLayout from "@/components/layout/UserLayout";
import PostForm from "@/components/post/PostForm";
import { PostDTO } from "@/models/Post";
import { postService } from "@/services/post";

interface CreatePostProps {}
const CreatePost = (props: CreatePostProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (formValues: PostDTO) => postService.createPost(formValues),
    {
      onSuccess: () => {
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
        isLoading={isLoading}
        title="Create New Post"
        handleSubmit={onSubmit}
      />
    </UserLayout>
  );
};

export default CreatePost;
