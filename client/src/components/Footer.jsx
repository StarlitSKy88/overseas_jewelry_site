import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              关于我们
            </Typography>
            <Typography variant="body2">
              我们致力于为您提供最优质的珠宝首饰，每一件作品都凝聚着匠心与艺术的完美结合。
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              快速链接
            </Typography>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              首页
            </Link>
            <Link
              component={RouterLink}
              to="/products"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              产品
            </Link>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              关于我们
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              display="block"
            >
              联系我们
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              联系方式
            </Typography>
            <Typography variant="body2" paragraph>
              电话：+1 234 567 890
            </Typography>
            <Typography variant="body2" paragraph>
              邮箱：info@luxuryjewelry.com
            </Typography>
            <Typography variant="body2">
              地址：123 Jewelry Street, Fashion City, FC 12345
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
              Luxury Jewelry
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 