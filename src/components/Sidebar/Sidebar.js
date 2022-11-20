import "./Sidebar.css"
import {HiHome} from "react-icons/hi"
import {SiYoutubemusic} from "react-icons/si"
import { Subscription, Library} from "../../assets/index"

const Sidebar = ({toggleNav}) => {
  return (
    <div className="sidebar-main flex col gap-1" data-expand={toggleNav} >
        <div className="sidebar-nav flex gap-1 active">
            <div className="nav-icon">
                <HiHome color="var(--text)" size={30}/>
            </div>
            <span>Home</span>
        </div>
        
        <div className="sidebar-nav flex gap-1">
            <div className="nav-icon">
                <SiYoutubemusic color="var(--text)" size={30}/>
            </div>
            <span>Music</span>
        </div>
        
        <div className="sidebar-nav flex gap-1">
            <div className="nav-icon">
                <Subscription fill="var(--text)" size={30}/>
            </div>
            <span>Subscription</span>
        </div>
        
        <div className="sidebar-nav flex gap-1">
            <div className="nav-icon">
                <Library fill="var(--text)" size={30}/>
            </div>
            <span>Library</span>
        </div>
    </div>
  )
}

export default Sidebar