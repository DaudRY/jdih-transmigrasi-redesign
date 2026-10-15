# Peta Indikator Evaluasi ke Rancangan UI/UX dan Backlog

Dokumen ini memisahkan ringkasan materi evaluasi yang diunggah dari usulan desain. Temuan evaluasi tidak ditampilkan sebagai label penilaian publik di halaman web.

## Catatan sumber

PDF bernama `Indikator-Penilaian-Anggota-JDIH-2025` memuat materi berjudul **Sosialisasi Pedoman Pelaporan & Penilaian Anggota JDIH Tahun 2026**. Pemetaan ini mengikuti materi PDF yang tersedia. Jika ada pedoman resmi 2025 yang berbeda, isi dan bobotnya perlu diperbandingkan sebelum dijadikan acuan final.

## Ringkasan variabel penilaian pada materi yang diunggah

| Variabel | Nilai maksimal | Fokus yang dipetakan |
|---|---:|---|
| I. Pengelolaan Dokumen dan Informasi Hukum yang Lengkap dan Akurat | 58 | Kelengkapan PUU dan dokumen hukum lain, metadata, abstrak, diseminasi |
| II. Aksesibilitas terhadap Dokumen dan Informasi Hukum | 27 | Menu publikasi pembentukan PUU, detail dokumen, pencarian lanjutan, statistik, aplikasi/mobile |
| III. Integrasi dan Sinkronisasi Dokumen dan Informasi Hukum | 5 | Koleksi dan metadata tersedia pada JDIHN, API aktif dan sinkronisasi |
| IV. Pengembangan JDIH | 10 | Layanan onsite, terjemahan, pengembangan aplikasi dan keamanan, aksesibilitas disabilitas, evaluasi mandiri |
| **Total** | **100** | |

## Temuan evaluasi dan implikasi rancangan

| Area | Temuan dalam PDF evaluasi | Respons pada prototipe | Tindak lanjut sebelum operasional |
|---|---|---|---|
| PUU tahun pelaporan | Dokumen PUU tahun pelaporan dinyatakan tersedia | Kartu dokumen dan tampilan metadata terstruktur | Sinkronkan koleksi tahun pelaporan secara lengkap dan simpan bukti dukung |
| Dokumen hukum lain | Koleksi dokumen hukum lain belum lengkap | Bagian khusus dokumen lain | Inventarisasi Progsun, rancangan, naskah urgensi/akademik, risalah, hasil analisis/evaluasi, kajian dan penelitian |
| Metadata dan abstrak PUU | Metadata, terutama status, dan abstrak dinyatakan belum konsisten | Detail menempatkan jenis, nomor/tahun, status, tanggal, sumber, subjek, ringkasan secara terpisah | Tetapkan kolom wajib, daftar nilai terkendali, abstrak untuk seluruh PUU, dan QA sebelum publikasi |
| Diseminasi produk hukum | Kanal media sosial tersedia; isi diseminasi perlu konsisten dan memuat substansi | Dapat ditambah sebagai modul konten yang terkait dengan dokumen | Catat produk hukum, format diseminasi, tautan, tanggal, dan bukti dukung |
| Publikasi pembentukan PUU | Menu tersedia tetapi submenu yang direkomendasikan belum lengkap | Bagian khusus dokumen pembentukan | Pastikan setiap submenu memiliki koleksi dan bukti dukung yang nyata |
| Detail peraturan | Detail Peraturan Pelaksanaan dan Dokumen Terkait perlu disajikan | Ilustrasi struktur detail dan relasi dokumen | Bangun relasi dari metadata tervalidasi; jangan mengarang hubungan antarperaturan |
| Monografi, artikel, putusan | Detail dokumen lain belum tersedia; metadata putusan dinilai masih memakai metadata peraturan | Menu tersendiri untuk jenis dokumen berbeda | Definisikan skema metadata per tipe dan migrasikan data secara tervalidasi |
| Statistik PUU dan pengunjung | Statistik tersedia, tetapi statistik PUU belum lengkap | Panel placeholder tanpa angka simulasi | Tentukan definisi, sumber data, dan metode perhitungan yang dapat diaudit |
| Pencarian lanjutan | Fitur tersedia dan direkomendasikan untuk dioptimalkan | Pencarian/filter kata kunci, jenis, tahun, status di dataset contoh | Sambungkan ke indeks/database resmi dan tambah filter sesuai metadata yang benar-benar tersedia |
| Akses mobile | Situs dinyatakan responsif | Tata letak adaptif dan navigasi mobile | Uji perangkat nyata, ukuran layar, zoom, sentuhan, dan orientasi |
| API integrasi JDIHN | URL API dinyatakan aktif; log sinkronisasi tercatat 31 Maret 2026 | Integrasi diposisikan sebagai pekerjaan sistem berikutnya, bukan koneksi yang sudah aktif | Verifikasi endpoint, payload, CORS, autentikasi, jadwal, log kegagalan, dan penanggung jawab teknis |
| Layanan onsite | Belum tersedia pada evaluasi | Tidak diklaim sebagai layanan yang telah aktif | Tetapkan opsi ruang/pojok JDIH dan/atau kios elektronik bersama unit terkait |
| Peraturan terjemahan | Belum tersedia untuk tahun pengesahan yang baru | Tidak menampilkan status terjemahan tanpa naskah resmi | Susun proses dan simpan dokumen dukung sesuai pedoman |
| Aplikasi, SKM, keamanan | SKM disebut sebagai aplikasi pendukung; evaluasi merekomendasikan pengembangan dan uji keamanan | Bisa dikembangkan sebagai alur terpisah | Periksa aplikasi yang ada, TLS/SSL, MFA, uji keamanan, serta integrasi survei resmi bila relevan |
| Aksesibilitas disabilitas | Fitur dinyatakan tersedia dan perlu dioptimalkan | Label formulir, skip link, kontrol ukuran teks, mode kontras, fokus keyboard | Audit WCAG, pembaca layar, caption/transkrip, fokus keyboard, serta uji pengguna |
| Evaluasi mandiri | Pelaporan mandiri perlu dilakukan konsisten dan sistematis | Backlog dirangkum dalam dokumen ini, tidak menjadi klaim pada halaman publik | Bentuk siklus evaluasi, daftar kendala, rencana tindak lanjut, dan pengelolaan bukti |

