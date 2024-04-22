import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/input';
import GridPostList from '@/components/shared/GridPostList';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations';
import useDebounce from '@/hooks/useDebounce';
import Loader from '@/components/shared/Loader';
import { useTheme } from '@/context/ThemeContext';

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  console.log("IS Search fetching", isSearchFetching);
  console.log("Searched posts", searchedPosts);
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} showUser={false}/>;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { theme } = useTheme();
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults &&
      posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
                src="/assets/icons/explore-no-fill.png"
                alt="explore"
                width={36}
                height={36}
                className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
          />
          <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        </div>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-3">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-1">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
            className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => {
            // Sorting posts by likes
            item?.documents.sort((a, b) => b.likes.length - a.likes.length);

            // Filtering posts with likes only
            const popularPosts = item?.documents.filter(post => post.likes.length > 0);

            return <GridPostList key={`page-${index}`} posts={popularPosts} showUser={false}/>
          })
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
