import { lazy, Suspense } from 'react';
import PageRoutes from './Pages/PageRoutes';

// const Login = lazy(() => import('./Pages/Login/Login'));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={'Loading'}>
        <PageRoutes />
      </Suspense>
    </div>
  );
}

export default App;
