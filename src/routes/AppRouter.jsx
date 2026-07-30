import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/account-setup/Login";
import CreateAccount from "../pages/account-setup/CreateAccount";
import AuthLogin from "../components/AuthLogin";
import CreatePost from "../pages/CreatePost";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route element={<AuthLogin />}>
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}