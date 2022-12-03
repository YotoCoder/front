import { Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Usermenu = () => {

  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const [username, setUsername] = useState('')

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    setUsername(username)
  }, [])

  return (

    <>
    {
      username ? (

    <div className="relative z-[5000]">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="inline-flex items-center justify-center m-2 lg:p-2 rounded-md text-gray-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-inset"
          id="user-menu"
          aria-expanded="false"
          aria-haspopup="true"
        >
        <span className="sr-only">Abrir Menu</span>
        <div className='flex items-center justify-center text-white gap-2'>
          <p>{username}</p>
          <img
            src="https://vemastercup.com/icons/user.svg"
            className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer justify-center items-center"
            alt="user"
          />
        </div>
      </button>

      <Transition
        show={userMenuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-4 bg-black ring-1 ring-black ring-opacity-5 focus:outline-none">
          
          <Link
            href={`/user/profile/${username}`}
            className="block px-4 py-2 text-base text-white hover:bg-yellow-700"
            role="menuitem"
          >
            Tu perfil
          </Link>

          <Link
            href="/user/logout"
            className="block px-4 py-2 text-base text-white hover:bg-yellow-700"
            role="menuitem"
          >
            Sign out
          </Link>
        </div>
      </Transition>
    </div>

    ) : null
}
  </>
  )
}

export default Usermenu