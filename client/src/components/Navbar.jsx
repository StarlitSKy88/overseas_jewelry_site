import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Container,
  Box,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount] = useState(0);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontFamily: 'Playfair Display',
            }}
          >
            Luxury Jewelry
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button color="inherit" component={RouterLink} to="/">
              首页
            </Button>
            <Button color="inherit" component={RouterLink} to="/products">
              产品
            </Button>
            <Button color="inherit" component={RouterLink} to="/about">
              关于我们
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              联系我们
            </Button>
          </Box>

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to="/"
              onClick={handleClose}
            >
              首页
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/products"
              onClick={handleClose}
            >
              产品
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/about"
              onClick={handleClose}
            >
              关于我们
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/contact"
              onClick={handleClose}
            >
              联系我们
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 