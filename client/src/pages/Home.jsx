import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import axios from 'axios';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontFamily: 'Playfair Display' }}
          >
            ���华珠宝，永恒之美
          </Typography>
          <Typography variant="h5" paragraph>
            发现独特设计，体验卓越品质
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/products"
            sx={{ mt: 2 }}
          >
            浏览产品
          </Button>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{ mb: 6, fontFamily: 'Playfair Display' }}
        >
          精选产品
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
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
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontFamily: 'Playfair Display' }}
          >
            关于我们
          </Typography>
          <Typography variant="body1" paragraph align="center">
            我们是一家专注于提供高品质珠宝首饰的品牌。每一件作品都经过精心挑选和制作，
            融合传统工艺和现代设计，为您带来独特��佩戴体验。
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/about"
            >
              了解更多
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 