import { bottombarLinks } from '@/CONSTANTS';
import { useUserContext } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const { user } = useUserContext();


  return (
    <div className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link to={link.route} key={link.label} className='flex-center flex-col gap-1 p-2 transition'>
            <img src={`${isActive ? link.imgURL + 'fill.png' : link.imgURL + 'no-fill.png'}`} alt={link.label}
                className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'} ${isActive && 'svg-icon-primary-500'} ${link.label === 'Create' && 'absolute'}`} width={`${link.label === 'Create' ? 32 : 26}`} height={`${link.label === 'Create' ? 32 : 26}`} />
          </Link>
        )
      })}
      <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
          <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profileImage'
              className='w-8 h-8 rounded-full'
          />
      </Link>
    </div>
  )
}

export default Bottombar
