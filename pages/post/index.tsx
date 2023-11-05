import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import UserLayout from "@/components/layout/UserLayout";
import PostForm from "@/components/post/PostForm";
import { PostDTO } from "@/models/Post";
import { postService } from "@/services/post";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const CreatePost = () => {
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
      onError: (e: AxiosError) => {
        toast.error(`Failed: ${e?.message}`);
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
