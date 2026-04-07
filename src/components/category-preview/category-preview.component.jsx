import { Box, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({ title, products }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: '50px' }}>
      <Typography
        component='h2'
        sx={{
          mb: '25px',
          '& a': {
            fontSize: '28px',
            color: 'black',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 0.7,
            },
          },
        }}
      >
        <Link to={title}>{title.toUpperCase()}</Link>
      </Typography>
      <Grid container spacing={3}>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default CategoryPreview;
