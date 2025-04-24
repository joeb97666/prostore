import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import UserButton from "@/components/shared/header/user-button"


const Menu = () => {
    return ( <div className="flex justify-end gap-3">
        <nav className="hidden md:flex w-full max-w-xs gap-1">
            <div className="rounded-md bg-cyan-800 text-white hover:bg-slate-500 hover:stroke-black hover:font-black">
                <ModeToggle />
            </div>
                <Button asChild variant='ghost' className="bg-cyan-800 font-bold text-white hover:bg-slate-500 hover:stroke-black hover:font-black">
                <Link href='/cart'>
                        <ShoppingCartIcon/> Cart
                    </Link>
                </Button>
                <UserButton>

                </UserButton>

        </nav>
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <EllipsisVertical />
                </SheetTrigger>
                <SheetContent className="flex flex-col items-start">
                    <SheetTitle>Menu</SheetTitle>
                    <ModeToggle/>
                    <UserButton/>
                    <Button asChild 
                            variant='ghost' 
                            className="bg-cyan-800 font-bold text-white hover:bg-slate-500
                                         hover:stroke-black hover:font-black" >
                    <Link href='/cart'>
                        <ShoppingCartIcon/> Cart
                    </Link>
                    </Button>
                </SheetContent>
                
            </Sheet>
        </nav>
    </div> );
}
 
export default Menu;