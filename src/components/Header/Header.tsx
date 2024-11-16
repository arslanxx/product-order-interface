"use client";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { PRODUCTS_DATA } from '@src/constants/constants';
import { getData, saveData } from '@src/helper/helper';
import { ProductType } from '@src/types/types';
import * as React from 'react';
import { Drawer } from '..';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

interface SearchAppBarProps {
  handleProductupdate: (product: ProductType[]) => void; // Adjust the parameter type as needed
  cartItems: ProductType[];
  removeCart: () => void
}

export default function SearchAppBar({ handleProductupdate, cartItems, removeCart }: SearchAppBarProps,) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };


  const [search, setSearch] = React.useState('');
  React.useEffect(() => {
    const searchValue = getData('search') || ''; // Default to an empty string if null
    setSearch(searchValue);
  }, []);

  const handleSearch = (value: string) => {
    const productsFromStorage = getData('products');
    setSearch(value);
    saveData("search", value)
    if ('product'.includes(value)) {
      const updatedProducts = PRODUCTS_DATA.map((product: ProductType) => {
        // Find the matching product in PRODUCTS_DATA
        const matchingProduct = productsFromStorage.find((p: ProductType) => p.id === product.id);
    
        // If a match is found, update the stock
        if (matchingProduct) {
          return {
            ...product,
            stock: matchingProduct.stock, // Update stock from PRODUCTS_DATA
          };
        }
    
        // If no match is found, keep the original product data
        return product;
      });
      handleProductupdate(updatedProducts);
    }
    else if (value?.length > 0) {
      const filteredProducts = productsFromStorage.filter((product: ProductType) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      handleProductupdate(filteredProducts);
    }
    else {
      setSearch('');
      saveData("search", '');
      handleProductupdate(productsFromStorage)
    }
}

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Products
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => handleSearch(event.target.value)}
              value={search}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)} cartItems={cartItems} removeCart={removeCart} />
    </Box>
  );
}