import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.tsx'
import Products from './components/Products.tsx'
import App from './App.tsx'
import ProductOverview from './components/ProductOverview.tsx'
import Cart from './components/Cart.tsx'
import AskAQuestionForm from './components/AskAQuestionForm.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'productOverview',
        element: <ProductOverview />,
      },
      {
        path: '/',
        element: <Products />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'more',
        element: <AskAQuestionForm />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
