import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminSignIn from './page_admin/login';
import UserSignIn from './page_siswa/login';
import UserDashboard from './page_siswa/dashboard/dashboard';
import ProtectedRouteUser from './page_siswa/Protectedroute';
import './index.css';
import ProtectedRouteAdmin from './page_admin/Protectedroute';
import AdminDashboard from './page_admin/dashboard/dashboard';
import Admin_profil from './page_admin/profile/profile';
import Pagemapel from './page_admin/mapel/index';
import Pagetambahmapel from './page_admin/mapel/tambah'
import Pagekelas from './page_admin/kelas/index';
import Pagekelastambah from './page_admin/kelas/tambah';
import Pagesiswa from './page_admin/siswa/index';
import Pagesiswatambah from './page_admin/siswa/tambah';
import Pageujian from './page_admin/ujian/index';
import Pageujiantambah from './page_admin/ujian/tambah';
import Pagebanksoal from './page_admin/banksoal/index';
import Pagebanksoaltambah from './page_admin/banksoal/create';
import Pagebanksoaledit from './page_admin/banksoal/edit';
import Editsoalpertanyaan from './page_admin/editbanksoal/index';
import Editsoalopsi_a from './page_admin/editbanksoal/opsi_a';
import Editsoalopsi_b from './page_admin/editbanksoal/opsi_b';
import Editsoalopsi_c from './page_admin/editbanksoal/opsi_c';
import Editsoalopsi_d from './page_admin/editbanksoal/opsi_d';
import Editsoalopsi_e from './page_admin/editbanksoal/opsi_e';
import Editsoaljawaban from './page_admin/editbanksoal/jawaban';
import Editgambarsoal from './page_admin/editbanksoal/filesoal';
import Editgambaropsi_a from './page_admin/editbanksoal/file_a';
import Editgambaropsi_b from './page_admin/editbanksoal/file_b';
import Editgambaropsi_c from './page_admin/editbanksoal/file_c';
import Editgambaropsi_d from './page_admin/editbanksoal/file_d';
import Editgambaropsi_e from './page_admin/editbanksoal/file_e';
import NotFound from './komponen/notfound/home';
import Sesi from "./page_admin/sesi/index";
import Sesitambah from "./page_admin/sesi/tambah";
import NilaiSiswa from './page_admin/laporan_nilai';
import KelasSiswa from './page_admin/laporan_nilai/kelas';
import MapelSiswa from './page_admin/laporan_nilai/mapelsiswa';
import DataNilaiSiswa from './page_admin/laporan_nilai/dataNilaiSiswa';
import KelasStatus from './page_admin/kontrolStatus/kelas';
import Mapelstatus from './page_admin/kontrolStatus/mapelsiswa';
import DataNilaiStatus from './page_admin/kontrolStatus/dataNilaiSiswa';
import Tes from "./page_admin/test";
import Hello from './page_siswa/dashboard';
/////////////////////////////////
import Ujiansiswa from './page_siswa/sesiujian/ujian';
import Lobiujiansiswa from './page_siswa/sesiujian/mulai';
import Lamanverify from './page_siswa/sesiujian/verifikasi/verifikasi';
import Kalkulasi_nilai_siswa from './page_siswa/kalkulasiNilai/index';
import Hasiltessiswa from './page_siswa/nilai_siswa/verifikasi';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/test' element={<Tes />} />
        <Route path='/*' element={<NotFound />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/" element={<UserSignIn />} />
        <Route path="/index" element={<UserSignIn />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRouteAdmin>
              <AdminDashboard />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/admin-profil"
          element={
            <Admin_profil />
            // <ProtectedRouteAdmin>

            // </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/mapel"
          element={
            <ProtectedRouteAdmin>
              <Pagemapel />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/mapel/tambah"
          element={
            <ProtectedRouteAdmin>
              <Pagetambahmapel />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/kelas"
          element={
            <ProtectedRouteAdmin>
              <Pagekelas />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/kelas/tambah"
          element={
            <ProtectedRouteAdmin>
              <Pagekelastambah />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/siswa"
          element={
            <ProtectedRouteAdmin>
              <Pagesiswa />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/siswa/tambah"
          element={
            <ProtectedRouteAdmin>
              <Pagesiswatambah />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/ujian"
          element={
            <ProtectedRouteAdmin>
              <Pageujian />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/ujian/tambah"
          element={
            <ProtectedRouteAdmin>
              <Pageujiantambah />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/banksoal"
          element={
            <ProtectedRouteAdmin>
              <Pagebanksoal />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/banksoal/:id"
          element={
            <ProtectedRouteAdmin>
              <Pagebanksoaltambah />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/banksoal/:id/:id"
          element={
            <ProtectedRouteAdmin>
              <Pagebanksoaledit />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path='/editbanksoal/filesoal/:id'
          element={
            <ProtectedRouteAdmin>
              <Editgambarsoal />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/soal/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoalpertanyaan />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/opsi_a/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoalopsi_a />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/file_a/:id'
          element={
            <ProtectedRouteAdmin>
              <Editgambaropsi_a />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/opsi_b/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoalopsi_b />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/file_b/:id'
          element={
            <ProtectedRouteAdmin>
              <Editgambaropsi_b />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/opsi_c/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoalopsi_c />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/file_c/:id'
          element={
            <ProtectedRouteAdmin>
              <Editgambaropsi_c />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/opsi_d/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoalopsi_d />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/file_d/:id'
          element={
            <ProtectedRouteAdmin>
              <Editgambaropsi_d />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/opsi_e/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoalopsi_e />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/file_e/:id'
          element={
            <ProtectedRouteAdmin>
              <Editgambaropsi_e />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/editbanksoal/jawaban/:id'
          element={
            <ProtectedRouteAdmin>
              <Editsoaljawaban />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/sesi'
          element={
            <ProtectedRouteAdmin>
              <Sesi />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/sesi/tambah'
          element={
            <ProtectedRouteAdmin>
              <Sesitambah />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/nilai'
          element={
            <ProtectedRouteAdmin>
              <NilaiSiswa />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/nilai/:kelas'
          element={
            <ProtectedRouteAdmin>
              <KelasSiswa />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/nilai/:kelas/:nama'
          element={
            <ProtectedRouteAdmin>
              <MapelSiswa />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/nilai/:kelas/:nama/:sesi'
          element={
            <ProtectedRouteAdmin>
              <DataNilaiSiswa />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/status/ujian/:kelas'
          element={
            <ProtectedRouteAdmin>
              <KelasStatus />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/status/ujian/:kelas/:nama'
          element={
            <ProtectedRouteAdmin>
              <Mapelstatus />
            </ProtectedRouteAdmin>}
        />
        <Route
          path='/status/ujian/:kelas/:nama/:sesi'
          element={
            <ProtectedRouteAdmin>
              <DataNilaiStatus />
            </ProtectedRouteAdmin>}
        />
        {/* --------------------------------------User-Route---------------------------------------     */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRouteUser>
              <UserDashboard />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/ujiansiswa"
          element={
            <ProtectedRouteUser>
              <Ujiansiswa />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/tampektest/:id"
          element={
            <Hello />
            // <ProtectedRouteUser>
              
            // </ProtectedRouteUser>
          }
        />
        <Route
          path="/mainpage"
          element={
            <ProtectedRouteUser>
              <Lobiujiansiswa />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/ujian/:id"
          element={
            <ProtectedRouteUser>
              <Ujiansiswa />
            </ProtectedRouteUser>
          }
        />

        <Route
          path="/verifikasi/:id"
          element={
            <ProtectedRouteUser>
              <Lamanverify />
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/nilai_siswa"
          element={
            <ProtectedRouteUser>
              <Kalkulasi_nilai_siswa/>
            </ProtectedRouteUser>
          }
        />
        <Route
          path="/kalkulasi_nilai/:id"
          element={
            <ProtectedRouteUser>
              <Hasiltessiswa/>
            </ProtectedRouteUser>
          }
        />
        
      </Routes>
    </Router>
  );
};

export default App;
