import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { useTheme } from "@/context/ThemeContext";
import UpdateProfile from "./UpdateProfile";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

const Settings = () => {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
      <div className="settings-container">
        <div className="flex-1 h-full md:min-w-[220px] max-w-[600px] ">
          <div className="flex flex-col gap-6">
            <h2 className="h3-bold md:h2-bold text-left w-full px-6 py-6">Settings</h2>
            <ul className="flex flex-col gap-3">
              <Link to={`/settings/account`}
                    className={`setting-tab ${
                      pathname === `/settings/account` && "setting-tab_active"
                    }`}>
                <p className="body-regular">
                  Your account
                </p>
                <img
                    src="/assets/icons/right.png"
                    alt="next"
                    className={`size-[18px] ${theme === 'light' && 'svg-icon-lightgray'}`}
                />
              </Link>
              <Link to={'/settings/appearance'}
                    className={`setting-tab ${
                      pathname === `/settings/appearance` && "setting-tab_active"
                    }`}>
                <p className="body-regular">
                  Theme
                </p>
                <img
                    src="/assets/icons/right.png"
                    alt="next"
                    className={`size-[18px] ${theme === 'light' && 'svg-icon-lightgray'}`}
                />
              </Link>
            </ul>
          </div>
        </div>



        <Routes>
          <>
            <Route index path='' element={<UpdateProfile />} />
            <Route path='account' element={<UpdateProfile />} />
          </>
          <Route path='appearance' element={<ThemeSwitcher />} />
        </Routes>
        <Outlet />
      </div>
  )
}

export default Settings
