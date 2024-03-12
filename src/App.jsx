import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import { Outlet } from "react-router-dom";
import BookPage from "./pages/book/index.jsx";
import ContactPage from "./pages/contact/index.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register/index.jsx";

const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,

    children: [
      { index: true, element: <Home /> },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}
