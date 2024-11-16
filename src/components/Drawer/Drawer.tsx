import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ProductType } from '@src/types/types';

interface GenericDrawerProps {
  open: boolean; // Control drawer open/close state
  onClose: () => void; // Callback when drawer is closed
  cartItems: ProductType[]; // Products in the cart
  removeCart: () => void
}

const GenericDrawer: React.FC<GenericDrawerProps> = ({ open, onClose, cartItems, removeCart }) => {
  const DrawerList = (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      {/* Display cart items */}
      <List sx={{ width: '100%' }}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item: { id: number; name: string; stock: number }, index: number) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={`${item.name} - Stock: ${item.stock}`} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No items in the cart" />
          </ListItem>
        )}
      </List>

      {/* Divider */}
      <Divider sx={{ width: '100%', my: 2 }} />

      {/* Confirm Order Button */}
      {cartItems?.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, alignSelf: 'center' }}
          onClick={() => removeCart()}
        >
          Confirm Order
        </Button>
      )}
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
};

export default GenericDrawer;
