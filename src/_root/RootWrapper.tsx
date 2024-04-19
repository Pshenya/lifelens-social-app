import { Outlet } from 'react-router-dom'

import LeftSidebar from '@/components/shared/LeftSidebar'
import Bottombar from '@/components/shared/Bottombar'
import Header from '@/components/shared/Header'

const RootWrapper = () => {
  return (
    <div className='root-wrapper'>
      <div className='w-full md:flex'>
        <Header />
        <LeftSidebar />

        <section className='flex flex-1 md:h-full'>
          <Outlet />
        </section>

      </div>
      <Bottombar />
    </div>
  )
}

export default RootWrapper
