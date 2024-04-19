import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";
import PostCard from "@/components/shared/PostCard";
import RightSidebar from "@/components/shared/RightSidebar";
import UserStories from "@/components/shared/UserStories";
import { SkeletonPostCard, SkeletonStories } from "@/components/shared/skeletons";

const Home = () => {
  const { user } = useUserContext();

  const { data: posts, isLoading: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();
  const { data: creators, isLoading: isUserLoading, isError: isErrorCreators } = useGetUsers();
  const topCreators = creators?.documents.filter((creator: Models.Document) => creator.followers > 1000 && user.id !== creator.$id);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="flex gap-12 2xl:gap-28">
        <div className="home-container">
          <div className="home-posts">
            <div className="w-full relative">
              <ul className="stories-container">
                {!creators && <SkeletonStories />}
                {creators?.documents.filter((creator) => creator.$id === user.id)
                .map((creator) => (
                  <li key={creator.$id} className="user-story">
                    <UserStories user={creator} currentUserId={user.id}/>
                  </li>
                ))}
                {topCreators?.filter((person) => user.id !== person.$id).slice(0,7).map((creator) => (
                  <li key={creator.$id} className="user-story">
                    <UserStories user={creator} />
                  </li>
                ))}
              </ul>
            </div>
            {/* <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2> */}
            {isPostLoading && !posts ? (
              <>
                <SkeletonPostCard />
                <SkeletonPostCard />
              </>
            ) : (
              <ul className="flex flex-col flex-1 gap-6 w-full max-w-[470px]">
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className="post-card_li">
                    <PostCard post={post} user={user}/>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rightsidebar">
          <RightSidebar creators={topCreators} posts={posts} isUserLoading={isUserLoading} isPostLoading={isPostLoading} />
        </div>

      </div>

    </div>
  );
};

export default Home;
