import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
} from '@mui/material';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (!category) return true;
      return product.category === category;
    })
    .filter((product) => {
      if (!searchQuery) return true;
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 6, fontFamily: 'Playfair Display' }}
      >
        我们的产品
      </Typography>

      {/* Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>分类</InputLabel>
            <Select
              value={category}
              label="分类"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">全部</MenuItem>
              <MenuItem value="bracelets">手链</MenuItem>
              <MenuItem value="necklaces">项链</MenuItem>
              <MenuItem value="rings">戒指</MenuItem>
              <MenuItem value="earrings">耳饰</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>排序</InputLabel>
            <Select
              value={sortBy}
              label="排序"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">默认</MenuItem>
              <MenuItem value="price-asc">价格从低到高</MenuItem>
              <MenuItem value="price-desc">价格从高到低</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="搜索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={product.images[0]}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ¥{product.price.toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={RouterLink}
                  to={`/products/${product._id}`}
                >
                  查看详情
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            没有找到符合条件的产品
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Products; 