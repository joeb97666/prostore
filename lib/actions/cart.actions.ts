'use server';

import { cookies } from "next/headers"; 
import { CartItem } from "@/types";
import { formatError } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function addItemToCart(data: CartItem) {
    try{
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value

        // TESTING
        console.log({
            'Session Cart ID' : sessionCartId,
        });

        return{
            success: true,
            message: 'Item added to cart',
        };
    }catch(error){
        return{
            success: false,
            message: formatError(error)
        }
    }
}