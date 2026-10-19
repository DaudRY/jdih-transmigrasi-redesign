# Prototipe Redesign UI/UX JDIH Kementerian Transmigrasi

Prototipe frontend statis untuk mengevaluasi struktur informasi, penelusuran dokumen, tampilan metadata, aksesibilitas dasar, dan arah pengembangan portal JDIH Kementerian Transmigrasi.

## Status dan batasan

**Ini merupakan prototipe UI/UX, bukan pengganti portal resmi. Prinsip desainnya adalah mempertahankan fitur eksisting dan menambahkan perbaikan berdasarkan evaluasi, bukan menghapus menu yang tidak disebut dalam evaluasi.**

Dataset pencarian lokal masih berisi empat peraturan contoh Tahun 2026, namun nomor, judul, status, sumber, ikhtisar, catatan tanggal mulai berlaku, serta tautan PDF telah diperiksa terhadap halaman resmi JDIH Kementerian Transmigrasi pada 19 Oktober 2026. Data tidak diperbarui otomatis. Kolom tanggal yang kosong di metadata asli tetap kosong dalam prototipe; tanggal dalam catatan abstrak ditampilkan terpisah. Hubungan hukum hanya dicatat jika ditegaskan oleh sumber resmi. Integrasi langsung tetap membutuhkan persetujuan pemilik data dan Pusdatin. Navigasi kategori, Program Unggulan 5T, berita, informasi kelembagaan, statistik/survei, dan tautan jejaring JDIH telah ditampilkan kembali sebagai jalur akses. Sebagian besar tautan tersebut masih membuka portal resmi, karena data dan fungsi backend belum dimigrasikan. Panel statistik prototipe sengaja tidak menggunakan angka simulasi.

## Isi repositori

- `index.html`: beranda dengan pencarian/filter lokal, dialog ringkasan cepat, serta tautan ke halaman detail lengkap. Seluruh navigasi dan fitur prototipe sebelumnya dipertahankan.
- `detail.html`: halaman detail peraturan lengkap untuk `?id=1` sampai `?id=4`, mencakup metadata, ikhtisar abstrak, relasi terverifikasi, preview PDF yang dimuat atas permintaan, dan pranala sumber resmi.
- `data/peraturan-2026.js`: satu sumber data empat contoh peraturan yang digunakan oleh beranda dan detail, tanpa memasukkan metadata atau relasi yang tidak terverifikasi.
- `data/metadata-schemas.js`: standar bidang metadata yang **dibedakan** untuk peraturan, monografi, artikel, dan putusan, berdasarkan Lampiran II Permenkumham Nomor 8 Tahun 2019.
- `docs/matriks-metadata-permenkumham-8-2019.md`: penjelasan item metadata resmi per jenis serta perbedaan abstrak PUU dengan ringkasan jenis dokumen lain.
- `tests/sprint1.test.cjs`: audit integritas metadata, tautan PDF, regresi fitur lama, dan pemeriksaan sintaks JavaScript.
- `tests/browser-smoke.cjs`: pengujian dengan Chromium untuk lebar 375, 768, dan 1440 piksel serta interaksi pencarian/detail/PDF.
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

Workflow menerbitkan `index.html`, `detail.html`, folder `data/`, dan folder `assets/`. Sebelum menerbitkan, GitHub Actions wajib meluluskan uji integritas metadata dan smoke test Chromium. Screenshot hasil uji responsif disimpan sementara sebagai GitHub Actions artifact. README dan dokumen evaluasi tidak dipublikasikan sebagai bagian situs. GitHub Pages harus diaktifkan pada pengaturan repositori.

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

## Tahap pengembangan berikutnya

Prioritaskan inventarisasi dan kelengkapan dokumen hukum lain, konsistensi metadata serta abstrak, model metadata berbeda untuk peraturan dan putusan, relasi peraturan yang tervalidasi, statistik dari sumber resmi, serta pengujian API/sinkronisasi dan aksesibilitas. Jangan menaruh token atau kunci API di frontend publik. Keputusan arsitektur backend harus dilakukan bersama pemilik sistem dan tim TI.
