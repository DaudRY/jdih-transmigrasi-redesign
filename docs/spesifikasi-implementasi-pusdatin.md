# Spesifikasi Implementasi Portal JDIH Kementerian Transmigrasi

**Tanggal:** 19 Oktober 2026
**Peruntukan:** Biro Hukum dan Pusdatin
**Status:** Dokumen rancangan implementasi. UI dan data contoh tersedia; pengembangan backend resmi belum dilakukan.

## 1. Lingkup layanan

Portal menyediakan beranda, penelusuran terpadu, katalog berdasarkan 26 kategori, metadata per jenis dokumen, abstrak, status dan hubungan hukum, penampil dan unduhan PDF, dokumen pembentukan PUU, berita, informasi kelembagaan, galeri, FAQ, statistik dan survei.

Pengunjung menelusuri dalam satu domain tanpa pengalihan otomatis ke kategori portal lama. Pranala sumber JDIH resmi tetap tersedia untuk audit metadata dan asal PDF.

### Kondisi aktual

- 17 entri dokumen dapat ditelusuri: empat Peraturan Menteri 2026 serta 13 dokumen dari kategori berbeda.
- 14 PDF dipilih sebagai satu contoh per kategori yang memiliki sampel; file diperiksa dan disalin ke GitHub Pages dengan checksum SHA-256.
- 12 kategori belum mempunyai PDF contoh yang terverifikasi pada peninjauan ini; bukan berarti data resmi kategori tersebut kosong.
- Statistik pengunjung, publikasi berita/galeri dan formulir survei belum berasal dari backend resmi.

## 2. Skema metadata dan abstrak

Referensi: Lampiran I dan Lampiran II Permenkumham Nomor 8 Tahun 2019.

| Jenis dokumen | Atribut utama | Aturan |
| --- | --- | --- |
| Peraturan | jenis dan singkatan, nomor, tahun, T.E.U., tempat/tanggal penetapan dan pengundangan, sumber, subjek, status, bahasa, lokasi, bidang, lampiran | abstrak PUU mengikuti Lampiran I; relasi berdasarkan sumber resmi |
| Monografi | penulis/badan, nomor panggil, edisi, penerbit, tahun terbit, deskripsi fisik, ISBN, subjek, nomor induk | tidak menggunakan format abstrak peraturan |
| Artikel | judul, pengarang, tempat/tahun terbit, sumber publikasi, subjek, bidang dan lampiran | ringkasan mengikuti isi artikel dan sumber |
| Putusan pengadilan | nomor putusan, lembaga/peradilan, tanggal dibacakan, status putusan, jenis perkara, sumber, bahasa, lampiran | jangan menafsirkan label “Berlaku” sebagai putusan inkracht |
| Dokumen pembentukan PUU | jenis tahapan/dokumen, judul, tahun, penanggung jawab, sumber, PDF | rancangan bukan peraturan yang sudah berlaku |
| Keputusan, MoU, HAKI dan sejenisnya | dipetakan dengan Biro Hukum | tidak otomatis disamakan dengan peraturan atau putusan |

Nilai metadata yang belum diverifikasi disimpan sebagai nilai kosong, bukan perkiraan. Teks naskah resmi tetap dalam bahasa dokumen; bahasa Inggris saat ini berlaku hanya untuk navigasi dan antarmuka.

## 3. Kontrak API yang direkomendasikan

**Seluruh path di bawah adalah usulan pengembangan, bukan endpoint sistem resmi yang sudah tersedia.** Tentukan nama akhir bersama Pusdatin.

| Metode | Path usulan | Fungsi |
| --- | --- | --- |
| GET | /api/v1/categories | kategori dan jumlah koleksi |
| GET | /api/v1/documents | pencarian dan paginasi |
| GET | /api/v1/documents/{id} | metadata, status, abstrak dan hubungan |
| GET | /api/v1/documents/{id}/relations | riwayat perubahan, pencabutan, pelaksanaan yang disahkan |
| GET | /api/v1/documents/{id}/pdf | salinan berkas resmi dengan header dan tipe konten benar |
| GET | /api/v1/documents/{id}/abstract | abstrak sesuai jenis dokumen |
| GET | /api/v1/statistics/public | angka koleksi dan statistik tanpa data pribadi |
| GET | /api/v1/content | berita, halaman informasi, foto dan video yang telah dipublikasi |

Parameter daftar: q, number, group, category, year, status, sort, page, page_size. Gunakan whitelist dan validasi, paginasi server-side, penanda total data dan waktu pemutakhiran. Setiap ID dokumen harus stabil; file PDF memiliki versi serta checksum.

### CMS dan hak akses

Peran minimal: Pengelola Konten, Verifikator Hukum, Administrator Sistem dan Pembaca Publik. Alur kerja: draft, pemeriksaan metadata, persetujuan substantif, publikasi dan riwayat perubahan. Simpan audit trail atas identitas pelaksana, versi, tanggal, nilai sebelum/sesudah dan alasan perubahan.

