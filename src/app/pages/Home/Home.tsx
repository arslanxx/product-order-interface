import Grid from '@mui/material/Grid2';
import { Card, Header } from "@src/app/components/index";
import { PRODUCTS_DATA } from '@src/app/constants/constants';
import { ProductType } from '@src/app/types/types';

export default function Home() {

  return (
    <>
      <Header />
      <Grid container spacing={4} margin={4}  >
        {PRODUCTS_DATA.map((product: ProductType) => (
          <Grid size={{ xs: 12, sm:6 , md:4 ,lg: 3 }} key={product?.id}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
