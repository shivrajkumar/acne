import AcneFooter from '@/components/generic/AcneFooter'
import AcneHeader from '@/components/generic/AcneHeader'
import AcneMarqueeBanner from '@/components/generic/AcneMarqueeBanner'
import React from 'react'

const Layout = ({children}) => {
  return (
      <div>
        <AcneMarqueeBanner />
        <AcneHeader />
        {children}
        <AcneFooter />
    </div>
  )
}

export default Layout