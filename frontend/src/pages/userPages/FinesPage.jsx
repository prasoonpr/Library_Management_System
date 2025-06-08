import React from 'react'
import { useGetFinesQuery } from '../../services/userApi'

const FinesPage = () => {
  const {data}=useGetFinesQuery()
  const borrow=data?.borrow
  console.log(borrow)
  return (
    <div>
      
    </div>
  )
}

export default FinesPage
