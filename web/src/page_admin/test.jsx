import React, { useEffect, useState } from "react";
import Styles from "./Editor.module.css";
import Navbar from "../komponen/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get")//(`${import.meta.env.VITE_SERVER}/get`);
        if (response.data.stat) {
          setUser(response.data.data.name);
          setLoading(false);
        } else {
          setError(response.data.text);
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER}/logout`);
      localStorage.removeItem('adminToken');
      navigate('/admin-signin');
    } catch (error) {
      setError("Failed to logout.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={Styles.containerUtama}>
        <section className="p-4">
          <h1>Welcome to the Profile</h1>
          {loading ? (
            <p>Loading user data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div>
              <p>Username: {admin}</p>
            </div>
          )}
        </section>
      </div>
      <div className={Styles.containerUtama}>
        <button className={Styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
