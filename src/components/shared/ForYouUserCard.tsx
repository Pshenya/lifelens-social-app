import { Models } from "appwrite";
import { Link } from "react-router-dom";

type ForYouUserCardProps = {
  user: Models.Document;
};

const ForYouUserCard = ({ user }: ForYouUserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="for-you-user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full size-12"
      />

      <div className="flex flex-col gap-1">
        <p className="base-bold text-light-1 line-clamp-1">
          {user.name}
        </p>
        <p className="body-regular text-light-3 line-clamp-1">
          @{user.username}
        </p>
      </div>
    </Link>
  );
};

export default ForYouUserCard;