import "./Header.scss";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = () => {
    const [showHeaderSeparator, setShowHeaderSeparator] = useState(false);

    let location = useLocation();

    useEffect(() => {
        if (!location.pathname.startsWith("/reviews/")) {
            setShowHeaderSeparator(true);
        }
    }, [location]);

    return (
        <>
            <header className="header-header">
                <Link to="/">
                    <img className="header-image" alt="Logo" src={logo}></img>
                </Link>
            </header>
            {showHeaderSeparator && <div className="header-separator"></div>}
        </>
    );
};

export default Header;
