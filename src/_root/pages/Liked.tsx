import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Models } from "appwrite";

const Liked = ({ currentUser }: Models.Document) => {
  return (
    <div>
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {currentUser?.liked.length === 0 ? (
            <p className="text-light-3">No liked posts yet</p>
          ) : (
            <GridPostList posts={currentUser.liked} showUser={false} showStats={false}/>
          )}
        </ul>
      )}
    </div>
  )
}

export default Liked;
