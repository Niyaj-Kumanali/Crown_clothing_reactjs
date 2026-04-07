import { Fragment, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Box, useMediaQuery, useTheme } from '@mui/material';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.slice';
import { selectIsCartOpen } from '../../store/cart/cart.slice';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignOut = useCallback(async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }, []);

  return (
    <Fragment>
      <AppBar position='sticky' color='default' elevation={1} sx={{ backgroundColor: 'white', mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between', padding: isMobile ? '0 1rem' : '0 2.5rem' }}>
          <LogoContainer to='/' aria-label='Crown Clothing Home' style={{ width: '50px', height: '39px' }}>
            <CrwnLogo className='logo' style={{ width: '100%', height: '100%' }} />
          </LogoContainer>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinks>
              <NavLink to='/shop'>SHOP</NavLink>
              {currentUser ? (
                <NavLink as='span' onClick={handleSignOut} role='button' tabIndex={0} sx={{ cursor: 'pointer' }}>
                  SIGN OUT
                </NavLink>
              ) : (
                <NavLink to='/auth'>SIGN IN</NavLink>
              )}
            </NavLinks>
            <CartIcon />
          </Box>
        </Toolbar>
        {isCartOpen && <CartDropdown />}
      </AppBar>
      <Box sx={{ padding: '0 2rem' }}>
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default Navigation;