Integrasi JDIHN wajib mendukung monitoring, log sukses/gagal, retry terbatas, dan pemulihan saat sumber tidak tersedia.

## 4. Standar UI/UX

- Desain satu keluarga komponen untuk beranda, katalog, penelusuran, detail, informasi dan laporan.
- Tema siang hijau-sage lembut dan mode malam, disimpan pada browser.
- Pilihan ID/EN untuk UI; naskah hukum tidak diterjemahkan tanpa versi resmi.
- Navigasi keyboard, breadcrumb, fokus terlihat, skip link, label formulir dan pesan hasil pencarian yang dapat dibaca pembaca layar.
- Penampil PDF dimuat saat pengguna meminta, dengan unduhan lokal jika tersedia dan rujukan sumber tetap terbuka.
- Responsif: 320, 375, 390, 768, 1024, 1440 piksel; sasaran tombol sentuh minimum 44 piksel dan tidak ada overflow horizontal.
- Format status kosong harus menjelaskan data yang tersedia tanpa mengarang jumlah koleksi resmi.

## 5. Sasaran pengujian dan keamanan

Berikut adalah target penerimaan, bukan klaim bahwa frontend sudah tersertifikasi.

| Bidang | Target |
| --- | --- |
| Browser | Chrome/Edge Windows, Safari macOS/iOS, Firefox dan Chrome Android |
| Otomasi | Smoke test Chromium, Firefox dan WebKit; perangkat iOS/Android nyata diuji manual sebelum peluncuran |
| Aksesibilitas | orientasi WCAG 2.2 AA, pemeriksaan keyboard, screen reader, kontras dan reduced motion |
| Kinerja | ukur LCP, INP dan CLS di lingkungan produksi; rancang sasaran LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1 |
| Keamanan | HTTPS/TLS, CSP, sanitasi keluaran, pengendalian unggahan PDF, scan malware, RBAC, rate limit dan audit log |
| Integritas konten | PDF cocok dengan sumber, SHA-256, status hukum disahkan dan metadata lengkap |
| Keandalan | fallback jelas saat API/file gagal dan tidak mengarang data publik |

## 6. Kriteria penerimaan

1. Semua kategori dan layanan terbuka dalam domain resmi, tanpa redirect otomatis ke portal lama.
2. Penelusuran kata kunci, nomor, tahun, kategori dan pengurutan berjalan pada koleksi aktual.
3. Metadata dan abstrak dibedakan menurut jenis dokumen berdasarkan Permenkumham 8/2019.
4. Relasi hukum, status dan kedudukan hukum hanya tampil setelah persetujuan/verifikasi.
5. File PDF valid, dapat dipratinjau/diunduh dan sumbernya dapat ditelusuri.
6. Navigasi mobile, pilihan bahasa/tema, fokus keyboard dan semua keadaan kosong diuji.
7. Berita, galeri, statistik kunjungan dan survei baru dinyatakan operasional setelah tersambung ke CMS/API resmi.
8. Tim pengelola dapat menerbitkan, memeriksa, menarik dan memperbarui data dengan pencatatan audit.
9. Integrasi JDIHN dan pemulihan kegagalan data dapat diuji.
10. Pusdatin dan Biro Hukum melakukan penerimaan akhir sebelum penerbitan pada domain resmi.

## 7. Pembagian pekerjaan

**Biro Hukum:** validasi koleksi, metadata, abstrak, sumber, status, relasi dan pengesahan publikasi.

**Pusdatin:** CMS, API, koneksi database, autentikasi, hosting, keamanan, unduhan file, statistik dan sinkronisasi JDIHN.

**Tim UI/UX:** sistem desain, responsivitas, pengujian browser dan aksesibilitas, serta kesesuaian antarmuka dengan alur kerja nyata.

## 8. Berkas acuan

- Beranda peninjauan: https://daudry.github.io/jdih-transmigrasi-redesign/
- Penelusuran: https://daudry.github.io/jdih-transmigrasi-redesign/telusur.html
- Katalog: https://daudry.github.io/jdih-transmigrasi-redesign/katalog.html?kategori=peraturan-menteri-transmigrasi
- Laporan sumber dan PDF: https://daudry.github.io/jdih-transmigrasi-redesign/laporan.html
- Dokumentasi standar: docs/matriks-metadata-permenkumham-8-2019.md
- Hasil verifikasi: docs/laporan-sampel-pusdatin.md
- PDF manifest: dihasilkan pada saat build dengan ukuran serta hash SHA-256.

**Batasan implementasi:** frontend yang dikembangkan merupakan prototipe untuk validasi UX dan serah terima teknis. Kesiapan layanan pemerintah operasional tetap memerlukan API, CMS, pengesahan data, pengujian keamanan dan penerimaan resmi.
