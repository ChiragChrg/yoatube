import "./Header.css"
import "./HeaderM.css"
import { HiSearch } from "react-icons/hi"
import { BsYoutube } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"

const Header = () => {
    return (
        <div className="header-main flex">
            <div className="header-nav flex gap-2">
                {/* <div className="header-ham flex" onClick={()=>setToggleNav(prevState => !prevState)}>
                <HiMenuAlt1 color="var(--text)" size={35}/>
            </div> */}

                <div className="header-logo flex gap-05">
                    <BsYoutube color="var(--logo)" size={40} />
                    <h1>Yoa<span style={{ color: "var(--logo)" }}>Tube</span></h1>
                </div>
            </div>

            <div className="header-searchbar flex">
                <input type="text" placeholder="Search" id="search" autoComplete="off" />
                <HiSearch className="search-icon" color="var(--text)" size={25} />
            </div>

            <div className="header-profile flex">
                <div className="profile-icon">
                    <AiOutlineUser color="var(--text)" size={25} />
                </div>
            </div>
        </div>
    )
}

export default Header