import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Incoming from './Incomings/Incoming';
import RegisterIncoming from './Incomings/Routes/RegisterIncoming';
import Incomings from './Incomings/Routes/Incomings';
import SavedIncoming from './Incomings/Routes/SavedIncomings';
import IncomingsList from './Incomings/Routes/IncomingsList';

//pages
const MainPage = lazy(() => import('./MainPage/MainPage'));
const Products = lazy(() => import('./Products/Create/Products'));

const PageRoutes = () => {
  return (
    <section className={'flex bg-background'}>
      <Navbar />
      <div
        className={
          'flex-grow pl-[2.5rem] pr-[1.25rem] py-[1.25rem] h-screen overflow-y-auto'
        }
      >
        <Suspense fallback={'loading'}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route
              path='/maxsulotlar/yaratish/maxsulotlar'
              element={<Products />}
            />
            <Route path='/maxsulotlar/qabul/' element={<Incoming />}>
              <Route path='qabulqilish' element={<RegisterIncoming />} />
              <Route path='qabullar' element={<Incomings />} />
              <Route path='saqlanganlar' element={<SavedIncoming />} />
              <Route path='ruyxat' element={<IncomingsList />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </section>
  );
};

export default PageRoutes;
