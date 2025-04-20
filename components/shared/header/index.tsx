
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';



const Header = () => {
    return <header className='w-full border-b '>
        <div className='wrapper flex-between'>
            <div className='flex-start'>
                <Link href='/' className='flex-start'>
                <span className=" lg:block font-bold text-sm italic text-center">
                     <Image src='/images/logo.png' 
                            className="hidden lg:block font-bold text-sm italic text-center"
                         alt={'${APP_NAME} logo'} 
                         height={150}
                         width={200}
                         priority={true}></Image>
                         <p className='text-b text-base mt-1 text-cyan-800'>{APP_NAME}</p>
                    </span>
                 
                   
                </Link>
            </div>
            <Menu/>
        </div>
    </header>
}
 
export default Header;