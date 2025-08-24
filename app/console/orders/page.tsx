import React from 'react'
import OrdersPage from './OrdersPage'
import Navbar from '@/components/commen/Navbar'
import { LicenseTypes } from '@/utils/enum.types'

const page = () => {
  return (
    <>
    <Navbar NavType={LicenseTypes.ADMIN} />
      <OrdersPage />
    </>
  )
}

export default page
