import {Suspense, lazy} from "react"
import {Route, Routes} from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar";

//pages
const MainPage = lazy(() => import("./MainPage/MainPage"));

const PageRoutes = () => {
    return (
        <section className={'flex bg-background'}>
            <Navbar/>
            <div className={'flex-grow pl-[2.5rem] pr-[1.25rem] py-[1.25rem]'}>
                <Suspense fallback={"loading"}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                    </Routes>
                </Suspense>
            </div>
        </section>
    );
}

export default PageRoutes;
