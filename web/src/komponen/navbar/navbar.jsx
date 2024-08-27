import React ,{useState, useEffect} from 'react';
import Styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Satu from './1.png';
import Dua from './2.png';
import Tiga from './3.png';
import Empat from './4.png';
import Lima from './5.png';
import Enam from './6.png';
import Sikur from './sikur.png';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER}/logout`)
            localStorage.removeItem('adminToken');
            navigate('/admin-signin')
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <div className={Styles.sidenav}>
            <nav>
                <ul>
                    <li className={Styles.logo}><img src={Sikur} alt="Sikur cbt" className={Styles.sikur} /><span>Sikur CBT &nbsp;</span> <p className={Styles.warna}>{currentTime}</p></li>
                    <li><a onClick={()=>navigate("/admin-dashboard")} className={Styles.navLink}><img src={Satu} alt="Dashboard" /> Dashboard</a></li>
                    <li><a onClick={()=>navigate("/admin-profil")} className={Styles.navLink}><img src={Dua} alt="Profile" /> Profile</a></li>
                    <li><a onClick={()=>navigate("/mapel")} className={Styles.navLink}><img src={Tiga} alt="Mata Pelajaran" /> Mata Pelajaran</a></li>
                    <li><a onClick={()=>navigate("/kelas")} className={Styles.navLink}><img src={Tiga} alt="Kelas" /> Kelas</a></li>
                    <li><a onClick={()=>navigate("/siswa")} className={Styles.navLink}><img src={Dua} alt="Siswa" /> Siswa</a></li>
                    <li><a onClick={()=>navigate("/ujian" )}className={Styles.navLink}><img src={Empat} alt="Ujian" /> Ujian</a></li>
                    <li><a onClick={()=>navigate("/banksoal")} className={Styles.navLink}><img src={Empat} alt="Bank Soal" /> Bank Soal</a></li>
                    <li><a onClick={()=>navigate("/sesi")} className={Styles.navLink}><img src={Lima} alt="Sesi Ujian" /> Sesi Ujian</a></li>
                    <li><a onClick={()=>navigate("/nilai")} className={Styles.navLink}><img src={Enam} alt="Laporan Nilai" /> Laporan Nilai</a></li>
                </ul>
                <div>
                    <button className={Styles.button} onClick={handleLogout}>Logout</button>
                    
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
