import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Paper } from '@mui/material';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const FIREBASE_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/invalid-email': 'Please enter a valid email address.',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      setError(FIREBASE_ERROR_MESSAGES[err.code] || 'Account creation failed. Please try again.');
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
        Don't have an account?
      </Typography>
      <Typography variant='body2' color='textSecondary' sx={{ mb: 3 }}>
        Sign up with your email and password
      </Typography>

      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label='Display Name'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
          margin='normal'
          variant='outlined'
        />
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
        <TextField
          fullWidth
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
          margin='normal'
          variant='outlined'
        />

        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          type='submit'
          variant='contained'
          color='primary'
          disabled={isLoading}
          size='large'
          sx={{ mt: 4, height: '50px' }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SignUpForm;
