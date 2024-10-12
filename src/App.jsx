import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductPage from "./pages/Product";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/cart' element={<Cart />} /> */}
          {/* <Route path='/confirmation' element={<Confirmation />} /> */}
          {/* <Route path='*' element={<Error />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
