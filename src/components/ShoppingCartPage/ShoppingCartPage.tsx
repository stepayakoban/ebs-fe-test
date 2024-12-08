import React from 'react';

// Определим тип для CartItem
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[]; // Указываем тип для пропса cartItems
}

const ShoppingCartPage: React.FC<CartPageProps> = ({ cartItems }) => {
  return (
    <div>
      <h1>Корзина</h1>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}₽ x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCartPage;
