"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getData, saveData } from '@src/helper/helper';
import { ProductType } from '@src/types/types';
import { PRODUCTS_DATA } from '@src/constants/constants';

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
}

export default function SearchAppBar({ handleProductupdate }: SearchAppBarProps) {

  const [search, setSearch] = React.useState('');
  React.useEffect(() => {
    const searchValue = localStorage.getItem('search') || ''; // Default to an empty string if null
    setSearch(searchValue);
  }, []);

  const handleSearch = (value: string) => {
    if (value?.length > 0) {
      setSearch(value);
      // const products = PRODUCTS_DATA;
      const filteredProducts = PRODUCTS_DATA.filter((product: { name: string }) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      handleProductupdate(filteredProducts);
      saveData('products', filteredProducts);
      localStorage.setItem('search', value);    
    }
    else {
      handleProductupdate(PRODUCTS_DATA)
      saveData('products', PRODUCTS_DATA)
    }

  }
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
          >
            <MenuIcon />
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
    </Box>
  );
}