## Fitur prototipe

- Tata letak responsif untuk desktop dan perangkat seluler.
- Navigasi dan pintasan ke area koleksi.
- Pencarian/filter lokal berdasarkan kata kunci, jenis, tahun, dan status.
- Detail dokumen dengan metadata, keterangan status, dan tautan sumber resmi.
- Pengaturan ukuran teks dan mode kontras tinggi sederhana.
- Placeholder statistik tanpa angka rekaan.
- Pemberitahuan bahwa data terbatas pada dataset demonstrasi.

## Prioritas implementasi

### P0: sebelum prototipe dipakai untuk review substantif

1. Validasi desain, istilah, identitas visual, kontak, dan standar visual dengan unit berwenang.
2. Verifikasi semua data contoh, tautan sumber, status, serta ringkasan terhadap portal resmi.
3. Pastikan penanda prototipe dan batasan dataset selalu terlihat.

### P1: penguatan indikator

1. Inventarisasi kelengkapan koleksi per jenis dokumen dan tahun pelaporan.
2. Standardisasi metadata, abstrak, status, dan keterangan status.
3. Definisikan skema berbeda untuk peraturan, monografi/artikel, dan putusan.
4. Lengkapi detail peraturan terkait, peraturan pelaksanaan, dan dokumen pembentukan.
5. Lengkapi submenu publikasi pembentukan PUU dan bukti dukung.
6. Tentukan statistik resmi serta metode penghitungan.
7. Verifikasi dan stabilkan API/sinkronisasi dengan tim TI.
8. Lakukan pengujian aksesibilitas, keamanan, dan pengalaman pengguna.

### P2: setelah arsitektur backend ditetapkan

- Pencarian server-side atau indeks mesin pencari.
- Integrasi API atau middleware resmi, termasuk log sinkronisasi.
- Panel admin dan validasi dokumen jika memang dibutuhkan.
- Statistik kunjungan berdasarkan sumber yang sahih dan pemberitahuan privasi.
- Alur unggah, versi dokumen, persetujuan, audit trail, dan pemeriksaan kualitas data.
- Prosedur layanan onsite dan dokumen terjemahan sebagai proses operasional.

## Arah arsitektur

**Tahap demo:** GitHub Pages dan HTML/CSS/JavaScript statis. Cocok untuk presentasi konsep dan uji pengalaman pengguna.

**Tahap integrasi:** frontend statis dengan API/middleware yang disetujui tim TI. Jangan menyimpan rahasia pada kode browser. Uji izin akses, CORS, batas laju, error handling, cache, dan sinkronisasi.

**Tahap operasional:** sistem sumber resmi tetap menjadi pemilik data. Backend atau middleware dapat menyajikan skema konsisten, mencatat sinkronisasi, menerapkan kontrol operator, dan menyediakan statistik yang dapat diaudit. Teknologi final perlu diputuskan bersama pemilik sistem dan tim keamanan.
