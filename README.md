# Prototipe Redesign UI/UX JDIH Kementerian Transmigrasi

Prototipe frontend statis untuk mengevaluasi struktur informasi, penelusuran dokumen, tampilan metadata, aksesibilitas dasar, dan arah pengembangan portal JDIH Kementerian Transmigrasi.

## Status dan batasan

**Ini merupakan prototipe UI/UX, bukan pengganti portal resmi. Prinsip desainnya adalah mempertahankan fitur eksisting dan menambahkan perbaikan berdasarkan evaluasi, bukan menghapus menu yang tidak disebut dalam evaluasi.**

Dataset pencarian lokal masih berisi empat peraturan contoh Tahun 2026, namun nomor, judul, status, sumber, ikhtisar, catatan tanggal mulai berlaku, serta tautan PDF telah diperiksa terhadap halaman resmi JDIH Kementerian Transmigrasi pada 19 Oktober 2026. Data tidak diperbarui otomatis. Kolom tanggal yang kosong di metadata asli tetap kosong dalam prototipe; tanggal dalam catatan abstrak ditampilkan terpisah. Hubungan hukum hanya dicatat jika ditegaskan oleh sumber resmi. Integrasi langsung tetap membutuhkan persetujuan pemilik data dan Pusdatin. Navigasi kategori, Program Unggulan 5T, berita, informasi kelembagaan, statistik/survei, dan tautan jejaring JDIH telah ditampilkan kembali sebagai jalur akses. Kategori peraturan/nonperaturan, menu berita, profil, galeri, informasi, dan layanan kini membuka halaman internal prototipe. Tautan menuju sumber JDIH resmi tetap tersedia sebagai opsi verifikasi dokumen dan PDF, bukan tujuan utama menu. Konten dan proses backend pada sebagian besar kategori tetap belum dimigrasikan. Panel statistik prototipe sengaja tidak menggunakan angka simulasi.

## Isi repositori

- `index.html`: beranda dengan pencarian/filter lokal, dialog ringkasan cepat, serta tautan ke halaman detail lengkap. Seluruh navigasi dan fitur prototipe sebelumnya dipertahankan.
- `detail.html`: halaman detail peraturan lengkap untuk `?id=1` sampai `?id=4`, mencakup metadata, ikhtisar abstrak, relasi terverifikasi, preview PDF yang dimuat atas permintaan, dan pranala sumber resmi.
- `katalog.html`: katalog 26 kategori JDIH dan navigasi internal. Sebanyak **14 kategori** mempunyai masing-masing **satu sampel PDF asli yang dapat diunduh**; 12 kategori lain dipertahankan dengan keterangan belum ada contoh terverifikasi.
- `ruang.html`: halaman internal untuk 16 topik informasi dan layanan, termasuk berita, profil, galeri, statistik, survei, FAQ, Program 5T, kontak, dan jejaring. Bagian tanpa data resmi menampilkan informasi bahwa integrasi belum dilakukan.
- `data/catalog-categories.js`: pemetaan kategori dan URL sumber rujukan.
- `data/sampel-resmi.js`: 13 sampel dari kategori lain, ditambah satu contoh Permen yang telah ada.
- `contoh.html`: halaman detail contoh untuk kategori selain Permen dengan metadata dan unduh/pratinjau PDF.
- `laporan.html`: **laporan demonstrasi yang dapat dicetak menjadi PDF** untuk disampaikan kepada Pusdatin, berisi daftar sampel, status unduhan, dan rekomendasi integrasi.
- `docs/laporan-sampel-pusdatin.md`: dokumentasi daftar sumber per kategori, batasan dan kebutuhan Pusdatin.
- `scripts/salin-pdf-sampel.cjs`: unduhan 14 PDF dari domain sumber resmi saat GitHub Actions membangun situs; validasi header PDF dan checksum SHA-256.
- `tests/sampel-pdf.test.cjs`: pemeriksaan file salinan, jumlah kategori, ukuran berkas dan SHA-256.
- `assets/comfort-theme.css`: palet siang hijau-sage yang tidak putih menyilaukan serta mode malam responsif.
- `assets/site-preferences.js`: pilihan bahasa ID/EN dan mode siang/malam, dengan penyimpanan preferensi pada browser. Terjemahan antarmuka bersifat bantuan navigasi, bukan terjemahan hukum resmi.
- `assets/foto-kawasan-transmigrasi.webp`: salinan WebP ringan dari foto kawasan yang diunggah pengguna, digunakan sebagai background hero dengan overlay demi keterbacaan.
- `data/peraturan-2026.js`: satu sumber data empat contoh peraturan yang digunakan oleh beranda dan detail, tanpa memasukkan metadata atau relasi yang tidak terverifikasi.
- `data/metadata-schemas.js`: standar bidang metadata yang **dibedakan** untuk peraturan, monografi, artikel, dan putusan, berdasarkan Lampiran II Permenkumham Nomor 8 Tahun 2019.
- `docs/matriks-metadata-permenkumham-8-2019.md`: penjelasan item metadata resmi per jenis serta perbedaan abstrak PUU dengan ringkasan jenis dokumen lain.
- `tests/sprint1.test.cjs`: audit integritas metadata, tautan PDF, regresi fitur lama, dan pemeriksaan sintaks JavaScript.
- `tests/browser-smoke.cjs`: pengujian Chromium pada lebar 375, 768, dan 1440 piksel, navigasi kategori/sampel, unduhan dokumen, ikon, tema, dan pilihan bahasa.
- `assets/logo-jdih-globe.webp`: logo JDIH untuk identitas/header.
- `assets/logo-kementrans-bulat.webp`: lambang Kementerian Transmigrasi untuk identitas institusi pada bar atas dan footer.
- `docs/peta-indikator-evaluasi.md`: pemetaan temuan evaluasi ke keputusan desain, audit fitur eksisting, dan prioritas tindak lanjut.

