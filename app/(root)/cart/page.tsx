//@/product/cart/page.tsx

import CartTable from "./CartTable";
import { getMyCart } from "@/lib/actions/cart.actions";

export const metadata = {
    title: 'Cart'
}

const CartPage = async () => {
    const cart = await getMyCart(); 
    return ( 
        console.log(cart),
     <CartTable/>
     );
};
 
export default CartPage;