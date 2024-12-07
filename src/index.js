import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { PortFolio } from './layouts/portfolio/Portfolio';
import Cart from './layouts/cart/Cart';
import { CartProvider } from './data/context/CartContext';
import GiftCard from '../src/component/GiftCard/GiftCard'
import RedeemCard from './component/RedeemGiftCard/RedeemCard';




const router = createBrowserRouter([
  {
    path: "/",
    element: <PortFolio/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/checkout",
    element: <GiftCard/>,
  },
  {
    path: "/redeem",
    element: <RedeemCard/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </CartProvider>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
