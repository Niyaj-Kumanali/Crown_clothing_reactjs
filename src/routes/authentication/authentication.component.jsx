import { Grid, Box, Container } from '@mui/material';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {
  return (
    <Container maxWidth='lg' sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={6} justifyContent='center'>
        <Grid item xs={12} md={5}>
          <SignInForm />
        </Grid>
        <Grid item xs={12} md={5}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Authentication;
