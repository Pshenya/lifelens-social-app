import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INITIAL_USER, useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/CONSTANTS';
import { INavLink } from '@/types';
import { SkeletonProfile } from './skeletons';
import { Button } from '../ui/button'
import ProfileDropdown from './ProfileDropdown';
import { useTheme } from '@/context/ThemeContext';

const LeftSidebar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isLoading, setUser, setIsAuthenticated } = useUserContext();

  const { mutate: signOut, isPending: isSigningOut } = useSignOutAccount();
  
  const handleSignOut = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const links = [
    ...sidebarLinks,
    {
      imgURL: "/assets/icons/profile.png",
      route: `/profile/${user.id}`,
      label: "Profile",
    },
  ];

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col px-6 py-4 ">
        <Link to='/' className='flex gap-3 items-center p-4'>
          <img src='/assets/icons/x_logo.svg' alt='logo' className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`} width={24} height={24} />
        </Link>

        <ul className='flex flex-col'>
          {links.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className={`leftsidebar-link group body-medium ${isActive && 'body-bold text-primary-500'} `}>
                <NavLink to={link.route}>
                  <div className='navlink w-fit flex gap-5 items-center p-4 rounded-xl pr-8'>
                    <img src={link.imgURL} alt={link.label} width={24} height={24}
                        className={`group-hover:svg-icon-invert-white ${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}
                                    ${isActive && 'svg-icon-primary-500'}`} />
                    {link.label}
                  </div>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      {isLoading || !user.email ? (
            <SkeletonProfile />
        ) : (
          <div className='pl-6 pr-2 py-4 cursor-pointer'>
            <ProfileDropdown handleSignOut={handleSignOut} isSigningOut={isSigningOut}/>
          </div>
        )
      }

      {/* <Button variant={'ghost'} className='shad-button_ghost' onClick={(e) => handleSignOut(e)}>
          <img src='/assets/icons/logout.svg' alt='logout' className='svg-icon'/>
          <span className='body-medium'>
            {isSigningOut && <Loader />}
            Log out
          </span>
      </Button> */}
    </nav>
  )
}

export default LeftSidebar
