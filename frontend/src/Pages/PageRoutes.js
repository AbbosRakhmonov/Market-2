import {lazy, Suspense} from "react"
import {Route, Routes} from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar";

//pages
const MainPage = lazy(() => import("./MainPage/MainPage"));
const Products = lazy(() => import("./Products/Create/Products"))

const PageRoutes = () => {
    return (
        <section className={'flex bg-background'}>
            <Navbar/>
            <div className={'flex-grow pl-[2.5rem] pr-[1.25rem] py-[1.25rem] h-screen overflow-y-auto'}>
                <Suspense fallback={"loading"}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/maxsulotlar/yaratish/maxsulotlar" element={<Products/>}/>
                    </Routes>
                </Suspense>
            </div>
        </section>
    );
}

export default PageRoutes;
