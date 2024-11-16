import Grid from '@mui/material/Grid2';
import { Card, Header } from "@src/components/index";
import { PRODUCTS_DATA } from '@src/constants/constants';
import { getData, removeData, saveData } from '@src/helper/helper';
import { ProductType } from '@src/types/types';
import { useEffect, useState } from 'react';

interface HomeProps {
  data: ProductType[];
}

export async function getServerSideProps() {
  const products: ProductType[] = await Promise.resolve(PRODUCTS_DATA);

  return {
    props: {
      data: products,
    },
  };
}

export default function Home({ data }: HomeProps) {

  // const [addToCart, setAddToCart] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);


  useEffect(() => {
    if (getData('products')) {
      setProducts([...getData('products')])
    } else {
      setProducts([...data])
    }
  }, [])

  useEffect(() => {
    if (!getData('products')) {
      saveData('products', products as ProductType[]);

    } else {
      saveData('products', products as ProductType[]);
    }

  }, [JSON.stringify(products)]);


  const updateProducts = (products: ProductType[]) => {
    setProducts([...products])
  }



  const handleAddToCart = async (product: ProductType) => {
    // Fetch data from local storage
    const cartItems = await getData('cartItems') || [];
    const existingProducts = await getData('products') || [];
  
    // Find and update the product in the products list
    const updatedProducts = existingProducts.map((item: ProductType) =>
      item.id === product.id ? { ...item, stock: item.stock - 1 } : item
    );
  
    // Save updated products to local storage
  
  
    // Add product to the cart or update its quantity
    const existingCartItemIndex = cartItems.findIndex(
      (item: ProductType) => item.id === product.id
    );
  
    if (existingCartItemIndex !== -1) {
      // If the product already exists in the cart, increase its quantity
      cartItems[existingCartItemIndex].stock += 1;
    } else {
      // Add the product to the cart
      cartItems.push({ ...product, stock: 1 }); // Stock in the cart reflects the quantity added
    }
  
    // Save updated cart items to local storage
    saveData('products', updatedProducts);
    setProducts(updatedProducts);
    saveData('cartItems', cartItems);
    setCartProducts(cartItems)
  };

  const removeCart = () => {
    setCartProducts([]);
    setProducts(data);
    saveData('products',data)
    removeData('cartItems');
  }

  return (
    <>
      <Header handleProductupdate={updateProducts} cartItems={cartProducts} removeCart={removeCart} />
      <Grid container spacing={4} margin={4}  >
        {products && products?.map((product: ProductType) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product?.id}>
            <Card handleAddToCart={handleAddToCart} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
