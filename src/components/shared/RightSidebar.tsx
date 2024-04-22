import { Models } from 'appwrite';
import TrendingPost from './TrendingPost';
import { SkeletonProfile, SkeletonTrendingPosts } from "@/components/shared/skeletons";
import ForYouUserCard from './ForYouUserCard';


type RightSidebarProps = {
  creators: Models.Document[] | undefined;
  posts: Models.DocumentList<Models.Document> | undefined;
  isUserLoading?: boolean;
  isPostLoading?: boolean;
}

const RightSidebar = ({ creators, posts, isUserLoading, isPostLoading }: RightSidebarProps) => {
  const trendingPosts = posts?.documents.map((post) => post).sort((a, b) => b.likes.length - a.likes.length).slice(0, 4);

  return (
    <>
      {isPostLoading && !posts ? (
        <SkeletonTrendingPosts />
      ) : (
        <div className='bg-dark-4 rounded-xl'>
          <h3 className="h5-bold text-light-1 py-4 px-5">Trending now</h3>
            <ul className='trending-container'>
              {trendingPosts?.map((post:Models.Document) => (
                <li key={post.$id}>
                  <TrendingPost post={post} />
                </li>
              ))}
            </ul>
        </div>
      )}

      {isUserLoading && !creators ? (
        <>
          <SkeletonProfile />
          <SkeletonProfile />
          <SkeletonProfile />
        </>
      ) : (
        <ul className="home-creators flex flex-col">
          <h3 className="h5-bold text-light-1 py-4 px-5">Creators for you</h3>
          {creators?.slice(0,4).map((creator) => (
            <li key={creator?.$id}>
              <ForYouUserCard user={creator} />
            </li>
          ))}
        </ul>
      )}
      <div className='footer'>
        <nav className='flex gap-2 px-2 small-normal text-light-4'>
          <a href='https://github.com/Pshenya/lifelens-social-app' target='_blank'>About</a>
          <span>-</span>
          <a href={'https://www.linkedin.com/in/pavel-pshenyshniuk/'} target='_blank'>LinkedIn</a>
          <span>-</span>
          <a href='/assets/PAVEL_PSHENYSHNIUK_RESUME.pdf' target='_blank'>Resume</a>
          <span>-</span>
          <a href='#'>My Portfolio</a>
        </nav>

        <p className='small-normal text-light-4 px-2 py-5'>
            © 2024 <span className='ml-1'>PAVEL PSHENYSHNIUK.</span>
        </p>
      </div>
    </>
  )
}

export default RightSidebar
