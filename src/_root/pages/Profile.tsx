import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthContext';
import { Link, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useGetUserById } from '@/lib/react-query/queriesAndMutations';
import Liked from './Liked';
import { formatFollowers } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => {
  const followersValue = formatFollowers(value as number);

  return (
    <div className="flex-center gap-2">
      <p className="small-medium lg:base-bold text-light-1">{followersValue}</p>
      <p className="small-medium lg:base-medium text-light-3">{label}</p>
    </div>
  )
};


const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const { data: currentUser } = useGetUserById(id || "");
  const sortedPostsByDate = currentUser?.posts.sort((a:any, b:any) => (
    new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
  );

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <div className={`${currentUser.verified && 'ml-6 xl:ml-0'} flex flex-center xl:flex-start`}>
                <h1 className="text-center xl:text-left h3-bold md:h1-semibold">
                  {currentUser.username}
                </h1>
                {currentUser.verified &&
                  <img src="/assets/icons/verified.png" alt="verified"
                      className='w-6 h-6 ml-2 xl:w-8 xl:h-8 xl:mt-1'
                  />
                }
              </div>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                {currentUser.name}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.followers} label="Followers" />
              <StatBlock value={150} label="Following" />
            </div>

            <div className='mt-7'>
              {currentUser?.bio?.split('\n').map((line: string) => (
                <p key={line} className="small-medium md:base-medium text-center xl:text-left max-w-screen-sm">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/settings/account`}
                className={`h-12 bg-dark-3 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                  className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>


      <div className="profile-posts-block flex justify-center max-w-5xl w-full border-t-2 border-t-dark-5">
        <Link
          to={`/profile/${id}`}
          className={`profile-tab rounded-l-lg ${
            pathname === `/profile/${id}` && "profile-tab_active"
          }`}>
          <img
            src={"/assets/icons/posts.svg"}
            alt="posts"
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'} -mr-1 size-6 md:size-4`}
          />
          <span className='hidden md:block'>Posts</span>
        </Link>
        <Link
          to={`/profile/${id}/clips`}
          className={`profile-tab rounded-l-lg ${
            pathname === `/profile/${id}/clips` && "profile-tab_active"
          }`}>
          <img
            src={"/assets/icons/reels.svg"}
            alt="clips"
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'} -mr-1 size-6 md:size-4`}
          />
          <span className='hidden md:block'>Clips</span>
        </Link>
        {currentUser.$id === user.id && (
        <Link
          to={`/profile/${id}/liked-posts`}
          className={`profile-tab rounded-r-lg ${
            pathname === `/profile/${id}/liked-posts` && "profile-tab_active"
          }`}>
          <img
            src={"/assets/icons/like.svg"}
            alt="like"
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'} -mr-1 size-6 md:size-4`}
          />
          <span className='hidden md:block'>Liked</span>
        </Link>
        )}
        <Link
          to={`/profile/${id}/tagged`}
          className={`profile-tab rounded-l-lg ${
            pathname === `/profile/${id}/tagged` && "profile-tab_active"
          }`}>
          <img
            src={"/assets/icons/tagged.png"}
            alt="tagged"
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'} -mr-1 size-6 md:size-4`}
          />
          <span className='hidden md:block'>Tagged</span>
        </Link>
      </div>


      <Routes>
        <Route
          index
          element={<GridPostList posts={sortedPostsByDate} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<Liked currentUser={currentUser}/>} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;