import * as React from "react";
import './App.css';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom"
import AuthProvider from './context/authcontext'
import Login from "./pages/login"
import Layout from "./layout";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        
          <Routes>
            <Route path="/" element={<Login />} />
              <Route element={<Layout/>}>
                  <Route
                    path="/dashboard"
                    element={<Dashboard />}
                  />
              </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}