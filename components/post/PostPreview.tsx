import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { Post } from "@/models/Post";
import DeleteBtn from "../general/DeleteBtn";
import EditIcon from "../general/EditIcon";

interface PostPreviewProps extends Post {
  index?: number;
  handleDeletePost: (id: string) => void;
}
const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className="p-4 transition duration-200 transform hover:translate-y-2 ">
      <div className="hover:opacity-80">
        <Link
          href={{
            pathname: `/${props.id}`,
            query: {
              index: props.index,
            },
          }}
        >
          <Image
            src={`/images/${props.index}.jpg`}
            alt=""
            width="800"
            height="400"
          />
        </Link>
        <div className="flex justify-between">
          <Link
            href={{
              pathname: `/${props.id}`,
              query: {
                index: props.index,
              },
            }}
          >
            <h4 className="font-bold text-lg pt-2 tracking-wide">
              {props.title}
            </h4>
          </Link>
          <div className="mt-2 flex space-x-1">
            <Link
              href={{
                pathname: `/post/${props.id}`,
                query: {
                  index: props.index,
                },
              }}
            >
              <EditIcon />
            </Link>
            <DeleteBtn
              onClick={() => {
                props.handleDeletePost(props.id);
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <p className="text-sm pt-3 tracking-wider font-medium pr-1">
          Modified Date: {moment(props.lastUpdateDate).format("YYYY-MM-DD")}
        </p>
      </div>
      <p className="text-sm pt-3 text-gray-600 tracking-wider overflow-hidden truncate">
        {props.content}
      </p>
    </div>
  );
};

export default PostPreview;
