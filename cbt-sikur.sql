-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 31 Agu 2024 pada 12.07
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cbt-sikur`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Admin`
--

CREATE TABLE `Admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sandi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Admin`
--

INSERT INTO `Admin` (`id`, `name`, `sandi`, `createdAt`) VALUES
(1, 'Admin', 'Admin', '2024-08-31 12:07:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bank_soal`
--

CREATE TABLE `bank_soal` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mapel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `db_soal`
--

CREATE TABLE `db_soal` (
  `id` int(11) NOT NULL,
  `banksoal` varchar(255) DEFAULT NULL,
  `filesoal` varchar(255) DEFAULT NULL,
  `soal` longtext NOT NULL,
  `tes` varchar(255) DEFAULT NULL,
  `opsi_a` longtext DEFAULT NULL,
  `opsi_b` longtext DEFAULT NULL,
  `opsi_c` longtext DEFAULT NULL,
  `opsi_d` longtext DEFAULT NULL,
  `opsi_e` longtext DEFAULT NULL,
  `file_a` varchar(255) DEFAULT NULL,
  `file_b` varchar(255) DEFAULT NULL,
  `file_c` varchar(255) DEFAULT NULL,
  `file_d` varchar(255) DEFAULT NULL,
  `file_e` varchar(255) DEFAULT NULL,
  `jawaban` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `forumKelas`
--

CREATE TABLE `forumKelas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isi` mediumtext NOT NULL,
  `reg_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jawaban_siswa`
--

CREATE TABLE `jawaban_siswa` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `jawaban` varchar(255) NOT NULL,
  `id_soal` int(11) NOT NULL,
  `db_soal` varchar(255) DEFAULT NULL,
  `nama_db` varchar(255) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kalkulasi_nilai`
--

CREATE TABLE `kalkulasi_nilai` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `db_soal` varchar(255) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(15) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `mapel`
--

CREATE TABLE `mapel` (
  `id` int(15) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `nilai_siswa`
--

CREATE TABLE `nilai_siswa` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `nilai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengumuman`
--

CREATE TABLE `pengumuman` (
  `id` int(11) NOT NULL,
  `isi` longtext NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sesi_cbt`
--

CREATE TABLE `sesi_cbt` (
  `id` int(15) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bank_soal` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `durasi` int(11) DEFAULT NULL,
  `jadwal` datetime DEFAULT NULL,
  `jadwal_berakhir` datetime DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `db` varchar(255) DEFAULT NULL,
  `tampilkanJawaban` tinyint(1) DEFAULT NULL,
  `acakSoal` tinyint(1) DEFAULT NULL,
  `waktu_mulai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa`
--

CREATE TABLE `siswa` (
  `id` int(11) NOT NULL,
  `nisn` int(11) NOT NULL,
  `name` varchar(125) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `jenisKelamin` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `status_ujian_siswa`
--

CREATE TABLE `status_ujian_siswa` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `kelas` varchar(255) NOT NULL,
  `db_soal` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tes_nomor`
--

CREATE TABLE `tes_nomor` (
  `id` int(11) NOT NULL,
  `id_soal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ujian`
--

CREATE TABLE `ujian` (
  `id` int(15) NOT NULL,
  `mapel` varchar(125) NOT NULL,
  `banksoal` varchar(125) NOT NULL,
  `kelas` varchar(125) NOT NULL,
  `deskripsi` text NOT NULL,
  `acakSoal` int(11) DEFAULT NULL,
  `acakJawaban` int(11) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `durasi` int(11) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `waktu_ujian`
--

CREATE TABLE `waktu_ujian` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `waktu_mulai` varchar(255) DEFAULT NULL,
  `waktu_sekarang` varchar(255) DEFAULT NULL,
  `durasi` int(11) DEFAULT NULL,
  `id_soal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `bank_soal`
--
ALTER TABLE `bank_soal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `db_soal`
--
ALTER TABLE `db_soal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `forumKelas`
--
ALTER TABLE `forumKelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jawaban_siswa`
--
ALTER TABLE `jawaban_siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kalkulasi_nilai`
--
ALTER TABLE `kalkulasi_nilai`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `nilai_siswa`
--
ALTER TABLE `nilai_siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sesi_cbt`
--
ALTER TABLE `sesi_cbt`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `status_ujian_siswa`
--
ALTER TABLE `status_ujian_siswa`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tes_nomor`
--
ALTER TABLE `tes_nomor`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `ujian`
--
ALTER TABLE `ujian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `waktu_ujian`
--
ALTER TABLE `waktu_ujian`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Admin`
--
ALTER TABLE `Admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `bank_soal`
--
ALTER TABLE `bank_soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `db_soal`
--
ALTER TABLE `db_soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `forumKelas`
--
ALTER TABLE `forumKelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jawaban_siswa`
--
ALTER TABLE `jawaban_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kalkulasi_nilai`
--
ALTER TABLE `kalkulasi_nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `nilai_siswa`
--
ALTER TABLE `nilai_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `sesi_cbt`
--
ALTER TABLE `sesi_cbt`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `status_ujian_siswa`
--
ALTER TABLE `status_ujian_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tes_nomor`
--
ALTER TABLE `tes_nomor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `ujian`
--
ALTER TABLE `ujian`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `waktu_ujian`
--
ALTER TABLE `waktu_ujian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
