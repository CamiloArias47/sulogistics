import {
    Link,
    Outlet,
} from "react-router-dom"

export default function Layout() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Login Page</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard Page</Link>
          </li>
        </ul>
  
        <Outlet />
      </div>
    );
  }