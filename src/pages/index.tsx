import Grid from '@mui/material/Grid2';
import { Card, Header } from "@src/components/index";
import { PRODUCTS_DATA } from '@src/constants/constants';
import { getData, saveData } from '@src/helper/helper';
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

  const [products, setProducts] = useState<ProductType[]>([]);

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

  return (
    <>
      <Header handleProductupdate={updateProducts} />
      <Grid container spacing={4} margin={4}  >
        {products && products?.map((product: ProductType) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product?.id}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
