import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/cat_and_dog.png";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import SearchForm from "../pages/SearchForm";

const Header = () => {
  const { currentUser } = useContext(UserContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (criteria) => {
    const queryString = new URLSearchParams(criteria).toString();
    setSearchOpen(false); // Arama yaptıktan sonra arama formunu kapat
    navigate(`/search?${queryString}`);
  };

  return (
    <>
      <nav>
        <div className="container nav__container">
          <Link to="/" className="nav__logo">
            <img src={Logo} alt="" />
          </Link>
          <FaSearch onClick={toggleSearch} className="nav__search-icon" />
          {currentUser?.id && (
            <ul className="nav_menu">
              <div className="nav_menu_left">
                <li className="an-type">
                  <Link to={"/posts/types/Cat"}>Cat</Link>
                </li>
                <li className="an-type">
                  <Link to={"/posts/types/Dog"}>Dog</Link>
                </li>
                <li className="an-type">
                  <Link to={"/posts/types/Bird"}>Bird</Link>
                </li>
              </div>
              <div className="nav_menu_right">
                <li>
                  <Link to={`/profile/${currentUser.id}`}>
                    {currentUser?.name}
                  </Link>
                </li>
                <li>
                  <Link to="/create">Create Post</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </div>
            </ul>
          )}
          {!currentUser?.id && (
            <ul className="nav_menu">
              <div className="nav_menu_left">
                <li className="an-type">
                  <Link to={"/posts/types/Cat"}>Cat</Link>
                </li>
                <li className="an-type">
                  <Link to={"/posts/types/Dog"}>Dog</Link>
                </li>
                <li className="an-type">
                  <Link to={"/posts/types/Bird"}>Bird</Link>
                </li>
              </div>
              <div className="nav_menu_right">
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              </div>
            </ul>
          )}
          <button className="nav__toggle-btn">
            <AiOutlineClose />
          </button>
        </div>
      </nav>
      {searchOpen && <SearchForm onSearch={handleSearch} />}
    </>
  );
};

export default Header;
