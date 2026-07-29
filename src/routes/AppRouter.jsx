import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Login from "../pages/account-setup/Login";
import Create from "../pages/account-setup/CreateAccount";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}