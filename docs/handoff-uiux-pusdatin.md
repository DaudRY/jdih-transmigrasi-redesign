# Spesifikasi Handoff UI/UX Portal JDIH Kementerian Transmigrasi

**Status:** rancangan antarmuka dan implementasi frontend yang dapat dijadikan acuan teknis untuk Pusdatin dan Biro Hukum. Dokumen ini **bukan** persetujuan migrasi produksi dan tidak menyatakan backend/API sudah terintegrasi.

## A. Tujuan

Memberikan pengalaman akses dokumen hukum yang intuitif, dapat ditelusuri dalam satu domain, konsisten pada desktop Windows, Android, dan browser berbasis WebKit/Safari, serta mudah dipahami tanpa harus membaca istilah teknis pengembangan.

Pengguna publik sebaiknya melihat fungsi layanan; status migrasi, checksum berkas, dan kebutuhan API tetap dapat dibaca dalam [laporan integrasi](../laporan.html) atau matriks verifikasi khusus admin, bukan menjadi judul atau slogan di beranda.

## B. Halaman yang sudah diimplementasikan

| Halaman | Fungsi | URL |
|---|---|---|
| Beranda | Hero, penelusuran cepat, pilihan kategori, daftar Permen, relasi hukum, ringkasan koleksi, menu layanan | `index.html` |
| Penelusuran terpadu | Judul, nomor, kategori, tahun, filter, urutan dan kartu hasil | `telusur.html` |
| Katalog | Kategori dokumen, pencarian/filter dan satu PDF contoh bagi kategori tersedia | `katalog.html?kategori=...` |
| Detail Permen | Metadata tipe peraturan, abstrak/ikhtisar, status/relasi terverifikasi, PDF | `detail.html?id=...` |
| Detail dokumen kategori | Metadata sesuai kategori, unduh/pratinjau PDF, jejak sumber | `contoh.html?id=...` |
| Informasi dan layanan | Berita, profil, galeri, statistik, kontak, survei, panduan | `ruang.html?bagian=...` |
| Dokumentasi teknis | Matriks kategori, salinan PDF dan kebutuhan integrasi | `laporan.html` |

Menu internal harus mengarah ke halaman internal. Situs asal dan instansi lain boleh dibuka melalui tautan **Sumber Resmi** yang diberi label eksplisit. Jangan mengubah pranala sumber asli menjadi tautan internal palsu.

## C. Desain dan komponen

- **Palet siang:** hijau-sage dan permukaan hijau-putih lembut, bukan putih murni; latar dan kartu memiliki kontras yang cukup untuk membedakan lapisan.
- **Palet malam:** dasar biru-hijau gelap dan tulisan terang; pengguna dapat mengganti tema dari header, preferensi disimpan secara lokal.
- **Bahasa:** ID/EN sebagai pilihan **antarmuka**, tidak mengubah naskah hukum Indonesia menjadi seolah-olah terjemahan resmi.
- **Tipografi:** sistem UI dengan fallback font native Windows/iOS/Android; tidak perlu mengunduh font dari CDN.
- **Jarak dan kartu:** padding, radius, hierarchy dan CTA konsisten pada halaman utama, katalog, hasil pencarian dan detail.
- **Ikon:** SVG inline dengan simbol berbeda bagi peraturan, pembentukan PUU, monografi/artikel, putusan, berita dan layanan; teks tidak digantikan hanya oleh ikon.
- **Aksesibilitas:** skip link, landmark main, label input, visible focus, keyboard menu, reduced-motion, target sentuh minimal ±42 piksel, pengujian overflow.
- **Foto:** latar kawasan transmigrasi dipakai pada hero, dengan overlay kontras agar teks tetap jelas.
- **Mode gawai:** pada breakpoint tablet/mobile navigasi menjadi menu yang dapat dibuka/tutup; kontrol tetap dapat disentuh dan kartu menyesuaikan lebar layar.