## Menjalankan secara lokal

Buka `index.html` di peramban modern. Untuk pengujian melalui server lokal, jalankan dari direktori repositori:

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Menerbitkan dengan GitHub Pages

Workflow penerbitan sudah disiapkan di `.github/workflows/pages.yml`. Untuk mengaktifkannya:

1. Buka **Settings → Pages** pada repositori.
2. Pada bagian **Build and deployment → Source**, pilih **GitHub Actions**.
3. Setelah pengaturan disimpan, buka tab **Actions** dan periksa workflow **Deploy JDIH prototype to GitHub Pages**.
4. Workflow akan berjalan pada push ke branch `main`. Jika deployment berhasil, URL situs akan terlihat di ringkasan workflow dan Settings → Pages.

Workflow menerbitkan `index.html`, `detail.html`, `contoh.html`, `katalog.html`, `laporan.html`, `ruang.html`, folder `data/`, `assets/` dan 14 PDF contoh pada `pdfs/` (jika unduhan sukses). Hasil audit tersimpan pada `data/pdf-manifest.json` dan dalam artifact workflow. Sebelum menerbitkan, GitHub Actions wajib meluluskan uji integritas metadata dan smoke test Chromium. Screenshot hasil uji responsif disimpan sementara sebagai GitHub Actions artifact. README dan dokumen evaluasi tidak dipublikasikan sebagai bagian situs. GitHub Pages harus diaktifkan pada pengaturan repositori.

