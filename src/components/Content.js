import { Outlet } from "react-router-dom";
// import Dashboard from './Dashboard/Dashboard'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

const Content = () => {
    return (
        <div className="Content-main">
            <Header />
            <Sidebar />
            <div className="Outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default Content