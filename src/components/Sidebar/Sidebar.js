import "./Sidebar.css"
import "./SidebarM.css"
import { HiHome } from "react-icons/hi"
import { SiYoutubemusic } from "react-icons/si"
import { Subscription, Library } from "../../assets/index"
import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="sidebar-main flex col gap-1">
            <Link to={"/"} className="sidebar-nav flex gap-1 active" title="Home">
                <div className="nav-icon">
                    <HiHome color="var(--text)" size={30} />
                </div>
                <span>Home</span>
            </Link>

            <div className="sidebar-nav flex gap-1">
                <div className="nav-icon">
                    <SiYoutubemusic color="var(--text)" size={30} />
                </div>
                <span>Music</span>
            </div>

            <div className="sidebar-nav flex gap-1">
                <div className="nav-icon">
                    <Subscription fill="var(--text)" size={30} />
                </div>
                <span>Subscription</span>
            </div>

            <div className="sidebar-nav flex gap-1">
                <div className="nav-icon">
                    <Library fill="var(--text)" size={30} />
                </div>
                <span>Library</span>
            </div>
        </div>
    )
}

export default Sidebar