Berkas style utama: `assets/comfort-theme.css`, `assets/portal-finish.css`, dan `assets/portal-polish.css`. Jangan duplikasi palet atau membuat styling per halaman tanpa alasan.

## D. Data dan metadata untuk produksi

1. **Kategori** dari `data/catalog-categories.js` menjadi taksonomi awal, tidak boleh dianggap daftar final tanpa validasi admin.
2. **Metadata** memakai empat skema berbeda sesuai Lampiran II Permenkumham Nomor 8 Tahun 2019: peraturan, monografi, artikel dan putusan. Kategori lainnya perlu pemetaan tersendiri.
3. **Abstrak PUU** mengikuti Lampiran I. Ikhtisar UI bukan pengganti abstrak resmi.
4. **Sumber PDF** pada prototipe ialah PDF publik resmi yang disalin sebagai sampel; untuk produksi harus dilayani dari repositori/server dokumen yang dikelola kementerian.
5. **Status hukum** harus memiliki kamus status per jenis dokumen. Status "Berlaku" pada laman putusan tidak membuktikan status inkracht.
6. **Hubungan antarperaturan** hanya ditampilkan apabila relasinya telah dikonfirmasi oleh metadata atau ketentuan hukum resmi.

## E. Kontrak data yang perlu dirumuskan bersama Pusdatin

- `GET /api/v1/categories`: id, slug, label ID/EN, kelompok, jumlah dokumen jika tersedia.
- `GET /api/v1/documents`: pagination, type/category, keyword, number, year, status, sort, updated_at.
- `GET /api/v1/documents/{id}`: metadata bertipe, abstrak, lampiran, status, relasi terverifikasi, riwayat perubahan.
- `GET /api/v1/documents/{id}/files`: filename, mime, ukuran, checksum, versi file, izin akses, unduhan.
- `GET /api/v1/publications`: berita, galeri, profil (dari CMS terotorisasi).
- `GET /api/v1/statistics`: statistik koleksi dan kunjungan yang benar, bukan angka contoh.
- `POST /api/v1/feedback`: SKM dengan validasi dan perlindungan data sesuai kebijakan kementerian.

Rute di atas **usulan kontrak API untuk pembahasan**, bukan endpoint yang sudah tersedia. Pusdatin menentukan metode autentikasi, hosting, logging, caching, rate limiting, SLA, backup dan monitoring.

## F. Kriteria penerimaan sebelum dijadikan layanan resmi

- [ ] Semua halaman utama dapat dibuka tanpa 404 dan tautan internal tidak mengarah ke domain lain tanpa label.
- [ ] Beranda dan navigasi bekerja pada 390, 768, 1440 piksel tanpa overflow horizontal.
- [ ] Pencarian, filter, urutan, reset dan tautan dokumen menuju ID yang benar.
- [ ] Mode siang/malam dan bahasa ID/EN bertahan selama pengguna berpindah halaman.
- [ ] Pengujian otomatis Chromium, Firefox dan WebKit berhasil; uji fisik Safari iOS, Android dan Windows tetap dilakukan terpisah.
- [ ] Semua dokumen produksi berasal dari API/database kementerian dengan metadata dan file valid.
- [ ] Tidak ada angka statistik, status dokumen, abstrak, berita atau catatan hukum yang dibuat-buat.
- [ ] Aksesibilitas diuji terhadap WCAG 2.2 AA, termasuk screen reader dan perangkat sentuh, bukan hanya pemeriksaan CSS.
- [ ] Persetujuan pengelola konten, Biro Hukum, Pusdatin, keamanan, dan tata kelola hosting sebelum go-live.

## G. Cara kerja pengembangan berikutnya

Pilih komponen yang akan diintegrasikan lebih dulu (katalog dan detail dokumen), sambungkan ke API staging Pusdatin, uji dengan koleksi nyata, lalu terapkan pada fitur berikutnya. Frontend dapat digunakan sebagai baseline untuk coding, tetapi **jangan mengklaim siap produksi penuh** sebelum seluruh kriteria di atas lulus.
