import RequireAuth from './Auth/auth-routes'
import EmployeedProvider from 'src/context/employeed-context';
import { Outlet } from "react-router-dom"
import Header from './components/header'

export default function Layout() {

    const bodyElm = document.getElementsByTagName('body')
    bodyElm[0].classList.add('dashboard')

    return (
      <EmployeedProvider>
         <RequireAuth>
            <Header />
            <section className="pagesection">
               <Outlet />
            </section>
         </RequireAuth>
      </EmployeedProvider>
    );
  }