Panduan resmi: [Konfigurasi sumber publikasi GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Data contoh

Tautan contoh membuka halaman pada portal resmi JDIH:

- [Permen Transmigrasi Nomor 4 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/988)
- [Permen Transmigrasi Nomor 3 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/987)
- [Permen Transmigrasi Nomor 2 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/986)
- [Permen Transmigrasi Nomor 1 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/916)

Data ditujukan untuk pratinjau antarmuka; lakukan verifikasi langsung pada sumber resmi sebelum publikasi operasional.

## Sprint 1: Detail Peraturan (19 Oktober 2026)

Sprint 1 menyediakan halaman metadata peraturan yang dapat dibuka langsung, contohnya:

- [Detail Peraturan Menteri Transmigrasi Nomor 4 Tahun 2026](https://daudry.github.io/jdih-transmigrasi-redesign/detail.html?id=4)
- [Detail Peraturan Menteri Transmigrasi Nomor 3 Tahun 2026](https://daudry.github.io/jdih-transmigrasi-redesign/detail.html?id=3)

**Yang berfungsi:** navigasi detail dari kartu, dialog ringkasan cepat, pengelompokan metadata sesuai jenis, ringkasan abstrak berbasis sumber, catatan tanggal berlaku, status peraturan, satu relasi pencabutan yang terkonfirmasi untuk Nomor 4 Tahun 2026, tombol pratinjau PDF naskah/abstrak, dan penanganan ID tidak valid.

**Batasan:** metadata resmi tidak mengisi tanggal penetapan, pengundangan, dan berlaku efektif di kolom tabel, sehingga prototipe tidak mengarang nilai kolom tersebut. Ringkasan abstrak bukan pengganti PDF abstrak resmi. Hubungan terkait pada portal resmi bisa berupa rekomendasi navigasi dan bukan bukti hubungan hukum. PDF yang ditautkan diambil dari URL portal resmi, sehingga server asal bisa menolak iframe, mengubah URL, atau memiliki berkas besar. Berkas PDF tidak disalin ke GitHub Pages.

**Pengujian otomatis:** GitHub Actions menjalankan `node tests/sprint1.test.cjs` dan uji Chromium 375px, 768px, 1440px. Ini **bukan** pengujian Safari iOS langsung dan bukan sertifikasi WCAG atau keamanan.

**Pengujian manual berikutnya:** buka di Safari iOS dan Android untuk menilai keterbacaan, navigasi, tombol unduh dan preview, serta periksa kembali ketepatan metadata bersama Biro Hukum.

## Koreksi pemetaan standar metadata (19 Oktober 2026)

Lampiran II Permenkumham Nomor 8 Tahun 2019 menggunakan empat skema yang berbeda, bukan satu skema universal: peraturan (halaman 24), monografi hukum (56), artikel hukum (81), dan putusan pengadilan/yurisprudensi (92). Detail halaman memilih bidang dari `data/metadata-schemas.js` berdasarkan jenis dokumen.

Lampiran I (halaman 7–9) menetapkan **struktur abstrak untuk peraturan perundang-undangan** berupa kepala abstrak, dasar pertimbangan, dasar hukum, materi pokok, serta catatan. Struktur tersebut **tidak diterapkan sebagai standar wajib** pada ringkasan monografi, artikel, dan putusan. Dalam prototipe, bagian abstrak PUU yang belum ditranskripsi diberi keterangan demikian, bukan diisi dengan perkiraan dari ikhtisar.

**Batasan penting:** template keempat jenis sudah disiapkan di kode, tetapi dataset faktual yang ditampilkan baru empat peraturan. Belum ada contoh monografi, artikel atau putusan yang diklaim terverifikasi. Detail empat contoh tetap bergantung pada URL JDIH resmi untuk sumber naskah/abstrak, dan belum memenuhi integrasi API atau audit menyeluruh atas kualitas seluruh koleksi.

## Pengembangan navigasi internal dan tema nyaman-mata (19 Oktober 2026)

### Navigasi internal

- Beranda dan detail tetap ada.
- Tersedia 26 kategori pada halaman internal `katalog.html?kategori=...`, termasuk Peraturan Menteri, Keputusan Menteri, UU, Perpres, rancangan PUU, monografi, artikel, putusan dan yurisprudensi.
- Tersedia 16 halaman informasi/layanan pada `ruang.html?bagian=...`, termasuk berita, profil, sejarah, dasar hukum, galeri, statistik, FAQ, kontak dan Program Unggulan 5T.
- Tautan kategori dari menu, akses cepat, katalog lengkap dan tahapan pembentukan sekarang mengarah ke halaman di domain prototipe.
- Dokumen sumber asli atau tautan ke instansi lain masih dapat dibuka secara eksplisit untuk verifikasi, bukan sebagai perpindahan otomatis saat membuka kategori.

**Batasan data dan fungsi:** hanya empat contoh Permen 2026 yang ditampilkan dalam katalog. Halaman kategori lain tidak menyatakan jumlah dokumen resmi nol; mereka menampilkan status *belum tersinkronisasi*. Halaman berita, galeri, profil, statistik dan survei belum memuat data atau menjalankan backend resmi. Sistem belum merupakan *mirror* seluruh database JDIH, belum memiliki CMS, autentikasi, alur unggah, pengiriman SKM, ataupun integrasi API langsung. Pengembangan fungsi penuh wajib dikoordinasikan dengan Pusdatin serta pemilik konten Biro Hukum.

### Mode warna dan bahasa

- Tema default memakai palet hijau-sage/abu lembut, bukan latar putih murni; mode malam memakai latar biru-hijau gelap dan kartu gelap.
- Tombol bulan/matahari berada di header seluruh halaman, menyimpan preferensi ke `localStorage` pengguna.
- Pilihan **ID / EN** menerjemahkan navigasi dan sebagian besar teks antarmuka. Judul peraturan, data metadata otoritatif, naskah PDF, dan informasi hukum asli tetap dalam bahasa Indonesia. Ini **bukan terjemahan tersertifikasi** dari dokumen hukum.
- Foto kawasan transmigrasi hanya dipakai sebagai latar hero dengan overlay; halaman dokumen mengutamakan ketenangan visual dan keterbacaan.

### Pemeriksaan

Pengujian Chromium memeriksa tampilan 375px/768px/1440px, mode siang/malam, penyimpanan tema/bahasa lintas halaman, pencarian dan tautan detail/katalog, serta halaman kosong yang tidak mengarang data. Tetap perlu verifikasi langsung pada Safari iOS, perangkat Android, dan pengujian aksesibilitas mendalam.

## Sampel PDF resmi per kategori dan laporan Pusdatin (19 Oktober 2026)

Implementasi tambahan sekarang menyediakan **satu PDF resmi yang dapat diunduh untuk tiap kategori yang mempunyai sampel**, dengan **14 dari 14 PDF terverifikasi berhasil disalin** pada pengujian GitHub Actions. Halaman katalog, detail dokumen, preview PDF, dan tombol unduh salinan tetap berada di website ini. Unduhan tidak memerlukan navigasi ke domain sumber jika salinan tersedia.

- [Laporan demonstrasi Pusdatin](https://daudry.github.io/jdih-transmigrasi-redesign/laporan.html) menyediakan matriks 26 kategori, status 14 PDF contoh, pranala sumber resmi, hasil validasi dan kebutuhan API/CMS. Halaman dapat dicetak atau disimpan sebagai PDF melalui browser.
- [Unduh manifest verifikasi berkas](https://daudry.github.io/jdih-transmigrasi-redesign/data/pdf-manifest.json) untuk melihat ukuran dan checksum SHA-256 yang dihasilkan saat build.
- [Daftar sumber dan batasan resmi](docs/laporan-sampel-pusdatin.md).
- [Contoh Kepmen 99/2025](https://daudry.github.io/jdih-transmigrasi-redesign/contoh.html?id=kepmen-99-2025), [contoh Putusan PN Malili 2025](https://daudry.github.io/jdih-transmigrasi-redesign/contoh.html?id=putusan-malili-2025), dan [contoh Permen 4/2026](https://daudry.github.io/jdih-transmigrasi-redesign/detail.html?id=4).

**Batasan:** 14 adalah jumlah kategori dengan sampel publik, bukan jumlah seluruh dokumen JDIH dan bukan tingkat pemenuhan evaluasi. Dua belas kategori belum mempunyai sampel PDF yang terverifikasi pada audit ini. Dokumen putusan tidak dianggap inkracht hanya karena portal menyebut "Berlaku"; keterangan sumber yang belum lengkap harus divalidasi oleh unit pemilik dokumen. Unduhan PDF dibangun dari dokumen publik resmi dengan checksum dan perlu diurus ke Pusdatin untuk pembaruan otomatis jika prototipe dijadikan layanan operasional.

## Tahap pengembangan berikutnya

Prioritaskan inventarisasi dan kelengkapan dokumen hukum lain, konsistensi metadata serta abstrak, model metadata berbeda untuk peraturan dan putusan, relasi peraturan yang tervalidasi, statistik dari sumber resmi, serta pengujian API/sinkronisasi dan aksesibilitas. Jangan menaruh token atau kunci API di frontend publik. Keputusan arsitektur backend harus dilakukan bersama pemilik sistem dan tim TI.
