# Prototipe Redesign UI/UX JDIH Kementerian Transmigrasi

Prototipe frontend statis untuk mengevaluasi struktur informasi, penelusuran dokumen, tampilan metadata, aksesibilitas dasar, dan arah pengembangan portal JDIH Kementerian Transmigrasi.

## Status dan batasan

**Ini merupakan prototipe UI/UX, bukan pengganti portal resmi.** Dataset pencarian lokal hanya berisi empat contoh peraturan dan tidak diperbarui otomatis. Status, ringkasan, tanggal, serta informasi pengundangan perlu diverifikasi sebelum digunakan sebagai data operasional. Prototipe tidak terhubung ke database/API, tidak menyediakan backend/admin, dan tidak mengumpulkan statistik kunjungan.

## Isi repositori

- `index.html`: antarmuka responsif, CSS dan JavaScript, pencarian/filter lokal, detail dokumen, navigasi mobile, serta kontrol ukuran teks dan kontras.
- `docs/peta-indikator-evaluasi.md`: pemetaan temuan evaluasi ke keputusan desain dan prioritas tindak lanjut.

## Menjalankan secara lokal

Buka `index.html` di peramban modern. Untuk pengujian melalui server lokal, jalankan dari direktori repositori:

```bash
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Menerbitkan dengan GitHub Pages

1. Buka **Settings → Pages** pada repositori.
2. Pilih publikasi dari branch `main` dan folder `/(root)`, jika opsi tersebut tersedia.
3. Simpan pengaturan, lalu periksa status deployment dan URL yang ditampilkan GitHub.
4. Setelah perubahan di-commit ke branch sumber, GitHub Pages akan memperbarui situs mengikuti konfigurasi repositori.

Panduan resmi: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages).

## Data contoh

Tautan contoh membuka halaman pada portal resmi JDIH:

- [Permen Transmigrasi Nomor 4 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/988)
- [Permen Transmigrasi Nomor 3 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/987)
- [Permen Transmigrasi Nomor 2 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/986)
- [Permen Transmigrasi Nomor 1 Tahun 2026](https://jdih.transmigrasi.go.id/web/regulations/read/916)

Data ditujukan untuk pratinjau antarmuka; lakukan verifikasi langsung pada sumber resmi sebelum publikasi operasional.

## Tahap pengembangan berikutnya

Prioritaskan inventarisasi dan kelengkapan dokumen hukum lain, konsistensi metadata serta abstrak, model metadata berbeda untuk peraturan dan putusan, relasi peraturan yang tervalidasi, statistik dari sumber resmi, serta pengujian API/sinkronisasi dan aksesibilitas. Jangan menaruh token atau kunci API di frontend publik. Keputusan arsitektur backend harus dilakukan bersama pemilik sistem dan tim TI.
