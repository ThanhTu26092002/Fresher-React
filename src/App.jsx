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
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.js";
import Loading from "./components/loading/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";

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
    errorElement: <NotFound />,

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
    path: "/admin",
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
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
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const getAccount = async () => {
    if (window.location.pathname === "/login") return;
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
      {isAuthenticated === true || window.location.pathname === "/login" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
