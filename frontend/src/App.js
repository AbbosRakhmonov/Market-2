import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

const Login = lazy(() => import('./Pages/Login/Login'));
const PageRoutes = lazy(() => import('./Pages/PageRoutes'));

function App() {
  const { logged } = useSelector((state) => state.login);
  // useEffect bilan useDispatch ishlatiladi
  return (
    <div className='App'>
      <Suspense fallback={'Loading'}>
        {true ? <PageRoutes /> : <Login />}
      </Suspense>
    </div>
  );
}

export default App;