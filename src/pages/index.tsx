import Grid from '@mui/material/Grid2';
import { Card, Header } from "@src/components/index";
import { PRODUCTS_DATA } from '@src/constants/constants';
import { ProductType } from '@src/types/types';

interface HomeProps {
  products: ProductType[];
}

export async function getServerSideProps () {
  const products: ProductType[] = await Promise.resolve(PRODUCTS_DATA);

  return {
    props: {
      products,
    },
  };
}

export default function Home({products}: HomeProps) {

  return (
    <>
      <Header />
      <Grid container spacing={4} margin={4}  >
        {products?.map((product: ProductType) => (
          <Grid size={{ xs: 12, sm:6 , md:4 ,lg: 3 }} key={product?.id}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
