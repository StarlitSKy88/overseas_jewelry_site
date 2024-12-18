import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

function Cart() {
  // 模拟购物车数据
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '18K金钻石项链',
      price: 9999,
      quantity: 1,
      image: 'https://example.com/necklace.jpg',
    },
    {
      id: 2,
      name: '珍珠耳环',
      price: 3999,
      quantity: 2,
      image: 'https://example.com/earrings.jpg',
    },
  ]);

  const handleQuantityChange = (id, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 6, fontFamily: 'Playfair Display' }}
      >
        购物车
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            您的购物车是空的
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/products"
            sx={{ mt: 2 }}
          >
            继续购物
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <Grid container>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ¥{item.price.toLocaleString()}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mt: 2,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ ml: 'auto' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                订单摘要
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>商品总价</Typography>
                <Typography>¥{calculateTotal().toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>运费</Typography>
                <Typography>免费</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">总计</Typography>
                <Typography variant="h6" color="primary">
                  ¥{calculateTotal().toLocaleString()}
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth size="large">
                结算
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/products"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                继续购物
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Cart; 