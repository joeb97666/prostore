import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types";

export const metadata = {
  title: 'Home',
}

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return ( 
  <> 
    <ProductList 
                data={latestProducts as unknown as Product[]}
                title='Newest Arrivals'
                limit={8}
              />
            </>
          );
}
 
export default HomePage;