import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "shopsphere-cart";

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + product.quantity,
                  item.stock,
                ),
              }
            : item,
        );
      }
      return [...state, product];
    }
    case "UPDATE_QUANTITY": {
      return state.map((item) =>
        item.id == action.payload.id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(action.payload.quantity, item.stock),
              ),
            }
          : item,
      );
    }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity,
      },
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity },
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used inside CartProvider");
    }

    return context
}
