import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.slice';
import PageLoader from './components/page-loader/page-loader.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

// ─── Lazy-loaded routes (code splitting) ─────────────────────────────────────
const Navigation       = lazy(() => import('./routes/navigation/navigation.component'));
const Home             = lazy(() => import('./routes/home/home.component'));
const Shop             = lazy(() => import('./routes/shop/shop.component'));
const Authentication   = lazy(() => import('./routes/authentication/authentication.component'));
const Checkout         = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader $fullPage label='Loading…' />}>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='shop/*' element={<Shop />} />
            <Route path='auth' element={<Authentication />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
