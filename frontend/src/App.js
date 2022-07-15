import { Suspense } from 'react';
import { Login } from './Pages/Login/Login';
import PageRoutes from './Pages/PageRoutes';

function App() {
  const localdata = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = localdata ? !!localdata.token : null;

  return (
    <div className='App'>
      <Suspense fallback={'Loading'}>
        {isAuthenticated ? <PageRoutes /> : <Login />
      </Suspense>
    </div>
  );
}

export default App;
