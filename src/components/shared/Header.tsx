import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { Settings } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
    const { theme } = useTheme();
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess]);

    return (
        <section className='header'>
            <div className='flex-between py-2 px-3 relative'>
            <Link to='/' className='flex gap-3 items-center'>
                <img src='/assets/images/logo-no-text.svg' alt='logo' className={`absolute ${theme === 'light' && 'svg-icon-black'}`} width={32} height={32}/>
            </Link>

                <div className='flex gap-3'>
                    <Link to={'/settings/account'} className='flex-center'>
                        <Settings className="h-6 w-6" />
                    </Link>
                    <Button variant={'ghost'} className='shad-button_ghost p-1' onClick={() => signOut()}>
                        <img src='/assets/icons/logout.svg' alt='logout' title='Log out' className={`${theme !== 'light' ? 'svg-icon' : 'svg-icon-black'}`}/>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Header
