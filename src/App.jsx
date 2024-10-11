import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/product/:id' element{<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/confirmation' element={<Confirmation />} />
        <Route path='*' element={<Error />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
