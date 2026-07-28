import {BrowserRouter, Routes, Route} from "react-router";
import Layout from "../layouts/Layout";
import Login from "../pages/account-setup/Login";
import Create from "../pages/account-setup/Create";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}