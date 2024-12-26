import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addItemToCart, updateItemQuantity, removeItemFromCart } from '../redux/cartSlice';
import '../styles.css'; 

interface Product {
  id: number;
  name: string;
  price: number;

}

const products: Product[] = [
  {
    id: 1, name: 'Product 1', price: 10,
    
  },
  { id: 2, name: 'Product 2', price: 20,},
  { id: 3, name: 'Product 3', price: 30,},
  { id: 4, name: 'Product 4', price: 40,},
  { id: 5, name: 'Product 5', price: 50,},
  { id: 6, name: 'Product 6', price: 60,},
  { id: 7, name: 'Product 6', price: 70,},
  { id: 8, name: 'Product 6', price: 10,},
  
];

const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddItem = (product: Product) => {
    dispatch(addItemToCart({ ...product, quantity }));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      <div className="products">
       
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <div>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
              <button onClick={() => handleAddItem(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart flex-column">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price} x {item.quantity} = ${item.price * item.quantity}</p>
                </div>
                <div className="flex-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    min="1"
                  />
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-total">
          <span>Total:</span>
          <span>₹{calculateTotalPrice()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
