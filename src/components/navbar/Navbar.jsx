import "./navbar.css";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { PiStorefrontLight } from "react-icons/pi";
import { TiMessage } from "react-icons/ti";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useRef, useContext, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";
// import { UserContext } from '../../context/UserContext';
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar() {
  // const { user, handleLogout } = useContext(UserContext);
  const { user, handleLogout } = useState(true);
  const navigate = useNavigate();
  const navbar = useRef();

  function toggleMenu() {
    navbar.current.classList.toggle("open");
  }

  function closeToggleMenu() {
    navbar.current.classList.remove("open");
  }

  return (
    <header>
      <nav ref={navbar}>
        <div className="container-nav-desktop">
          <div className="logo">
            <IoIosMenu onClick={() => toggleMenu()} className="menu-icon" />
            <span className="logo-name" onClick={() => navigate(`/`)}>
              Instituto Superior del Sudeste
            </span>
          </div>
          <div className="nav-desktop">
            <ul>
              <li>
                <Link to={"/inicio"}>Inicio</Link>{" "}
              </li>
              <li>
                <Link to={"/carreras"}>Carreras</Link>{" "}
              </li>
              <li>
                <Link to={"/certificado-alumno-regular"}>Certificados regular</Link>{" "}
              </li>
              <li>
                <Link to={"/certificados-examen"}>Certificados examen</Link>{" "}
              </li>
            </ul>
          </div>
          <div className="icon-nav">
            {/* <Link
              to={"/"}
              className="nav-link"
              onClick={() => {
                handleLogout(false), closeToggleMenu();
              }}
            >
              <MdOutlineLogout className="icon" />
              <span className="link">Cerrar sesión</span>
            </Link> */}
          </div>
        </div>

        <div className="sidebar">
          <div className="logo">
            <IoIosMenu onClick={() => toggleMenu()} className="menu-icon" />
            <span className="logo-name">Instituto Sudeste</span>
          </div>
          <div className="sidebar-content">
            <ul className="lists">
              <li className="list">
                <Link
                  to={"/"}
                  className="nav-link"
                  onClick={() => closeToggleMenu()}
                >
                  <GoHome className="icon" />
                  <span className="link">Inicio</span>
                </Link>
              </li>
              <li className="list">
                <Link
                  to={"/store"}
                  className="nav-link"
                  onClick={() => closeToggleMenu()}
                >
                  <PiStorefrontLight className="icon" />
                  <span className="link">Inicio</span>
                </Link>
              </li>
              {user ? (
                <li className="list">
                  <Link
                    to={"/favorites"}
                    className="nav-link"
                    onClick={() => closeToggleMenu()}
                  >
                    <IoMdHeartEmpty className="icon" />
                    <span className="link">Inicio</span>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="list">
                <Link
                  to={"/Contact"}
                  className="nav-link"
                  onClick={() => closeToggleMenu()}
                >
                  <TiMessage className="icon" />
                  <span className="link">Inicio</span>
                </Link>
              </li>
              <li className="list">
                <Link
                  to={"/team"}
                  className="nav-link"
                  onClick={() => closeToggleMenu()}
                >
                  <HiOutlineUserGroup className="icon" />
                  <span className="link">Inicio</span>
                </Link>
              </li>
            </ul>

            <div className="bottom-content">
              {user ? (
                <li className="list">
                  <Link
                    to={"/configuration-user"}
                    className="nav-link"
                    onClick={() => closeToggleMenu()}
                  >
                    <CiSettings className="icon" />
                    <span className="link">Inicio</span>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {user ? (
                <li className="list">
                  <Link
                    to={"/"}
                    className="nav-link"
                    onClick={() => {
                      handleLogout(false), closeToggleMenu();
                    }}
                  >
                    <MdOutlineLogout className="icon" />
                    <span className="link">Cerrar sesión</span>
                  </Link>
                </li>
              ) : (
                <li className="list">
                  <Link
                    to={"/login"}
                    className="nav-link"
                    onClick={() => closeToggleMenu()}
                  >
                    <MdOutlineLogin className="icon" />
                    <span className="link">Iniciar sesión</span>
                  </Link>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section onClick={() => closeToggleMenu()} className="overlay"></section>
    </header>
  );
}

export default Navbar;
