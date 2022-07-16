import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainPage} from './MainPage/MainPage';
import Navbar from "../Components/Navbar/Navbar";

const PageRoutes = () => {
    return (
        <section className={'flex bg-background'}>
            <Navbar/>
            <div className={'flex-grow pl-[2.5rem] pr-[1.25rem] py-[1.25rem]'}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
            </div>
        </section>
    );
};

export default PageRoutes;
