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

## Audit kesetaraan fitur portal eksisting (*feature parity*)

Tujuan audit adalah memastikan redesign tidak mengurangi kemampuan portal hanya karena suatu fitur tidak disebut dalam indikator evaluasi. Inventaris ini didasarkan pada menu dan komponen beranda portal resmi yang ditinjau pada 16 Oktober 2026. Untuk verifikasi, lihat [portal resmi JDIH Kementerian Transmigrasi](https://jdih.transmigrasi.go.id/).

| Fitur portal eksisting | Penilaian pada prototipe awal | Status pada prototipe saat ini | Arah pengembangan |
|---|---|---|---|
| Pencarian berdasarkan kata kunci, tahun, dan nomor | Sebagian disederhanakan menjadi kata kunci, jenis, tahun, status | Pencarian lokal tetap demo; perluas input nomor dan dukungan filter tanpa menghilangkan kemampuan yang sudah ada | Pertahankan pencarian eksisting lalu optimalkan pencarian lanjutan, filter, relevansi, dan akses keyboard |
| Seluruh kategori peraturan dan keputusan | Tidak dipetakan sebagai navigasi lengkap | Seluruh jalur kategori utama disediakan sebagai tautan ke portal resmi | Saat migrasi data dilakukan, jadikan kategori tersedia langsung di frontend baru dengan pagination dan jumlah data dari sumber resmi |
| Putusan pengadilan/yurisprudensi | Hanya satu pintasan kategori | Jalur kategori putusan dan yurisprudensi tetap ada | Tambahkan skema metadata sesuai jenis putusan sebagaimana rekomendasi evaluasi |
| Dokumen pembentukan PUU | Hanya beberapa item pembentukan ditampilkan | Rancangan, Naskah Urgensi, dan Naskah Akademik tetap ditautkan; submenu tambahan ditampilkan sebagai backlog/usulan | Tambahkan Progsun/Proleg, hasil Manjau/analisis dan evaluasi, risalah/notulensi harmonisasi, partisipasi publik, kajian dan penelitian setelah koleksinya tersedia |
| Nonperaturan: monografi, artikel hukum, yurisprudensi, HAKI | Bagian dokumen lain terlalu ringkas dan tidak seluruhnya tersedia | Keempat jalur nonperaturan ditampilkan kembali | Beri tiap tipe halaman daftar dan struktur metadata sendiri, dengan pemeriksaan kelengkapan data |
| Berita JDIH | Tidak dimasukkan | Jalur Berita ditambahkan kembali melalui portal resmi | Tambahkan daftar berita dan relasi berita ke produk hukum bila tersedia |
| Profil, dasar hukum, visi-misi, dan sejarah | Tidak dimasukkan | Seluruh jalur Tentang Kami ditambahkan kembali | Pertahankan dan sesuaikan struktur editorial setelah validasi pemilik konten |
| Program Unggulan 5T | Tidak dimasukkan | Lima kartu ringkasan ditambahkan kembali pada prototipe | Validasi narasi final terhadap naskah resmi dan sediakan halaman detail bila dibutuhkan |
| Statistik pengunjung, harian/bulanan, total klik | Diganti dengan placeholder statistik dokumen sehingga fitur eksisting tidak terwakili | Komponen statistik pengunjung dan survei ditampilkan kembali, tetapi nilainya berupa placeholder tanpa angka rekaan | Hubungkan angka ke sumber metrik resmi; pisahkan statistik kunjungan dari statistik dokumen hukum |
| Survei/SKM dan penilaian pengguna | Tidak difungsikan sebagai jalur yang jelas | Tautan ke portal resmi tetap disediakan; tidak mengklaim submission dari prototipe | Verifikasi target/form survei resmi dan integrasikan secara sahih, dengan penjelasan privasi |
| Tautan JDIHN dan JDIH instansi lain | Hanya tautan JDIHN yang dipertahankan | Jejaring tautan instansi terkait ditampilkan kembali | Validasi setiap tautan secara berkala dan tandai tautan eksternal |
| Responsif mobile dan fitur aksesibilitas | Ada dasar responsif dan kontrol ukuran teks/kontras | Dipertahankan serta memakai skip link, label form, dan fokus keyboard | Uji manual di perangkat nyata dan lakukan audit WCAG/pembaca layar |
| API integrasi JDIHN dan sinkronisasi | Belum tersambung | Status secara jelas belum terintegrasi dari prototipe | Jangan menghapus API eksisting; verifikasi endpoint dan jadwal sinkronisasi bersama tim TI |
| Layanan onsite, terjemahan, optimasi aplikasi dan keamanan | Belum diimplementasikan di prototipe | Tetap sebagai rencana pengembangan, bukan fitur yang diklaim sudah aktif | Tambahkan setelah SOP, penanggung jawab, sumber data, dan prasyarat keamanan ditetapkan |

**Kesimpulan audit:** versi awal prototipe memang terlalu berfokus pada indikator sehingga beberapa fitur portal eksisting tidak terbawa. Versi yang diperbarui mengembalikan jalur navigasinya, tetapi belum memindahkan data, formulir, statistik, atau proses backend dari portal resmi. Tautan menuju portal resmi adalah jembatan sementara, bukan bukti bahwa fitur telah dimigrasikan penuh.

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
| Galeri, Foto, Video | Menu-media tercantum pada navigasi portal; beberapa rute pada pemeriksaan publik menampilkan halaman tidak ditemukan | Jalur disediakan dengan catatan perlunya validasi rute | Periksa CMS/tautan internal dengan pemilik portal sebelum menyatakan fungsi aktif |
| Pojok UKE I | Menu tersedia di navigasi portal | Jalur menuju kategori Pojok UKE I ditambahkan | Validasi kelengkapan, alur editorial, dan pemilik konten |
| Aplikasi mobile | Portal menampilkan tautan unduh Google Play, tetapi URL aplikasi tidak berhasil diverifikasi pada pemeriksaan ini | Tidak dibuat sebagai tombol aktif yang seolah pasti berfungsi | Konfirmasi status aplikasi dan URL publikasi sebelum menautkan ulang |
| Proses kegiatan, data peraturan, dokumentasi rapat | Disebut dalam uraian Profil, tetapi URL langsung tidak teridentifikasi dari menu publik yang ditinjau | Dicatat sebagai fitur yang harus diverifikasi, bukan dihapus | Konfirmasi apakah masih aktif, perlu pemetaan ulang, atau sudah digantikan fitur lain |
| Kontak, alamat, media sosial | Kontak dan tautan eksternal merupakan elemen portal selain indikator dokumen | Alamat kantor ditampilkan, jalur profil dan kontak resmi tetap disediakan | Verifikasi alamat, email, nomor kontak, tautan sosial media, dan persetujuan publikasi |
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

## Realisasi Sprint 1: Halaman detail peraturan (19 Oktober 2026)

| Kebutuhan evaluasi | Implementasi yang telah dikerjakan | Batasan dan verifikasi lanjut |
|---|---|---|
| Detail metadata peraturan | `detail.html?id={1,2,3,4}` menampilkan jenis, nomor, tahun, tajuk entri utama, subjek, tempat penetapan, tiga kolom tanggal, sumber, bahasa, bidang hukum, lokasi, status dan keterangan status | Tiga kolom tanggal kosong pada metadata portal; catatan abstrak tentang mulai berlaku diberi panel tersendiri. Audit berkala bersama pengelola data |
| Abstrak PUU | Ikhtisar poin penting dari abstrak tiap dokumen, dengan akses langsung ke PDF abstrak resmi | Ikhtisar bukan salinan lengkap; abstrak dan naskah lengkap tetap dirujuk ke portal resmi |
| Status dan relasi antarperaturan | Permen 4/2026 ditandai mencabut Permen 10/2025 berdasarkan keterangan status dan catatan abstrak resmi. Permen 1, 2 dan 3/2026 tidak diberi relasi hukum yang belum terkonfirmasi | Penambahan relasi lain memerlukan pemeriksaan eksplisit dokumen yang bersangkutan; rekomendasi dokumen lain tidak otomatis menjadi relasi hukum |
| Akses naskah hukum | Tautan naskah PDF dan abstrak PDF langsung dari JDIH resmi serta preview yang baru dimuat jika diminta pengunjung | PDF bisa gagal ditampilkan dalam iframe karena pembatasan server/peramban; fallback tautan PDF dan halaman resmi tetap tersedia |
| Konsistensi sumber data UI | Beranda dan detail memakai `data/peraturan-2026.js` yang sama, tanpa duplikasi metadata yang bertentangan | Dataset empat dokumen belum dapat mewakili seluruh koleksi, dan tidak ada integrasi API otomatis |
| Aksesibilitas dasar dan responsivitas | Label tombol, navigasi, pengendalian preview yang dapat diakses lewat tombol, desain 375/768/1440px, pengujian tanpa horizontal overflow | Smoke test Chromium bukan validasi Safari iOS atau audit WCAG |
| Pengendalian mutu deployment | Uji integritas Node dan uji Chromium dijalankan sebelum GitHub Pages build/deploy; tangkapan layar diuji disimpan sementara sebagai artifact | Perlu uji manual aksesibilitas, keamanan, validasi data secara berkala, serta integrasi resmi setelah disetujui |

Sumber data empat peraturan:
- [Permen Transmigrasi 4/2026](https://jdih.transmigrasi.go.id/web/regulations/read/988)
- [Permen Transmigrasi 3/2026](https://jdih.transmigrasi.go.id/web/regulations/read/987)
- [Permen Transmigrasi 2/2026](https://jdih.transmigrasi.go.id/web/regulations/read/986)
- [Permen Transmigrasi 1/2026](https://jdih.transmigrasi.go.id/web/regulations/read/916)

**Prinsip yang harus dipertahankan:** jangan menyatakan fitur backend, integrasi API atau dokumen yang belum ada sebagai sudah siap operasional. Seluruh fitur navigasi portal yang telah diinventarisasi pada bagian audit *feature parity* wajib tetap tersedia dalam Sprint berikutnya.

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
