# Prototipe Redesign UI/UX JDIH Kementerian Transmigrasi

Prototipe frontend statis untuk mengevaluasi struktur informasi, penelusuran dokumen, tampilan metadata, aksesibilitas dasar, dan arah pengembangan portal JDIH Kementerian Transmigrasi.

## Status dan batasan

**Ini merupakan prototipe UI/UX, bukan pengganti portal resmi. Prinsip desainnya adalah mempertahankan fitur eksisting dan menambahkan perbaikan berdasarkan evaluasi, bukan menghapus menu yang tidak disebut dalam evaluasi.**

Dataset pencarian lokal hanya berisi empat contoh peraturan dan tidak diperbarui otomatis. Status, ringkasan, tanggal, serta informasi pengundangan perlu diverifikasi sebelum digunakan sebagai data operasional. Navigasi kategori, Program Unggulan 5T, berita, informasi kelembagaan, statistik/survei, dan tautan jejaring JDIH telah ditampilkan kembali sebagai jalur akses. Sebagian besar tautan tersebut masih membuka portal resmi, karena data dan fungsi backend belum dimigrasikan. Panel statistik prototipe sengaja tidak menggunakan angka simulasi.

## Isi repositori

- `index.html`: antarmuka responsif, pencarian/filter lokal, detail dokumen, katalog kategori lengkap dengan tautan ke sumber resmi, Program Unggulan 5T, berita, Tentang Kami, statistik/survei, tautan JDIH terkait, navigasi mobile, kontrol ukuran teks dan kontras, serta bagian penambahan fitur berdasarkan evaluasi.
- `docs/peta-indikator-evaluasi.md`: pemetaan temuan evaluasi ke keputusan desain dan prioritas tindak lanjut.

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

Workflow hanya menerbitkan `index.html`; README dan dokumen evaluasi tidak dimasukkan ke situs publik. GitHub Pages tetap harus diaktifkan dari pengaturan repositori.

Panduan resmi: [Konfigurasi sumber publikasi GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Data contoh

Tautan contoh membuka halaman pada portal resmi JDIH:

- [Permen Transmigrasi Nomor 4 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/988)
- [Permen Transmigrasi Nomor 3 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/987)
- [Permen Transmigrasi Nomor 2 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/986)
- [Permen Transmigrasi Nomor 1 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/916)

Data ditujukan untuk pratinjau antarmuka; lakukan verifikasi langsung pada sumber resmi sebelum publikasi operasional.

## Tahap pengembangan berikutnya

Prioritaskan inventarisasi dan kelengkapan dokumen hukum lain, konsistensi metadata serta abstrak, model metadata berbeda untuk peraturan dan putusan, relasi peraturan yang tervalidasi, statistik dari sumber resmi, serta pengujian API/sinkronisasi dan aksesibilitas. Jangan menaruh token atau kunci API di frontend publik. Keputusan arsitektur backend harus dilakukan bersama pemilik sistem dan tim TI.
