import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = { email: '', password: '' };

const FIREBASE_ERROR_MESSAGES = {
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many failed attempts. Try again later.',
  'auth/invalid-email': 'Please enter a valid email address.',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    setError('');
    try {
      await signInWithGooglePopup();
    } catch (err) {
      console.error('Sign in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in window closed. Please try again.');
        return;
      }
      if (err.code === 'auth/unauthorized-domain') {
        setError('New domain not authorized in Firebase Console settings.');
        return;
      }
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google sign-in provider is disabled in Firebase console.');
        return;
      }
      setError('Google sign in failed. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      setError(FIREBASE_ERROR_MESSAGES[err.code] || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    if (error) setError('');
  };

  return (
    <Paper elevation={3} sx={{ padding: '2rem', flex: 1, maxWidth: '450px' }}>
      <Typography variant='h5' component='h2' gutterBottom fontWeight={700}>
        Already have an account?
      </Typography>
      <Typography variant='body2' color='textSecondary' sx={{ mb: 3 }}>
        Sign in with your email and password
      </Typography>

      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
          margin='normal'
          variant='outlined'
        />
        <TextField
          fullWidth
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
          margin='normal'
          variant='outlined'
        />

        {error && (
          <Alert severity='error' sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
            size='large'
            sx={{ height: '50px' }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={signInWithGoogle}
            disabled={isLoading}
            startIcon={<GoogleIcon />}
            size='large'
            sx={{ height: '50px' }}
          >
            Sign In With Google
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignInForm;
