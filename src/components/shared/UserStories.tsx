import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

type UserStoriesProps = {
  user: Models.Document;
  currentUserId?: string;
};

const UserStories = ({ user, currentUserId }: UserStoriesProps) => {
  const { theme } = useTheme();

  return (
    <Link to={`/profile/${user.$id}`} className="story-link">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className={`border-2 ${theme === 'light' ? 'border-white' : 'border-black' } rounded-full size-[72px] md:size-16`}
      />
      {user.$id === currentUserId && <img src="/assets/icons/plus.svg" alt="add" className="add-story" width={23} height={23}/>}
    </Link>
  )
}

export default UserStories;
