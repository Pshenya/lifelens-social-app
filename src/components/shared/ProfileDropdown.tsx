import { LogOut, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Loader from "./Loader"
import { Link } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"

type ProfileDropdownProps = {
  handleSignOut: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSigningOut: boolean;
}

const ProfileDropdown = ({ handleSignOut, isSigningOut }: ProfileDropdownProps) => {
  const { theme } = useTheme();
  const { user } = useUserContext();

  return (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='leftsidebar_profile'>
          <div className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="size-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="base-bold">{user.name}</p>
              <p className="body-regular text-light-3">@{user.username}</p>
            </div>
          </div>
          <img
            src="/assets/icons/dots.png"
            alt="options"
            className={`size-4 self-center ${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shad-dropdown">
        <DropdownMenuGroup>
          <Link to={'/settings/account'}>
            <DropdownMenuItem className='w-full cursor-pointer hover:bg-dark-5'>
              <Settings className="mr-2 h-4 w-4" />
              <span className="base-bold">
                Settings
              </span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={handleSignOut}
            role="button"
            tabIndex={0}
            className="cursor-pointer hover:bg-dark-5"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {/* <img src='/assets/icons/logout.svg' alt='logout' className='mr-2 svg-icon' width={16} height={16}/> */}
            <span className='base-bold'>
              {isSigningOut && <Loader />}
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
