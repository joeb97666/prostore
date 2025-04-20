import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import UserButton from "@/components/shared/header/user-button"


const Menu = () => {
    return ( <div className="flex justify-end gap-3">
        <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle/>
                <Button asChild variant='ghost'>
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
                    <EllipsisVertical/>
                </SheetTrigger>
                <SheetContent className="flex flex-col items-start">
                    <SheetTitle>Menu</SheetTitle>
                    <ModeToggle/>
                    <UserButton/>
                    <Button asChild >
                    <Link href='/sign-in'>
                        <UserIcon/> Sign In
                    </Link>
                </Button>
                </SheetContent>
                
            </Sheet>
        </nav>
    </div> );
}
 
export default Menu;