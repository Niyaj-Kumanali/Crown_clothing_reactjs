import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from '../../store/cart/cart.slice';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const clearItemHandler  = useCallback(() => dispatch(clearItemFromCart(cartItem)),  [dispatch, cartItem]);
  const addItemHandler    = useCallback(() => dispatch(addItemToCart(cartItem)),       [dispatch, cartItem]);
  const removeItemHandler = useCallback(() => dispatch(removeItemFromCart(cartItem)),  [dispatch, cartItem]);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} loading='lazy' />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

CheckoutItem.displayName = 'CheckoutItem';

export default CheckoutItem;
