import React from 'react'
import ScrollToTop from '../components/ScrollToTop.tsx'
import Title from '../components/Title.tsx'
import NotificationContent from '../components/NotificationContent.tsx'

const Notifications = () => {
  return (
    <div className='h-full'>
      <Title title="NOTIFICATIONS" />
      <NotificationContent setVisible={void(0)} showFull={true} />
     

      <ScrollToTop />
    </div>
  )
}

export default Notifications