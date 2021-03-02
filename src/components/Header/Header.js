import "./Header.scss";

import logo from "../../assets/logo.svg";

const Header = () => {
    return (
        <>
            <header className="header-header">
                <img className="header-image" alt="Logo" src={logo}></img>
            </header>
            <div className="header-separator">.</div>
        </>
    );
};

export default Header;
