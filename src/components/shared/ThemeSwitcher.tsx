import { useTheme } from "@/context/ThemeContext";

const ThemeSwitcher = () => {
  const {theme, setLightTheme, setDarkTheme, setDimTheme} = useTheme();
  return (
    <div className="common-container_settings h-full">
      <div className="flex flex-col flex-1 items-center gap-2">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <h2 className="h3-bold md:h2-bold text-left w-full p-6">Theme</h2>
        </div>
        <ul className="theme-switcher w-full flex flex-col justify-evenly p-6 gap-7">
          <li className="flex-1 flex items-center gap-7">
            <input type="radio" className="hidden md:radio_input" id="dim" name="theme" value="dim" checked={theme === 'dim'} onChange={() => setLightTheme()} />
            <label htmlFor="dim" className="hidden md:block"></label>
            <button className={`w-full py-10 rounded-xl h4-bold bg-[#071a33] text-[#E7E9EA] border-2 border-[#31455b] ${theme === 'dim' && 'border-primary-500'}`}
                    onClick={() => setDimTheme()}>
              Dim
            </button>
          </li>
          <li className="flex-1 flex items-center gap-7">
            <input type="radio" className="hidden md:radio_input" id="dark" name="theme" value="light" checked={theme === 'light'} onChange={() => setLightTheme()} />
            <label htmlFor="dark" className="hidden md:block"></label>
            <button className={`w-full py-10 rounded-xl h4-bold bg-white text-black border-2 border-[#31455b] ${theme === 'light' && 'border-primary-600'}`}
                    onClick={() => setLightTheme()}>Light</button>
          </li>
          <li className="flex-1 flex items-center gap-7">
            <input type="radio" className="hidden md:radio_input" id="light" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setLightTheme()} />
            <label htmlFor="light" className="hidden md:block"></label>
            <button className={`w-full py-10 rounded-xl h4-bold bg-black text-[#E7E9EA] border-2 border-[#31455b] ${theme === 'dark' && 'border-primary-500'}`}
                    onClick={() => setDarkTheme()}>Blackout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ThemeSwitcher
