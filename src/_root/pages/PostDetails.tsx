import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById, useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/PostStats";
import GridPostList from "@/components/shared/GridPostList";
import ActionModal from "@/components/shared/ActionModal";
import Loader from "@/components/shared/Loader";
import { useTheme } from "@/context/ThemeContext";

const PostDetails = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: popularPosts, isLoading: isPopularPostLoading } = useGetRecentPosts();
  const { mutate: deletePost } = useDeletePost();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const relatedPosts = popularPosts?.documents.filter(
    (userPost) => userPost.$id !== id && userPost.creator.$id !== post?.creator.$id
  ).slice(0,6);

  const handleConfirmDelete = () => {
    setIsModalOpen(true);
  }

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    navigate(-1);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
      window.scrollTo(0, 0);
    }
  }, [id]);

  return (
    <div className="post_details-container" ref={scrollRef}>
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost">
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                    className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
                  />
                </Link>

                <Button
                  onClick={handleConfirmDelete}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
                <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirmDelete={handleDeletePost}/>
              </div>
            </div>

            <hr className="border w-full border-dark-5" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-primary-500 small-regular">
                    {tag && `#${tag}`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id}/>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        {/* <hr className="border w-full border-dark-5/50" /> */}

        <h3 className="body-bold md:h3-bold w-full my-10 px-4 md:px-0">
          Discover more
        </h3>
        {isPopularPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} showUser={false}/>
        )}
      </div>
    </div>
  );
};

export default PostDetails;

