"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductType } from '@src/types/types';

interface CardProps {
  product: ProductType;
  handleAddToCart: (products: ProductType) => void;
}

const MediaCard: React.FC<CardProps> = ({ product, handleAddToCart }) => {
  const addToCart = () => handleAddToCart(product);
  return (
    <Card>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image="/product.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Stock: {product?.stock}</Button>
        <Button size="small" disabled={product?.stock <= 0} onClick={addToCart}>{product?.stock > 0  ? 'Add To Cart' : 'Out of Stock'}</Button>
        <Button size="small">Price: {product?.price}</Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;