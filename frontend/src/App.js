import { Suspense } from 'react';
import { Login } from './Pages/Login/Login';
import PageRoutes from './Pages/PageRoutes';

function App() {
  const localdata = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = localdata ? !!localdata.token : null;

  return (
    <div className='App'>
<<<<<<< HEAD
      <Suspense fallback={'Loading'}>
        {isAuthenticated ? <PageRoutes /> : <Login />}
=======
      <Suspense fallback={'Loading'}>  
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
>>>>>>> 61dca23 (dddd)
      </Suspense>
    </div>
  );
}

export default App;
