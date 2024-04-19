import { Link } from "react-router-dom";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite"
import PostStats from "./PostStats";
import { IUser } from "@/types";
import { useTheme } from "@/context/ThemeContext";

type PostCardProps = {
  post: Models.Document;
  user: IUser;
}

const PostCard = ({ post, user }: PostCardProps) => {
  const { theme } = useTheme();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between mb-2 px-2 md:px-0">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='creator' className="rounded-full w-11 lg:h-11"
            />
          </Link>

          <div className="flex flex-col">
            <div className="flex">
              <p className="base-medium text-light-1">
                {post.creator.name}
              </p>
              {post.creator.verified  &&
                  <img src="/assets/icons/verified.png" alt="verified"
                      className='ml-1 size-5'
                  />
              }
            </div>
            <div className="flex-center gap-2 text-light-3">
              <p className="small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              <p className="small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
              src="/assets/icons/edit.svg" alt="edit" title="Edit"
              className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`} width={20} height={20}
          />
        </Link>

      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="border border-dark-5">
          <img
            src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="post image"
            className="post-card_img"
          />
        </div>
      </Link>

        <PostStats post={post} userId={user.id} />

        <div className="small-medium lg:base-medium py-2 px-4 md:px-0">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-3">
            {post.tags[0] === '' ? '' :
              post.tags.map((tag: string) => (
                <li key={tag} className="text-primary-500">
                  {tag && `#${tag}`}
                </li>
              ))
            }
          </ul>
        </div>

    </div>
  )
}

export default PostCard
