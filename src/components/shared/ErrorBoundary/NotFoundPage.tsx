import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <div className='flex flex-col'>
        <p className='max-w-[350px] md:max-w-5xl'>
          404, page not found.
        </p>
        <div className='flex justify-center items-center gap-2 mt-10 hover:svg-icon-primary-500'>
          <img src="/assets/icons/back_arrow.png" alt="404" className="size-6 svg-icon"/>
          <button className='back-home_btn' onClick={() => navigate('/')}>Homepage</button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage
