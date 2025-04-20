
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';



const Header = () => {
    return <header className='w-full border-b '>
        <div className='wrapper flex-between'>
            <div className='flex-start'>
                <Link href='/' className='flex-start'>
                  <Image src='/images/logo.png' 
                         alt={'${APP_NAME} logo'} 
                         height={150}
                         width={200}
                         priority={true}></Image>
                    <span className="hidden lg:block font-bold text-2xl ml-3">
                    {APP_NAME}
                    </span>
                </Link>
            </div>
            <Menu/>
        </div>
    </header>
}
 
export default Header;