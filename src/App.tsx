import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/:id" element={<DetailPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
