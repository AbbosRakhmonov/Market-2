import { useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from './Pages/Login/loginSlice';

// pages
const Login = lazy(() => import('./Pages/Login/Login'));
const PageRoutes = lazy(() => import('./Pages/PageRoutes'));

function App() {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.login);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      dispatch(logIn(userData));
    }
  }, [dispatch]);
  return (
    <div className='App'>
      <Suspense fallback={'loading'}>
        { logged ? <PageRoutes /> : <Login />}
      </Suspense>
      <ToastContainer
        position='top-right'
        theme={'colored'}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
