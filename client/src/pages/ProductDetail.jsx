import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Divider,
  IconButton,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    setSnackbarOpen(true);
  };

  if (!product) {
    return (
      <Container>
        <Typography>加载中...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2}>
            <Box
              component="img"
              src={product.images[selectedImage]}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 500,
                objectFit: 'cover',
              }}
            />
          </Paper>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {product.images.map((image, index) => (
              <Paper
                key={index}
                elevation={selectedImage === index ? 3 : 1}
                sx={{
                  cursor: 'pointer',
                  border: selectedImage === index ? '2px solid' : 'none',
                  borderColor: 'primary.main',
                }}
                onClick={() => setSelectedImage(index)}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                  }}
                />
              </Paper>
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display' }}
          >
            {product.name}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            ¥{product.price.toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              材质
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {product.materials.map((material) => (
                <Chip key={material} label={material} />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Quantity Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              数量
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton
              size="small"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
            >
              <AddIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              库存: {product.stock}
            </Typography>
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            fullWidth
          >
            加入购物车
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="商品已添加到购物车"
      />
    </Container>
  );
}

export default ProductDetail; 