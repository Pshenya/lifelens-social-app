import PostForm from '@/components/forms/PostForm'
import { useTheme } from '@/context/ThemeContext'

const CreatePost = () => {
  const { theme } = useTheme();

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
              src="/assets/icons/add-post.svg"
              alt="add-post"
              width={36}
              height={36}
              className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create post</h2>
        </div>

        <PostForm action='Create'/>
      </div>
    </div>
  )
}

export default CreatePost
