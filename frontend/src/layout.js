import { Outlet } from "react-router-dom"
import Header from './components/header'

export default function Layout() {

    const bodyElm = document.getElementsByTagName('body')
    bodyElm[0].classList.add('dashboard')

    return (
      <div>
         <Header />
         <section className="pagesection">
            <Outlet />
         </section>
      </div>
    );
  }