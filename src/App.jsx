import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/index.jsx";
import { Outlet } from "react-router-dom";
import BookPage from "./pages/book/index.jsx";
import ContactPage from "./pages/contact/index.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register/index.jsx";
import { useEffect } from "react";
import { callFetchAccount } from "./services/api.js";
import { useDispatch } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.js";

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
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

export default function App() {
  const dispatch = useDispatch();

  const getAccount = async () => {
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}
