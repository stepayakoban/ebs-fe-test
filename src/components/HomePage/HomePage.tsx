import React, { useState, useEffect, ReactNode } from 'react';

// Определим тип для продукта
interface Product {
  category: ReactNode;
  description: ReactNode;
  imageUrl: string | undefined;
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface HomePageProps {
  updateCart: (newCart: CartItem[]) => void; // Указываем тип для пропса updateCart
}

const HomePage: React.FC<HomePageProps> = ({ updateCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Функция для загрузки данных о продуктах из API
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.examplehttps://fakestoreapi.com/products.com/products'); // Замени на реальный URL
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Если ошибка является экземпляром Error, извлекаем сообщение
      } else {
        setError('Неизвестная ошибка'); // Для случая, если ошибка не экземпляр Error
      }
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  // Логика для добавления товара в корзину
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Обновляем корзину в родительском компоненте через updateCart
    updateCart(cart);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
<div>
      <h1>Список товаров</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Категория:</strong> {product.category}</p> {/* Отображаем категорию */}
            <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
            <span>{product.price}₽</span>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
