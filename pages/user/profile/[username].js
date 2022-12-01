import React from 'react'
import { useRouter } from 'next/router'

const Username = () => {

  const router = useRouter()
  const { username } = router.query


  return (
    <div className='text-white'>
      <p>{username}</p>
    </div>
  )
}

export default Username