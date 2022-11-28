import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'

import Link from 'next/link'


const Profile = () => {
  
  const router = useRouter()
  const { username } = router.query

  const [user, setUser] = useState({})
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
  }, [])
  
  return (

    <div>Profile</div>
  )
}

export default Profile