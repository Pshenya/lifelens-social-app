import React, { useState, useEffect } from "react";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import Loader from "./Loader";
import { useTheme } from "@/context/ThemeContext";

type PostStatsDisabledProps = {
  likes: string[];
  isSaved: boolean;
}

const PostStatsDisabled = ({likes, isSaved}: PostStatsDisabledProps) => {
  return (
    <div className="flex justify-between z-20">
      <div className="flex gap-2 mr-5">
          <img
            src="/assets/icons/liked.svg"
            alt="like" title="Like" width={24} height={24}
            className="svg-icon"
          />
        <p className="body-medium lg:base-medium text-white">{likes?.length}</p>
      </div>
      <div className="flex gap-2">
        <img
          src={isSaved
            ? "/assets/icons/saved.svg"
            : "/assets/icons/bookmark.svg"
          }
          alt="save" title="Save" width={24} height={24}
          className="svg-icon"
        />
      </div>
    </div>
  )
}

type PostStatsProps = {
  post: Models.Document;
  userId: string;
  disabled?: boolean;
}

const PostStats = ({ post, userId, disabled }: PostStatsProps) => {
  const { theme } = useTheme();
  const [likes, setLikes] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

  useEffect(() => {
    const likesList = post?.likes?.map((user: Models.Document) => user.$id);
    setLikes(likesList);

    setIsSaved(!!savedPostRecord);
  }, [post, currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  }

  if(disabled){
    return <PostStatsDisabled likes={likes} isSaved={isSaved}/>
  }

  return (
    <div className="flex justify-between pt-[10px] pb-[10px] px-3 md:px-0 z-20">
      <div className="flex gap-2 items-center mr-5">
          <img
            src={checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.png"
            }
            alt="like" title="Like" width={28} height={28}
            onClick={(e) => handleLikePost(e)} className={`like-icon z-20 cursor-pointer ${checkIsLiked(likes, userId) ? 'svg-icon-liked' : (theme !== 'light' ? 'svg-icon' : 'svg-icon-black')}`}
          />
        <p className="body-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        <img
          src={isSaved
            ? "/assets/icons/saved.svg"
            : "/assets/icons/bookmark.svg"
          }
          alt="save" title="Save" width={28} height={28}
          onClick={(e) => handleSavePost(e)} className={`z-20 ${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'} cursor-pointer`}
        />
      </div>
    </div>
  )
}

export default PostStats
