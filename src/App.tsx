import { useState } from 'react';
import HomePage from './components/HomePage/HomePage'; 
import ShoppingCartPage from './components/ShoppingCartPage/ShoppingCartPage';

// Определим типы для продукта и корзины
interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
  };

  return (
    <div className="App">
      {/* Передаем данные и функцию обновления корзины */}
      <HomePage updateCart={updateCart} />
      <ShoppingCartPage cartItems={cart} />
    </div>
  );
}

export default App;
