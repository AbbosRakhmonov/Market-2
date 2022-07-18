import { Suspense } from 'react';
import Input from './Components/Inputs/Input';
import SearchInput from './Components/Inputs/SearchInput';
import TableInput from './Components/Inputs/TableInput';
import { Login } from './Pages/Login/Login';
import PageRoutes from './Pages/PageRoutes';

function App() {
  const localdata = JSON.parse(localStorage.getItem('userData'));
  const isAuthenticated = localdata ? !!localdata.token : null;

  return (
    <div className='App'>
      <Suspense fallback={'Loading'}>
        {isAuthenticated ? <PageRoutes /> : <Login />}
      </Suspense>
      <Input label='Password' password={true} type='password' />
      <Input label='Login' type='text' placeholder='Loginni kiriting' />
      <SearchInput />
      <TableInput />
    </div>
  );
}

export default App;
