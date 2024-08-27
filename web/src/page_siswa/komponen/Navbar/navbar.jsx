import React, { useState, useEffect} from 'react';
import Styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "./sikur.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
    const handlelogout = async (e) =>{
        e.preventDefault();
        try {
          await axios.post(`${import.meta.env.VITE_SERVER}/logout`)
          localStorage.removeItem('userToken');
          navigate('/');
          
        } catch (error) {
          console.log("error");
        }
      }

      const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/get`, {
          withCredentials: true
        });
        if (response.data.stat) {
          setUser(response.data.data);
        } else {
          console.log(response.data.text);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <nav className={Styles.navbar}>
      <a className={Styles.logo} onClick={()=>navigate("/")}><img src={logo} alt="" />Sikur-CBT </a>
      <div className={Styles.menuIcon} onClick={toggleMenu}>
        <span className={Styles.bar}></span>
        <span className={Styles.bar}></span>
        <span className={Styles.bar}></span>
      </div>
      <ul className={`${Styles.navLinks} ${isOpen ? Styles.open : ''}`}>
        <h5 className={Styles.user}>{user ? (
            <div>
              <h3>{user.name}</h3>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}</h5>
        <li><a className={Styles.logoutButton} onClick={handlelogout}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

