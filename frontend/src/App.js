import * as React from "react";
import './App.css';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom"
import RequireAuth from './Auth/auth-routes'
import EmployeedProvider from 'src/context/employeed-context';
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
            <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <EmployeedProvider>
                         <Dashboard />
                      </EmployeedProvider>
                    </RequireAuth>
                  }
                  />
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
