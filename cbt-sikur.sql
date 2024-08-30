-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 30 Agu 2024 pada 05.19
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
(1, 'Jikupon', 'Ganteng', '2024-06-05 09:38:23'),
(2, 'ujang', 'ujangganteng', '2024-06-18 14:19:55'),
(3, 'kambiang', '12345', '2024-06-18 14:20:46'),
(4, 'ujag', 'ujanggateng', '2024-06-19 08:32:57'),
(5, 'kuciang', 'lauak', '2024-07-02 16:39:46'),
(6, 'jimmy', 'kambiang', '2024-07-02 17:18:43'),
(7, '1', '1', '2024-07-03 09:37:35'),
(8, '2', '2', '2024-07-03 09:42:44'),
(9, '1', '1', '2024-07-03 09:42:58'),
(10, 'ujanh', '1', '2024-07-03 09:58:32'),
(11, '5', '5', '2024-07-03 09:59:54'),
(12, 'hallo boeng', 'lauak', '2024-07-03 18:55:10'),
(13, 'hallo ', 'lauak', '2024-07-03 18:57:21'),
(14, 'kurok', '1', '2024-07-03 18:58:39'),
(15, 'kurok1', '1', '2024-07-03 19:02:28'),
(16, 'hallo 1', 'lauak', '2024-07-03 19:04:55'),
(17, 'tes', 'tes', '2024-07-18 09:06:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `bank_soal`
--

CREATE TABLE `bank_soal` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mapel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `bank_soal`
--

INSERT INTO `bank_soal` (`id`, `name`, `mapel`) VALUES
(16, 'kuciang2', 'matematika'),
(17, 'sikur', 'Matematika'),
(18, 'oaok', 'matematika'),
(19, 'kampret', 'matematika'),
(20, 'okkk', 'matematika'),
(24, 'jsnjas', 'matematika'),
(25, 'tes', 'matematika'),
(26, 'ahsjhajsha', 'kuciang'),
(27, 'hhllnjb', 'tengok kiri kanan nilai mines'),
(28, 'Ujian pertama', 'Untuk di ujicoba pertama kali');

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

--
-- Dumping data untuk tabel `db_soal`
--

INSERT INTO `db_soal` (`id`, `banksoal`, `filesoal`, `soal`, `tes`, `opsi_a`, `opsi_b`, `opsi_c`, `opsi_d`, `opsi_e`, `file_a`, `file_b`, `file_c`, `file_d`, `file_e`, `jawaban`) VALUES
(1, 'sikur', 'Screenshot from 2024-08-01 09-23-15-1722501216406.png', 'kapan indonesia merdeka', '', 'nfksan;as<b>knsanlnsalkslaknslkna</b>', NULL, NULL, NULL, NULL, 'WhatsApp Image 2024-05-05 at 16.15.58_267d3613-1722501323356.jpg', 'Sikur-1722501405330.png', 'Screenshot from 2024-08-01 09-23-15-1722501485712.png', 'Sikur-1722501469884.png', 'Sikur-1722501459349.png', 'opsi_a'),
(7, NULL, NULL, 'babbsjbakbsjba&nbsp;', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'oaok2', NULL, 'asajnjanjnalnlsnlka', '', 'jnjnjnk', 'jknnlnl', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'a'),
(9, 'oaok', NULL, 'ok <b>nasoabsb </b><i>snoiabs</i>&nbsp;<u>ansinasoia</u>', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IMG_8625-1721617395933.JPG', NULL, NULL, 'a'),
(17, 'sikur', NULL, '<div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: &quot;Droid Sans Mono&quot;, &quot;monospace&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;\"><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">option</span> <span style=\"color: #9cdcfe;\">value</span><span style=\"color: #d4d4d4;\">=</span><span style=\"color: #ce9178;\">\"b\"</span><span style=\"color: #808080;\">&gt;</span>opsi b<span style=\"color: #808080;\">&lt;/</span><span style=\"color: #569cd6;\">option</span><span style=\"color: #808080;\">&gt;</span></div>', '', '<div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: &quot;Droid Sans Mono&quot;, &quot;monospace&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;\"><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">option</span> <span style=\"color: #9cdcfe;\">value</span><span style=\"color: #d4d4d4;\">=</span><span style=\"color: #ce9178;\">\"b\"</span><span style=\"color: #808080;\">&gt;</span>opsi b<span style=\"color: #808080;\">&lt;/</span><span style=\"color: #569cd6;\">option</span><span style=\"color: #808080;\">&gt;</span></div>', '<div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: &quot;Droid Sans Mono&quot;, &quot;monospace&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;\"><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">option</span> <span style=\"color: #9cdcfe;\">value</span><span style=\"color: #d4d4d4;\">=</span><span style=\"color: #ce9178;\">\"b\"</span><span style=\"color: #808080;\">&gt;</span>opsi b<span style=\"color: #808080;\">&lt;/</span><span style=\"color: #569cd6;\">option</span><span style=\"color: #808080;\">&gt;</span></div>', '<div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: &quot;Droid Sans Mono&quot;, &quot;monospace&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;\"><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">option</span> <span style=\"color: #9cdcfe;\">value</span><span style=\"color: #d4d4d4;\">=</span><span style=\"color: #ce9178;\">\"b\"</span><span style=\"color: #808080;\">&gt;</span>opsi b<span style=\"color: #808080;\">&lt;/</span><span style=\"color: #569cd6;\">option</span><span style=\"color: #808080;\">&gt;</span></div>', '<div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: &quot;Droid Sans Mono&quot;, &quot;monospace&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;\"><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">option</span> <span style=\"color: #9cdcfe;\">value</span><span style=\"color: #d4d4d4;\">=</span><span style=\"color: #ce9178;\">\"b\"</span><span style=\"color: #808080;\">&gt;</span>opsi b<span style=\"color: #808080;\">&lt;/</span><span style=\"color: #569cd6;\">option</span><span style=\"color: #808080;\">&gt;</span></div>', '<div style=\"color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: &quot;Droid Sans Mono&quot;, &quot;monospace&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;\"><span style=\"color: #808080;\">&lt;</span><span style=\"color: #569cd6;\">option</span> <span style=\"color: #9cdcfe;\">value</span><span style=\"color: #d4d4d4;\">=</span><span style=\"color: #ce9178;\">\"b\"</span><span style=\"color: #808080;\">&gt;</span>opsi b<span style=\"color: #808080;\">&lt;/</span><span style=\"color: #569cd6;\">option</span><span style=\"color: #808080;\">&gt;</span></div>', NULL, NULL, NULL, NULL, NULL, 'opsi_a'),
(19, 'sikur', 'IMG-1722501271116.JPG', '<div>Kami dari OSIM Divisi Lingkungan Hidup ingin mengumumkan untuk pengecekan kelas akan dimulai hari senin depan dengan ketentuan yang sama dengan sebelumnya</div><div>Mohon kerjasamanya untuk menjaga kebersihan kelas yaa</div>', '', '<div>Kami dari OSIM Divisi Lingkungan Hidup ingin mengumumkan untuk pengecekan kelas akan dimulai hari senin depan dengan ketentuan yang sama dengan sebelumnya</div><div>Mohon kerjasamanya untuk menjaga kebersihan kelas yaa</div>', '<div>Kami dari OSIM Divisi Lingkungan Hidup ingin mengumumkan untuk pengecekan kelas akan dimulai hari senin depan dengan ketentuan yang sama dengan sebelumnya</div><div>Mohon kerjasamanya untuk menjaga kebersihan kelas yaa</div>', '<div>Kami dari OSIM Divisi Lingkungan Hidup ingin mengumumkan untuk pengecekan kelas akan dimulai hari senin depan dengan ketentuan yang sama dengan sebelumnya</div><div>Mohon kerjasamanya untuk menjaga kebersihan kelas yaa</div>', '<div>Kami dari OSIM Divisi Lingkungan Hidup ingin mengumumkan untuk pengecekan kelas akan dimulai hari senin depan dengan ketentuan yang sama dengan sebelumnya</div><div>Mohon kerjasamanya untuk menjaga kebersihan kelas yaa</div>', '<div>Kami dari OSIM Divisi Lingkungan Hidup ingin mengumumkan untuk pengecekan kelas akan dimulai hari senin depan dengan ketentuan yang sama dengan sebelumnya</div><div>Mohon kerjasamanya untuk menjaga kebersihan kelas yaa</div>', 'IMG-1722501271116.JPG', 'IMG-1722501271116.JPG', 'IMG-1722501271116.JPG', 'IMG-1722501271116.JPG', 'IMG-1722501271116.JPG', 'opsi_a'),
(20, 'sikur', NULL, 'Siapa orang pertama kebulan', '', 'tak&nbsp; tau', '<b>ntahlah </b><i style=\"\"><b>aku pun </b>tak tau</i>', 'ok', 'ok', 'tak tau, tapi ini jawaban benar', NULL, NULL, NULL, NULL, NULL, 'opsi_e'),
(21, 'sikur', NULL, 'vmmadmadmdam,ad', '', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', NULL, NULL, NULL, NULL, NULL, 'opsi_b'),
(22, 'sikur', NULL, 'vmmadmadmdam,ad', '', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', 'vmmadmadmdam,ad', NULL, NULL, NULL, NULL, NULL, 'opsi_d'),
(23, 'sikur', NULL, 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', '', 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__185\"><div class=\"wDYxhc NFQFxe oHglmf xzPb7d\" data-md=\"32\" style=\"clear:none\" data-hveid=\"CD8QAA\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q4dMGKAB6BAg_EAA\"><div class=\"H8O85d kno-mrg-si kno-mrg kno-swp\" style=\"position:relative;overflow:visible\" id=\"media_result_group\" data-hveid=\"CD8QAQ\"><div class=\"iKjSFe aUc9Gd\"><div data-count=\"1\" data-hveid=\"CDMQAA\"><div class=\"xte2qe OXEsB o6uAG\"><div data-ivep=\"true\"><div class=\"RYdNQb\" data-h=\"130\" data-nr=\"1\" style=\"border-top-left-radius:8px;border-top-right-radius:8px\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0QyQ0oAHoECDMQAg\"><div class=\"eA0Zlc WghbWd FnEtTd ivg-i PZPZlf img-kc-m GMCzAd\" aria-hidden=\"true\" data-attrid=\"image\" data-docid=\"ZiQUxVe_gHakKM\" data-ivep=\"true\" data-lpage=\"https://news.detik.com/berita/d-6881125/isi-teks-proklamasi-kemerdekaan-yang-dibacakan-saat-upacara-17-agustus\" data-ni=\"1\" data-ref-docid=\"yiDOPze5CyE5hM\" data-hveid=\"CDIQAA\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qzkx6BAgyEAA\"><div><div class=\"XOEbc\" role=\"button\" tabindex=\"0\"><div><div data-bla=\"\" class=\"uhHOwf BYbUcd\" style=\"height:136px;width:204px\"><img style=\"margin-left:-6px;width:217px\" alt=\"Isi Teks Proklamasi Kemerdekaan yang Dibacakan saat Upacara ...\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIx4ynhznA1qldJqDmHbEh8KhPfcqQBka_IOyfVjEgmT7PR3gl2xHZrDfWQ&amp;s\" data-ilt=\"1721449224712\"></div></div></div><div class=\"BfmEZb Xn9Tkc oGwWse y0jvId lM9tvf\"></div></div></div></div></div></div></div></div></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', NULL, NULL, NULL, NULL, NULL, 'opsi_d'),
(24, 'sikur', 'Desain tanpa judul (1)-1721615612497.png', 'asnalnslknalnsa', '', 'flanlndlnaslknslanlkdnlanslksa', NULL, 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', 'Orang lain juga bertanya<span class=\"QWHgYe\"><div data-id=\"atritem-\" data-viewer-group=\"1\"><div><div data-viewer-entrypoint=\"1\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Q2esEegUIhAEQAg\"><div><div class=\"iTPLzd rNSxBe eY4mx lUn2nc\" style=\"position:absolute\" aria-label=\"Tentang hasil ini\" role=\"button\" tabindex=\"0\"><span class=\"D6lY4c mBswFe\"><span class=\"xTFaxe z1asCe\" style=\"height:18px;line-height:18px;width:18px\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"></svg></span></span></div></div></div></div></div></span><div class=\"ysxiae iRPzcb\"></div><div data-hveid=\"CE0QAQ\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Qj7gIegQITRAB\"><div class=\"dnXCYb\" aria-controls=\"_CDubZu-9K8Sb4-EPz5GE6AE_55\" aria-expanded=\"true\" role=\"button\" tabindex=\"0\"><div class=\"JlqpRe\"><span class=\"JCzEY tNxQIb\"><span class=\"CSkcDe\">Apa isi dari teks proklamasi Kemerdekaan Indonesia?</span></span></div><div class=\"p8Jhnd\"><div class=\"aj35ze\" style=\"transform: rotateZ(180deg);\"></div></div><div class=\"L3Ezfd\" data-ved=\"2ahUKEwjv4aaM4rSHAxXEzTgGHc8IAR0Quk56BAhNEAI\" style=\"visibility: hidden;\"><br></div></div></div><div id=\"CDubZu-9K8Sb4-EPz5GE6AE__198\"><div class=\"wDYxhc\" data-md=\"61\" style=\"clear:none\"><div class=\"LGOjhe\" data-attrid=\"wa:/description\" aria-level=\"3\" role=\"heading\" data-hveid=\"CEoQAA\"><span class=\"NA6bn UiGGAb ILfuVd\" lang=\"id\"><span class=\"hgKElc\">Berikut <b>isi</b> teks <b>proklamasi</b> yang diketik oleh Sayuti Melik. Kami bangsa <b>Indonesia</b> dengan ini menjatakan <b>Kemerdekaan Indonesia</b>.\n Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan \ndengan tjara saksama dan dalam tempo jang sesingkat-singkatnja. \nSoekarno/Hatta.</span></span><span class=\"kX21rb ZYHQ7e\">17 Agu 2023</span></div></div></div>', NULL, 'penting-1721616442741.png', NULL, NULL, NULL, NULL, 'opsi_a'),
(28, 'kuciang2', 'ok-1722936714536.png', 'kndkflknlkndasds', '', 'jnjnjnk', 'bbbkjj', 'hbhbk', 'jbkbbkj', 'bjbkjbkbk', NULL, NULL, NULL, NULL, NULL, 'a'),
(29, 'sikur', NULL, 'Kapan kamu bisa masak nasi', NULL, 'sudah dua hari lalu', 'sudah satu hari lalu', 'sudah beberapa hari lalu', 'ntahlah', 'e tapi boong', 'IMG_20221030_162140-1723819175196.jpg', 'Screenshot from 2024-08-16 10-57-12-1723819241100.png', 'Screenshot from 2024-08-16 10-54-31-1723819256620.png', NULL, NULL, 'opsi_a'),
(30, 'Ujian pertama', NULL, 'Kalau 2 ditambah 2 hasilnyo brapo?', NULL, '3', '5', '4', '6', '7', NULL, NULL, NULL, NULL, 'images-1724381850182.jpeg', 'opsi_c'),
(31, 'Ujian pertama', NULL, 'Di atas langik ado apo?', NULL, 'Awan', 'bulan', 'Matahari', 'Bintang', 'Tanggo ka langit', NULL, NULL, NULL, NULL, NULL, 'opsi_e'),
(32, 'Ujian pertama', NULL, 'Apo nan sabana nyo urang mambuek kueh jo rancak?', NULL, 'Tepung', 'Gulo', 'Susu', 'Telur', 'Niak bulek', NULL, NULL, NULL, NULL, NULL, 'opsi_e'),
(33, 'Ujian pertama', NULL, 'Babantuah di tangah palagan Padri, siapa panglimo nan basilek bagalut?', NULL, 'Imam Bonjol', 'Tuanku Tambusai', 'Tuanku Imam Batak', 'Tuanku Nan Renceh', 'Ayah Andaik', NULL, NULL, NULL, NULL, NULL, 'opsi_a'),
(34, 'Ujian pertama', NULL, 'Apo namo pulau nan taliek di Sumatera Barat?', NULL, 'Pulau Sikuai', '&nbsp;Pulau Pasumpahan', 'Pulau Sirandah', 'Pulau Angso Duo', 'Pulau Tarajuang', NULL, NULL, NULL, NULL, NULL, 'opsi_e'),
(35, 'Ujian pertama', 'IMG_20220928_145714-1724381744639.jpg', 'Sia Namo Urang Keren ko', NULL, 'Aksa&nbsp;', 'Ujang', 'Mak cabiak', 'Pak jangek', 'Si patai', NULL, NULL, NULL, NULL, NULL, 'opsi_a'),
(36, 'Ujian pertama', NULL, '<img src=\"https://lh5.googleusercontent.com/proxy/RFPfFBwxoxL9L9cyK8Us_6A5Brp4aL9YuqrFHFvWncormKH__Z1CC-8AhzCKhNUlFssuN19_zql92urNqD9UIdIFWP_9Em_jmBaVPOdWKg\" alt=\"Legendary 1CAK for fun Only\"><br><br>Dari mana gambar ini diambil', NULL, '1cak', 'Ang engak', 'Ang Pakak', 'Angpak', 'AMang', NULL, NULL, NULL, NULL, NULL, 'opsi_a');

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

--
-- Dumping data untuk tabel `jawaban_siswa`
--

INSERT INTO `jawaban_siswa` (`id`, `name`, `kelas`, `jawaban`, `id_soal`, `db_soal`, `nama_db`, `nilai`) VALUES
(1, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 17, '16', 'sikur', 1),
(2, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 1, '16', 'sikur', 1),
(3, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 19, '16', 'sikur', 1),
(4, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 20, '16', 'sikur', 0),
(5, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 21, '16', 'sikur', 0),
(6, 'Aksa prawira sukma', 'xi.c', 'opsi_b', 22, '16', 'sikur', 0),
(7, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 23, '17', 'sikur', 0),
(8, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 1, '15', NULL, 1),
(9, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 17, '15', NULL, 1),
(10, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 19, '15', NULL, 1),
(11, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 20, '15', NULL, 0),
(12, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 21, '15', NULL, 0),
(13, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 22, '15', NULL, 0),
(14, 'Aksa prawira sukma', 'xi.c', 'opsi_a', 23, '15', NULL, 0),
(15, 'Aksa prawira sukma', 'xi.c', 'opsi_d', 24, '15', 'null', 0),
(30, 'bubua kacang ijau', 'xi.c', 'opsi_a', 1, '16', 'sikur', 1),
(31, 'bubua kacang ijau', 'xi.c', 'opsi_a', 17, '16', 'sikur', 1),
(32, 'bubua kacang ijau', 'xi.c', 'opsi_a', 19, '16', 'sikur', 1),
(33, 'bubua kacang ijau', 'xi.c', 'opsi_a', 20, '16', 'sikur', 0),
(34, 'bubua kacang ijau', 'xi.c', 'opsi_a', 21, '16', 'sikur', 0),
(35, 'bubua kacang ijau', 'xi.c', 'opsi_a', 22, '16', 'sikur', 0),
(36, 'bubua kacang ijau', 'xi.c', 'opsi_a', 23, '16', 'sikur', 0),
(37, 'bubua kacang ijau', 'xi.c', 'opsi_a', 24, '16', 'sikur', 1),
(38, 'bubua kacang ijau', 'xi.c', 'opsi_a', 29, '16', 'sikur', 1),
(39, 'Ucok tenggen', '12.IPA.1', 'opsi_e', 30, '19', 'Ujian pertama', 0),
(40, 'Ucok tenggen', '12.IPA.1', 'opsi_d', 31, '19', 'Ujian pertama', 0),
(41, 'Ucok tenggen', '12.IPA.1', 'opsi_a', 32, '19', 'Ujian pertama', 0),
(42, 'Ucok tenggen', '12.IPA.1', 'opsi_a', 33, '19', 'Ujian pertama', 0),
(43, 'Ucok tenggen', '12.IPA.1', 'opsi_e', 34, '19', 'Ujian pertama', 1),
(44, 'Ucok tenggen', '12.IPA.1', 'opsi_a', 35, '19', 'Ujian pertama', 1),
(45, 'Ucok tenggen', '12.IPA.1', 'opsi_a', 36, '19', 'Ujian pertama', 1),
(46, 'Bano Santiang', '12.IPA.1', 'opsi_c', 30, '19', 'Ujian pertama', 1),
(47, 'Bano Santiang', '12.IPA.1', 'opsi_e', 31, '19', 'Ujian pertama', 1),
(48, 'Bano Santiang', '12.IPA.1', 'opsi_e', 32, '19', 'Ujian pertama', 1),
(49, 'Bano Santiang', '12.IPA.1', 'opsi_a', 33, '19', 'Ujian pertama', 1),
(50, 'Bano Santiang', '12.IPA.1', 'opsi_e', 34, '19', 'Ujian pertama', 1),
(51, 'Bano Santiang', '12.IPA.1', 'opsi_a', 35, '19', 'Ujian pertama', 1),
(52, 'Bano Santiang', '12.IPA.1', 'opsi_a', 36, '19', 'Ujian pertama', 1),
(53, 'Aksa prawira sukma', 'xi.c', 'opsi_d', 23, '16', 'sikur', 1),
(54, 'Aksa prawira sukma', 'xi.c', 'opsi_c', 24, '16', 'sikur', 0),
(55, 'Aksa prawira sukma', 'xi.c', 'opsi_b', 29, '16', 'sikur', 0);

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

--
-- Dumping data untuk tabel `kalkulasi_nilai`
--

INSERT INTO `kalkulasi_nilai` (`id`, `name`, `kelas`, `db_soal`, `nilai`) VALUES
(51, 'Aksa prawira sukma', 'xi.c', '16', 50),
(52, 'Ucok tenggen', '12.IPA.1', '19', 43);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` int(15) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `nama`, `reg_date`) VALUES
(1, '10.4', '2024-08-23 03:38:39'),
(2, '10.2', '2024-07-04 07:04:41'),
(3, '10.3', '2024-07-31 01:42:44'),
(5, '10.4', '2024-07-31 01:43:13'),
(7, 'kuciang', '2024-07-31 01:42:26'),
(9, 'ajbjbdjea', '2024-08-09 03:21:06'),
(10, 'xi.c', '2024-08-09 13:59:26'),
(11, '12.IPA.1', '2024-08-23 03:24:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mapel`
--

CREATE TABLE `mapel` (
  `id` int(15) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mapel`
--

INSERT INTO `mapel` (`id`, `nama`, `reg_date`) VALUES
(1, 'Informatika', '2024-07-04 05:23:47'),
(2, 'Matematika', '2024-07-04 05:23:58'),
(5, 'Ilmu kitab kuning', '2024-07-04 19:54:55'),
(6, 'kuciang2', '2024-08-22 14:06:04'),
(19, 'Uji coba pertama yang serius', '2024-08-23 02:57:58');

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

--
-- Dumping data untuk tabel `pengumuman`
--

INSERT INTO `pengumuman` (`id`, `isi`, `reg_date`) VALUES
(9, 'Tengok kiri kanan nilai mines', '2024-08-16 14:33:22'),
(10, 'Halo Asu', '2024-08-17 14:09:19');

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

--
-- Dumping data untuk tabel `sesi_cbt`
--

INSERT INTO `sesi_cbt` (`id`, `name`, `bank_soal`, `status`, `durasi`, `jadwal`, `jadwal_berakhir`, `kelas`, `db`, `tampilkanJawaban`, `acakSoal`, `waktu_mulai`) VALUES
(8, 'bismillah', 'sikur', 1, 90, '2024-08-01 17:30:00', '2024-08-31 21:21:00', '10.4', NULL, NULL, NULL, NULL),
(13, 'baru', 'Matematika', 1, 90, '2024-08-04 00:00:00', '2024-08-02 20:33:00', 'xi.c', NULL, NULL, NULL, NULL),
(14, 'tessss', 'tengok kiri kanan nilai mines', 1, 90, '2024-08-26 00:00:00', '2024-08-21 00:00:00', '10.4', NULL, NULL, NULL, NULL),
(15, 'ujian pertama', 'Ilmu kitab kuning', 1, 40, '2024-08-20 00:00:00', '2024-08-28 00:00:00', 'xi.c', NULL, NULL, NULL, NULL),
(16, 'testing', 'Ilmu kitab kuning', 1, 90, '2024-07-25 00:00:00', '2024-08-31 00:00:00', 'xi.c', 'sikur', NULL, NULL, NULL),
(17, 'oooo', 'kuciang', 1, 50, '2024-08-31 16:58:00', '2024-08-26 00:00:00', 'xi.c', 'sikur', NULL, NULL, NULL),
(18, 'oooooajojdoa', 'kuciang', 1, 40, '2024-08-21 18:53:00', '2024-08-30 00:00:00', '10.4', 'sikur', NULL, NULL, NULL),
(19, 'SESI PERTAM', 'Uji coba pertama yang serius', 1, 90, '2024-08-22 10:00:00', '2024-08-31 05:28:00', '12.IPA.1', 'Ujian pertama', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2l7WVZu6TA5FMlOTJ7koZvXbjDsb9q4o', 1725030198, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:18.422Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('4NH17Rekk-bY09NFY8IHUzvtA6I5GmKj', 1725030294, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:04:53.927Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('5JJBUVB-BBOv7Mn2Q3GAJvCNZwYdt2_r', 1725030581, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:09:40.889Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('6DY4hNFGVWPW2bhyH_86T_BK3dglciEe', 1725030211, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:30.902Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('70yH1WYM8quY8NTvq202QvYeL4afyaRB', 1725030614, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:14.061Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('8R2LYqUqxMt4-4IHR5xpt9K4xE9VQk_P', 1725030608, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:08.286Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('9OY_yGfB9sU-xBSuBCXc78k4NThVDhC8', 1725030581, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:09:40.871Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('9QyBtU3shCVZiUBZOuB0jaAUnJphNkz1', 1725030620, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:19.814Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('9hrXMuBzl8EfT-uhYa48PQfrm3wWiDHw', 1725030211, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:30.921Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('9lzHihME-48CrQM13uKdbqxeoGBmsXY6', 1725030586, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:09:46.340Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('9s5wM6d-Svld7985KgfROMXeYCVeTKQa', 1725030205, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:25.082Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('A8Wj6s2su9yyoYF7_-2GdnSCZV21ncvt', 1725030605, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:05.240Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('Bn-v8bfQ60MFhggRzXwzsngR_pAdS5i6', 1725030229, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:49.300Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('CoaeZyw7juPd9NJ1pR3LoFn4BuuXQkCT', 1725030707, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:11:31.138Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"name\":\"Ucok tenggen\",\"pass\":\"Ucok\",\"kelas\":\"12.IPA.1\"}}'),
('DCaz0DucCXyh7BiKgolcfJ0LhB9tpOGa', 1725030383, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:06:22.663Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('EFhvVVs8nZ9bVZzK-VK2dFQz_cVcI9XM', 1725030612, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:11.572Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('FbvfKw2-8yTongvzvldFOcfhhIFEtvJq', 1725030390, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:06:30.109Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('FtUtgWiVUetltT9R8KgsAr_2Hl0y3sMw', 1725030412, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:06:51.977Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('FtZ2wnyQJg9yVnPMl3fatbMqCm31EQSp', 1725030352, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:05:52.161Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('HjEjkOVh1pFIE7izs7rH3iAqnmek1r-N', 1725030610, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:10.379Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('I1JD_OLN95JbJNLCduHm2vBE7Ofy3KXj', 1725030618, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:17.934Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('IXdkDDIoHtSdW4MUtttRJSbFdT5gh9VO', 1725030606, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:06.331Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('J7KpiRYaTVjacohepxqzALufLnY6RrC9', 1725030619, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:18.928Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('KRZeagmzvxPznvmsN6bN9JS_47FVdbwG', 1725030615, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:15.056Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('KeJ6bRn_3U8vf5x3BByg_4BVfaHs8h7b', 1725030198, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:18.451Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('Lck98ggUjwA8pTXmtMgx6zRHb7LsQDsv', 1725030620, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:19.796Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('MjOP0yU2uucwHnQIDVYm6sfM7fYibqeA', 1725030693, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:11:32.733Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('OwlH34wKa832IT_Inwh8PgCTIW9OTiEQ', 1725030318, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:05:17.767Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('PyjsRFnVqSo6UrqU6ETt10mCTAFSKO-8', 1725030618, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:17.954Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('RWBDAQ8Y5aT52uBxw0XQa7YgTvAz5h18', 1725030294, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:04:53.916Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('S6lMuKQeq9SyqyJRbeJjwyT9HvbqyANT', 1725030607, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:07.314Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('SKoQV-xfRhIkbkRFx_FJSRP63pRW5YgH', 1725030619, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:18.877Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('TGhSKkXGYsY6eyTcvkYe5TgMc4J7FQWc', 1725030606, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:06.293Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('U5S3Bp7I6Ble8uzUEYyM74VMBqDZzXJR', 1725030640, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:39.657Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('VGBz8S8JEIcdfYeD2OFdajEwitCEAlgt', 1725030352, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:05:52.136Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('VV8QvFZDnvwEAQn44t6NVK0NIZYNjBNW', 1725030613, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:13.337Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('Vw2gv5fi7dOyOYALCa0Q-2DMk_UfXjDa', 1725030615, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:15.093Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('W0BVaLmBPTlD2P9eFiiWqBfvbJPcQDli', 1725030640, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:39.621Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('WEo7pgwT4qIgoOU-85VCL1fmegKrvOJH', 1725030687, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:11:27.132Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('WFfGitdoOosnyC_3ddhN8pR1JU31w2l3', 1725030255, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:04:15.281Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('WjD0vH2iT294mb78A-i1xiyCBVFixMgZ', 1725030383, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:06:22.650Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('ZYqugp9VkE4ZDeykjXqy2OFWzPjQoSOk', 1725030617, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:17.140Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('Zz4960yAAYJNSDTaeKEwSXBHGPoFGcKl', 1725030586, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:09:46.359Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('aLYEbWLcSEOCP0pvR3KItfrTWsXrefFm', 1725030617, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:17.121Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('arRTbChxnqCcL2G_jzmymlTdNiChIZGc', 1725030627, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:26.702Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('b6F9qWQI5Tqk_FYDTqHWYPCueyvFx_q3', 1725030255, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:04:15.253Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('bS6QgcqWhmtAeeXjwjZaaqYfhs5oXNn-', 1725030627, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:26.686Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('bW6TwLSvEq8-1Xjfdi2LndMHJYwL6Yy7', 1725030616, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:16.393Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('cSTZAsWDlLP3L_WFtoasCLV1QsPC7jWa', 1725030693, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:11:32.769Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('fOoVMcvfffg_4URDYMtmsePX9DHk9ttq', 1725030412, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:06:51.951Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('fhMZPTOh0XfhFx7qOT7YZI6Wi1qSpga0', 1725030616, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:16.426Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('gL0KXKvAwIp67MCj6Jw9cgcFmocM51yk', 1725030609, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:09.418Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('hM3IWlF9p7TMAAb0n0Zo57AeZcdVAAA9', 1725030612, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:11.552Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('hcdJmJVZsyjp4llVFeTD_woDuLofXLEH', 1725030613, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:13.376Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('hpeCtpM0KybK66A2A12RFc6uFvhXsKHo', 1725030687, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:11:27.155Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('iFaODK8uBzm5_WZzuPX9As2m8UTR4CMa', 1725030333, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:05:33.326Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('jFsbIrrC-GpGOF9BZZ-HQBFb5cKc7TfQ', 1725030558, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:09:18.223Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('jrWm776vk8jy2OFl_W9zA1ay3sNbydLD', 1725030205, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:25.060Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('kXfUdw-p6hdNPy7dX3mZqssA0mjKj0Ww', 1725030614, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:14.077Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('mbwS9CazeI7YuDwFSgXj8HNj3iMqekV3', 1725030612, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:12.388Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('miYSWjWHuTp_hpKapDpmYbnA8YP4hcih', 1725030318, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:05:17.742Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('o1X85XyFhfmNPFRRLGRRmJ2oO2YGC8Aq', 1725030609, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:09.389Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('oL8wXbxIVCpBE7pl7Q26u4iyb74PhoyE', 1725030605, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:05.222Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('pV2cJpVqEMDEzdo9cdD2xy6u7Ikjc4o5', 1725030390, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:06:30.132Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('q8n5F5GWDHDv3rynWTLYlyiUbLO0S0OZ', 1725030610, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:10.405Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('qYydq_HmNOldifA-gcFa5wwU16JTDKh3', 1725030198, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:18.477Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('rBKgewnvje3YIJiaF-aBOpZt61nRmHme', 1725030223, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:42.514Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('rtAXhtrvGf_voiaa2XMXcBG4C_rN6T_x', 1725030333, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:05:33.345Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('t5xYVh5SR47Aor9jiMRVDzpc17f5MjiJ', 1725030198, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:18.455Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('toTXz5IEIxH6wcfxMfcw2G4vjqkyP8_X', 1725030607, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:07.292Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('uazDjZWf5_i3wTOTr3QWJPdJV8hzR8zs', 1725030229, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:49.337Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('w9FuyPN3gl9qdCuOdIwBrrvSUV9mBSbV', 1725030608, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:08.257Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('xfJreJWLEfvqkG_haaUiTLWqE-Gzvxbm', 1725030635, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:34.690Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('yf9teDheb3bN5NURJODqIIjCetviEDTI', 1725030198, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:18.446Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('zmjYKN-hVejzLoUr5MW753kDsR9IXoOW', 1725030612, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:10:12.335Z\",\"httpOnly\":true,\"path\":\"/\"}}'),
('zt9P2obaTzU5DA2F8Z2PVKC647pmGrCy', 1725030222, '{\"cookie\":{\"originalMaxAge\":43200000,\"expires\":\"2024-08-30T15:03:42.494Z\",\"httpOnly\":true,\"path\":\"/\"}}');

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

--
-- Dumping data untuk tabel `siswa`
--

INSERT INTO `siswa` (`id`, `nisn`, `name`, `kelas`, `jenisKelamin`, `password`, `reg_date`) VALUES
(1, 8, 'ujang', 'xi.c', 'laki-laki', '1', '2024-08-23 03:43:14'),
(5, 20202, 'Ujang kambang', '12', 'laki-laki', '00001', '2024-07-31 01:51:44'),
(6, 76618, 'idoy', '10', 'Laki-laki', '00101', '2024-07-31 01:54:59'),
(7, 1010011, 'kuciang', '10', 'Laki-laki', '0000', '2024-08-05 04:12:06'),
(8, 20201, 'bubua kacang ijau', 'xi.c', 'Laki-laki', '00000', '2024-08-15 04:13:40'),
(9, 8909709, 'sknkand', 'xi.c', 'Laki-laki', 'true', '2024-08-23 03:45:46'),
(10, 999999, 'jbjb', '10.4', 'Laki-laki', 'ok', '2024-08-09 03:33:05'),
(11, 1010011, 'Aksa prawira sukma', 'xi.c', 'Laki-laki', '1', '2024-08-09 14:00:12'),
(12, 1010011, 'Bano Santiang', '12.IPA.1', 'Laki-laki', 'Bano', '2024-08-23 03:24:55'),
(13, 20201, 'Ucok tenggen', '12.IPA.1', 'Laki-laki', 'Ucok', '2024-08-23 03:25:08');

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

--
-- Dumping data untuk tabel `status_ujian_siswa`
--

INSERT INTO `status_ujian_siswa` (`id`, `name`, `kelas`, `db_soal`, `status`) VALUES
(5, 'Aksa prawira sukma', 'xi.c', '17', 1),
(6, 'bubua kacang ijau', 'xi.c', '15', 1),
(26, 'Aksa prawira sukma', 'xi.c', '16', 1),
(29, 'Ucok tenggen', '12.IPA.1', '19', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tes_nomor`
--

CREATE TABLE `tes_nomor` (
  `id` int(11) NOT NULL,
  `id_soal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tes_nomor`
--

INSERT INTO `tes_nomor` (`id`, `id_soal`) VALUES
(1, 12);

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

--
-- Dumping data untuk tabel `ujian`
--

INSERT INTO `ujian` (`id`, `mapel`, `banksoal`, `kelas`, `deskripsi`, `acakSoal`, `acakJawaban`, `nilai`, `durasi`, `reg_date`) VALUES
(6, 'Informatika', 'kuciang2', '10.4', 'tengok kiri kanan nilai mines', 0, 0, 1, 40, '2024-08-08 07:45:28'),
(7, 'Matematika', 'kuciang2', 'xi.c', 'tengok kiri kanan nilai mines', 0, 0, 1, 90, '2024-08-09 14:01:37'),
(8, 'Ilmu kitab kuning', 'sikur', 'xi.c', 'tengok kiri kanan nilai mines', 1, 1, 1, 90, '2024-08-09 14:47:48'),
(10, 'kuciang', 'sikur', 'xi.c', 'uuuiu', 1, 1, 1, 70, '2024-08-21 02:09:05'),
(11, 'Uji coba pertama yang serius', 'Ujian pertama', '12.IPA.1', 'Ini pertama yang serius', 1, 1, 1, 60, '2024-08-23 03:25:34');

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
-- Dumping data untuk tabel `waktu_ujian`
--

INSERT INTO `waktu_ujian` (`id`, `name`, `kelas`, `waktu_mulai`, `waktu_sekarang`, `durasi`, `id_soal`) VALUES
(3, 'bubua kacang ijau', 'xi.c', '2024-08-22 16:37:36.987', '2024-08-22 16:37:38.331', 90, 13),
(4, 'bubua kacang ijau', 'xi.c', '2024-08-22 16:37:46.601', '2024-08-22 16:37:48.086', 40, 15),
(7, 'Bano Santiang', '12 IPA 1', '2024-08-23 10:01:05.697', '2024-08-23 10:18:36.151', 90, 19),
(8, 'bubua kacang ijau', 'xi.c', '2024-08-23 10:23:20.404', '2024-08-23 10:23:21.700', 90, 16),
(10, 'Bano Santiang', '12.IPA.1', '2024-08-23 10:52:09.608', '2024-08-23 10:53:32.064', 90, 19),
(15, 'Aksa prawira sukma', 'xi.c', '2024-08-30 10:05:17.752', '2024-08-30 10:05:19.097', 90, 16),
(16, 'Ucok tenggen', '12.IPA.1', '2024-08-30 10:11:32.762', '2024-08-30 10:11:34.167', 90, 19);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `bank_soal`
--
ALTER TABLE `bank_soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `db_soal`
--
ALTER TABLE `db_soal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `forumKelas`
--
ALTER TABLE `forumKelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jawaban_siswa`
--
ALTER TABLE `jawaban_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT untuk tabel `kalkulasi_nilai`
--
ALTER TABLE `kalkulasi_nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `nilai_siswa`
--
ALTER TABLE `nilai_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `sesi_cbt`
--
ALTER TABLE `sesi_cbt`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `status_ujian_siswa`
--
ALTER TABLE `status_ujian_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `tes_nomor`
--
ALTER TABLE `tes_nomor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `ujian`
--
ALTER TABLE `ujian`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `waktu_ujian`
--
ALTER TABLE `waktu_ujian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
