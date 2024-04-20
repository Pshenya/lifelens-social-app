import { useNavigate } from 'react-router-dom';

const UnderConstructionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className='flex flex-col items-center gap-6'>
        <img src="/assets/images/under-construction.png" alt="under construction" className="size-32 svg-icon"/>
        <p className='max-w-[350px] md:max-w-5xl'>
          This page is still under construction.
        </p>
        <div className='flex justify-center items-center gap-2 mt-6 hover:svg-icon-primary-500'>
          <img src="/assets/icons/back_arrow.png" alt="homepage" className="size-6 svg-icon"/>
          <button className='back-home_btn' onClick={() => navigate('/')}>Homepage</button>
        </div>
      </div>
    </div>
  );
}

export default UnderConstructionPage
