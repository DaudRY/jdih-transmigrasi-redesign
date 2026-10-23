# Blueprint Final Beranda JDIH Kementerian Transmigrasi

**Versi acuan:** 23 Oktober 2026  
**Tujuan:** beranda ringkas, mudah dipahami masyarakat, dan dapat dijadikan acuan implementasi Pusdatin. Halaman lain yang sudah ada tetap dapat diakses melalui menu dan tautan internal.

## Susunan final beranda

| Urutan | Section | Judul yang tampil | Fungsi utama | Konten lanjutan |
|---|---|---|---|---|
| 1 | Hero | Temukan dasar hukumnya. Akses dengan mudah. | Peta kawasan transmigrasi sebagai latar dan formulir pencarian | `telusur.html`, `program-penyusunan.html` |
| 2 | Akses cepat | Dokumen apa yang Anda perlukan? | Empat pintu kategori dokumen | `katalog.html`, `program-penyusunan.html` |
| 3 | Peraturan terbaru | Peraturan Terbaru | Maksimal tiga peraturan yang dapat dibaca | `detail.html?id=...`, katalog semua peraturan |
| 4 | Struktur organisasi | Struktur Organisasi | Ringkasan empat unit kerja kementerian yang tercantum pada situs resmi | `struktur-organisasi.html` dan pranala sumber kementerian |
| 5 | Layanan publik | Informasi dan Bantuan | Panduan, kontak, dan survei kepuasan | `ruang.html?bagian=...` |
| 6 | Footer | JDIH Kementerian Transmigrasi | Alamat, kelompok dokumen, layanan dan JDIHN | Semua navigasi terkait |

**Dipindahkan dari beranda:** daftar kategori yang panjang, tahapan PUU empat baris yang terlalu tinggi, statistik internal, seluruh fitur pengembangan, Program Unggulan 5T dan panel relasi yang kompleks. Fungsinya tidak dihapus; tersedia melalui katalog, pembentukan PUU, detail atau halaman layanan yang relevan.

## Palet warna berdasarkan logo kementerian

| Peran | Siang | Malam |
|---|---|---|
| Biru utama | `#194F67` | `#6FAAC5` |
| Biru sangat gelap | `#102E43` | `#071726` |
| Biru aksen | `#2C7B9E` | `#9BCFE4` |
| Emas | `#C69B56` | `#E2BA79` |
| Latar | `#E8EFF2` | `#101F2C` |
| Kartu | `#F6F8F7` | `#1B3040` |
| Border | `#C5D6DE` | `#365768` |
| Tulisan | `#18394C` | `#EAF3F6` |

**Peta:** sumber gambar identik dengan gambar kawasan transmigrasi yang diberikan pengelola. Build menyalinnya ke `assets/peta-kawasan-transmigrasi.png`; hero menggunakan satu latar yang sama untuk kedua mode, dengan overlay biru berbeda supaya teks tetap kontras. Sumber aset untuk build tercatat pada `.github/workflows/pages.yml`.

## Aturan konten dan redaksi

- Judul, deskripsi dan tombol memakai bahasa pelayanan publik yang sederhana.
- Nomor dokumen, status, abstrak, hubungan hukum, dan PDF hanya ditampilkan berdasarkan data yang sudah dipastikan sumbernya.
- Antarmuka Indonesia/Inggris tidak mengubah atau mengesahkan terjemahan dokumen hukum.
- Status pengembangan, jumlah PDF contoh, checksum, metadata yang belum lengkap, dan kebutuhan API ditempatkan pada dokumentasi teknis bagi admin dan Pusdatin, bukan memenuhi beranda.
- Gaya penulisan menggunakan kalimat baku, ringkas, tanpa tanda pisah panjang.

## Rancangan layout

### Desktop, minimal 1161px
- Lebar konten maksimum 1180px.
- Header mempertahankan navigasi kategori dan kontrol mode siang/malam serta bahasa.
- Hero dua kolom (teks dan pencarian), minimum tinggi 530px.
- Akses cepat empat kolom, Peraturan Terbaru tiga kolom.
- Struktur Organisasi dua kolom; daftar unit kerja tersusun dua kolom.
- Footer tiga kolom.

### Tablet, 651 sampai 1160px
- Menu utama berubah menjadi navigasi yang dapat dibuka.
- Hero tetap dua kolom hanya bila ruang cukup; pada 900px dan ke bawah berubah satu kolom.
- Akses cepat dan kartu peraturan berubah dua kolom.
- Struktur organisasi dan footer mengikuti ketersediaan ruang.

### Mobile, hingga 650px
- Navigasi dapat dibuka melalui tombol Menu dan ditutup dengan Escape.
- Hero satu kolom, form pencarian berada sesudah pengantar.
- Akses cepat dua kolom; daftar Peraturan Terbaru satu kolom.
- Layanan publik dan footer satu kolom.
- Semua input dan tombol sentuh minimum 42 sampai 46px.
- Layout tidak boleh menghasilkan horizontal overflow.

## Referensi sumber organisasi

Empat unit kerja yang ditampilkan mengikuti menu Unit Kerja pada situs resmi Kementerian Transmigrasi:
- Sekretariat Jenderal
- Inspektorat Jenderal
- Direktorat Jenderal PPK Transmigrasi
- Direktorat Jenderal PEM Transmigrasi

Halaman sumber: https://www.transmigrasi.go.id/profil/struktur-organisasi/

Pada saat pemeriksaan halaman sumber, konten gambar yang tertaut merupakan **logo**, bukan bagan struktur lengkap. Karena itu halaman internal menyajikan ringkasan unit kerja secara tekstual dan meminta dokumen bagan yang disahkan sebelum menampilkan hubungan pelaporan lebih rinci.

## QA dan kriteria penerimaan

- [ ] Build mengunduh dan memverifikasi gambar peta sebelum menjalankan browser test.
- [ ] Gambar hero berhasil dimuat pada Chromium, Firefox dan WebKit.
- [ ] Tidak ada gambar rumah atau peta lama pada hero.
- [ ] Mode siang/malam memakai gambar yang sama dan latar/teks yang berbeda secara nyata.
- [ ] Tidak ada overflow horizontal pada 375, 390, 650, 768, 900 dan 1440px.
- [ ] Pencarian judul/nomor dan filter kategori mengarahkan pengguna ke penelusuran internal.
- [ ] Tiga kartu Peraturan Terbaru mengarah ke halaman detail internal.
- [ ] Semua kategori, Pembentukan PUU, FAQ, kontak dan struktur organisasi tetap dapat dibuka.
- [ ] Navigasi mobile berfungsi dengan klik/touch serta keyboard Escape.
- [ ] Mode bahasa tetap aktif setelah berpindah halaman.
- [ ] PDF resmi dan batasan backend tidak disamarkan menjadi layanan operasional.
- [ ] Untuk go-live, lakukan uji fisik Safari iOS, Android Chrome, dan Windows, serta audit WCAG/keamanan bersama Pusdatin.

## Berkas implementasi

- `index.html`: homepage yang dipersingkat menjadi enam bagian.
- `assets/beranda-2026.css`: tata letak, grid, responsivitas, overlay gambar dan styling per section.
- `assets/identitas-kementrans.css`: palet biru-emas untuk seluruh halaman.
- `struktur-organisasi.html`: profil unit kerja kementerian.
- `assets/site-preferences.js`: tema dan bahasa.
- `.github/workflows/pages.yml`: persiapan gambar, pengujian dan deployment.

Desain ini adalah acuan frontend. Kelengkapan layanan resmi tetap bergantung pada integrasi data dan persetujuan Biro Hukum serta Pusdatin.
