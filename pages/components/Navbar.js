import { useAtom } from 'jotai'
import { menuAtom } from "../../store"
import Link from 'next/link'


const Navbar = () => {

  const [menu, setMenu] = useAtom(menuAtom)

  return (
    <nav className={`flex sticky z-50 bg-[#202225] justify-between items-center top-0 ${menu ? '' : 'h-12'}`}
    > 
      <div className='relative text-white text-sm'>
        <div className='flex gap-1 items-center justify-center'>
          <img src="../icons/logo.png" className={`object-cover rounded-lg relative top-[2px] ${menu ? 'w-[140px]': 'w-14'}`} alt="logo" />
          <p className={`${menu ? 'hidden': ''}`}>
            VEmasterCUP
          </p>
        </div>
      </div>
      <ul className={`relative p-4 top-0 text-white ${menu ? '' : 'hidden'}`}
      >
        <li className='flex gap-1 right'>
          <Link href='/' onClick={() => setMenu(!menu)}>Home</Link> 
        </li>
        <li><Link href='/nosotros' onClick={() => setMenu(!menu)}>Nosotros</Link></li>
        <li><Link href='/torneos' onClick={() => setMenu(!menu)}>Torneos</Link></li>
        <li><Link href='/sponsors' onClick={() => setMenu(!menu)}>Sponsors</Link></li>
        <li><Link href='/contacto'onClick={() => setMenu(!menu)}>Contacto</Link></li>
      </ul>
      {
        menu ? (
          <img src='../icons/x.svg'
           className="relative mx-2 w-12" alt='menu' 
           onClick={() => setMenu(!menu)}
      />) : (
        
          <img src='../icons/burguer.svg'
            className="relative w-8 mx-2" alt='menu'
            onClick={() => setMenu(!menu)}
          />
        )
      }

      {
        menu ? (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[-10]'

          onClick={() => setMenu(!menu)}
          ></div>
        ) : ''


      }
      
    </nav>
  )
}

export default Navbar