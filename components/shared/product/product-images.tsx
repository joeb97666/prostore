'use client'
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images  }: {images: string[]; }) => {
    const [current, setCurrent] = useState(0);

    return (<div className="space-y-4">
        <Image src={images[current]} alt='product image' width={1000} height={1000}
        className="min-h-[300px]' object-cover object-center" />
        <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              'border cursor-pointer hover:border-orange-600 transition-colors w-[100px] h-[100px] flex items-center justify-center',
              current === index && 'border-orange-500'
            )}
          >
            <Image
              src={image}
              alt={`thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
        </div>
    </div> );
};
 
export default ProductImages;