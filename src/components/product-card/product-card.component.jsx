import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, Typography, Button as MuiButton, Box } from '@mui/material';

import { addItemToCart } from '../../store/cart/cart.slice';
import { selectCurrentUser } from '../../store/user/user.slice';

const ProductCard = memo(({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [added, setAdded] = useState(false);

  const addProductToCart = useCallback(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    dispatch(addItemToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [dispatch, product, currentUser, navigate]);

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '350px',
        alignItems: 'center',
        position: 'relative',
        '&:hover button': {
          opacity: 0.85,
          display: 'flex',
        },
        '& img:hover': {
          opacity: 0.8,
        },
      }}
    >
      <CardMedia
        component='img'
        image={imageUrl}
        alt={name}
        sx={{
          width: '100%',
          height: '90%',
          objectFit: 'cover',
          marginBottom: '5px',
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '10%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '18px',
          padding: '0 10px',
        }}
      >
        <Typography variant='body1' sx={{ fontWeight: 400 }}>
          {name}
        </Typography>
        <Typography variant='body1' sx={{ fontWeight: 400 }}>
          ${price}
        </Typography>
      </Box>
      <MuiButton
        variant='contained'
        color='primary'
        onClick={addProductToCart}
        sx={{
          width: '80%',
          opacity: 0.7,
          position: 'absolute',
          top: '255px',
          display: 'none',
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          '&:hover': {
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
          },
        }}
      >
        {added ? '✓ Added!' : 'Add to Cart'}
      </MuiButton>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
