import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useState } from "react";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
  const { user } = useUserContext();
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState('');

  const handleMouseOver = (id: string) => {
    setIsHovering(true);
    setHoveredPostId(id);
    // setHoverablePost(posts?.post.$id);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setHoveredPostId('');
  };

  return (
    <ul className="grid-container">
      {posts?.map((post) => {
        return (
          <li key={post.$id} className="relative min-w-80 md:h-80 overflow-hidden"
              onMouseOver={() => handleMouseOver(post.$id)} onMouseOut={handleMouseOut}>


            <Link to={`/posts/${post.$id}`} className="grid-post_link">
            {isHovering && hoveredPostId === post.$id
              ? (
                <>
                  <div className="post-stats-overlay" />
                  <img
                    src={post.imageUrl}
                    alt="post"
                    className="h-full w-full object-cover md:rounded-xl"
                  />
                </>
            ) : (
              <img
                src={post.imageUrl}
                alt="post"
                className="h-full w-full object-cover md:rounded-xl"
              />)}
            </Link>

            <Link to={`/posts/${post.$id}`}>
              <div className="post-stats">
                {isHovering && showStats && hoveredPostId === post.$id &&
                    <PostStats post={post} userId={user.id} disabled/>
                }
              </div>
            </Link>


            <div className="grid-post_user">
              {showUser && isHovering && hoveredPostId === post.$id && (
                <div className="flex items-center justify-start gap-2 flex-1">
                  <img
                    src={
                      post.creator.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="line-clamp-1">{post.creator.name}</p>
                </div>
              )}

            </div>
          </li>
        )})
      }
    </ul>
  );
};

export default GridPostList;
