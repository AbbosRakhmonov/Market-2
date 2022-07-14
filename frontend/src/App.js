import {lazy, Suspense} from "react";
import {Routes, Route} from "react-router-dom";

const Login = lazy(() => import("./Pages/Login/Login"));

function App() {
    return <div className='App'>
        <Suspense fallback={"Loading"}>
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Suspense>
    </div>;
}

export default App;
