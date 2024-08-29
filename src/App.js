import {Route, Routes} from "react-router-dom";
import {Home} from "./components/Home";
import {ProductDetails} from "./components/ProductDetails";


function App() {
    return (
        <>
            <Routes>
                <Route path={'home'} element={<Home/>}/>
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </>
    );
}

export default App;
