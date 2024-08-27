import React, { useEffect, useState } from "react";
import Styles from "./Editor.module.css";
import Navbar from "../../komponen/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditProfile from "../../page_siswa/komponen/popup/editProfile";
import images from "./images.jpeg";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isi, setIsi] = useState("");
  const [pengumuman, setpengumuman] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);


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

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER}/logout`);
      localStorage.removeItem('adminToken');
      navigate('/admin-signin');
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handlePost = async (event) => {
    //event.preventDefault(); 
    try {
      await axios.post(`${import.meta.env.VITE_SERVER}/tambah_pengumuman`, { isi });
      //setIsi(""); 
      //navigate("/admin-dashboard")
    } catch (error) {
      console.log("Error posting announcement:", error);
    }
  };

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_pengumuman`)
        setpengumuman(response.data)

      } catch (error) {
        console.log(error)
      }
    }; fetchPengumuman();
  }, [])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data ini?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER}/delete_pengumuman/${id}`)//(`http://localhost:2000/siswa/${id}`);
        if (response.status === 200) {
          setpengumuman(pengumuman.filter(isi => isi.id !== id));
        } else {
          console.error('Error deleting data:', response.data.text);
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };
  const handleOpenEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleConfirm = () => {
    console.log("Profile update confirmed");
    setShowEditProfile(false);
  };

  const handleCancel = () => {
    console.log("Profile update canceled");
    setShowEditProfile(false);
  };


  return (
    <div>
      <Navbar />
      <div className={Styles.profileContainer}>
        <div className={Styles.profileHeader}>
          <img src={images} alt="Profile" className={Styles.profileImage} />
          <h1 className={Styles.profileName}>
            {user ? (
              <div>
                <h3>{user.name}</h3>
                <button onClick={handleOpenEditProfile} className={Styles.logoutakun}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </h1>
          <p className={Styles.profileBio}>Operator CBT</p>
          <div className={Styles.containerUtama}>
            <button className={Styles.logoutakun} onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className={Styles.profileDetails}>
          <h2>Tambahkan pengumuman di forum</h2>
          <form onSubmit={handlePost}>
            <input
              className={Styles.coolInput}
              type="text"
              id="isi"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Masukkan Pengumuman"
              required
            />
            <button className={Styles.logoutakun} type="submit">Tambahkan</button>
          </form>
        </div>
        <div className={Styles.Pengumuman}>
          {Array.isArray(pengumuman) && pengumuman.length > 0 ? (
            pengumuman.map((isi, index) => (
              <React.Fragment key={index}>
                <ul>
                  {/* <h4>Operator</h4><br /> */}
                  <p>{isi.isi}</p>                  <br />
                  <br />
                  <button
                    type="button"
                    className={Styles.logoutakun}
                    onClick={() => handleDelete(isi.id)}
                  >
                    Hapus
                  </button></ul><br />
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="2" className={Styles.emptyMessage}>Data kosong</td>
            </tr>
          )}
        </div>
        <EditProfile
          show={showEditProfile}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message="Update your profile information"
        />
      </div>
    </div>
  );
};

export default Profile;

