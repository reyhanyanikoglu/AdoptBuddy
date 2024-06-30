import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import UserPosts from "./pages/UserPosts";
import PetType from "./pages/PetType";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import DeletePost from "./pages/DeletePost";
import UserProvider from "./context/userContext";
import SearchResults from "./components/SearchResults";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/types/:type", element: <PetType /> },
      { path: "posts/users/:id", element: <UserPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "logout", element: <Logout /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "search", element: <SearchResults /> },  
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);