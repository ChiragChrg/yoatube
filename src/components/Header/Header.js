import "./Header.css"
import "./HeaderM.css"
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi"
import { BsYoutube } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { FaTimes, FaGithub } from "react-icons/fa"
import { Devbase } from "../../assets";

const Header = () => {
    const [showProfile, setShowProfile] = useState(false);
    const SearchRef = useRef(null);
    const navigate = useNavigate();

    if (showProfile) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }

    const SearchQuery = (e) => {
        e.preventDefault();
        if (SearchRef.current.value !== "") {
            navigate(`/search=${SearchRef.current.value}`);
            SearchRef.current.value = "";
        }
    }

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

            <form onSubmit={SearchQuery} className="header-searchbar flex">
                <input type="text" placeholder="Search" ref={SearchRef} id="search" autoComplete="off" />
                <button type="submit" title="Search" >
                    <HiSearch className="search-icon" color="var(--text)" size={25} />
                </button>
            </form>

            <div className="header-profile flex" data-profile={showProfile}>
                <div className="profile-icon" onClick={() => setShowProfile(true)}>
                    <AiOutlineUser color="var(--text)" size={25} />
                </div>

                <div className="profile-expand" style={{ display: "none" }}>
                    <div className="profile-name flex col gap-05">
                        <FaTimes className="profile-close" onClick={() => setShowProfile(false)} color="var(--text)" size={20} />
                        <div className="profile-icon">
                            <AiOutlineUser color="var(--text)" size={50} />
                        </div>
                        <h3>ChiragChrg</h3>
                    </div>

                    <div className="profile-links flex col">
                        <a href="https://chiragchrg.netlify.app/">
                            <Devbase fill="var(--text)" size={30} />
                            <span>Portfolio</span>
                        </a>
                        <a href="https://github.com/ChiragChrg">
                            <FaGithub color="var(--text)" size={30} />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <div className="profile-footer">
                        <p>© Copyright 2022 ChiragChrg</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header