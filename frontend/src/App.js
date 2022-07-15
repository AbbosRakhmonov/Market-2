import { Suspense } from 'react';
import PageRoutes from './Pages/PageRoutes';

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
