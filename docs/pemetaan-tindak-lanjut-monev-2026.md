# Pemetaan Tindak Lanjut Monev 2026 ke Website JDIH

Rujukan: dokumen kerja **Tindak Lanjut Monev 2026.docx** yang disampaikan pengelola JDIH. Dokumen ini adalah arahan tindak lanjut UI/UX dan pengelolaan metadata, bukan dasar untuk mengarang nomor Kepmen, status rancangan, atau tautan antarperaturan.

## Penempatan fitur dalam website

| Butir dokumen Monev | Halaman/menu website | Implementasi frontend | Ketergantungan pengelola |
|---|---|---|---|
| Metadata putusan (15 bidang) | Katalog Putusan & Yurisprudensi; detail contoh putusan | `data/monev-2026.js` dan `contoh.html` dengan jenis putusan, nomor, tahun, badan, jenis peradilan, tanggal dibacakan, status putusan, dll | Validasi data per putusan oleh Biro Hukum dan direktori peradilan |
| Metadata Risalah Pembahasan (10 bidang) | Pembentukan PUU → Risalah Pembahasan | Skema metadata pada halaman kategori `katalog.html?kategori=risalah-harmonisasi` | Input Undangan Harmonisasi dan Laporan Rapat Harmonisasi nyata |
| Metadata Kajian Hukum (9 bidang) | Pembentukan PUU → Kajian Peraturan | Skema bidang `katalog.html?kategori=kajian-penelitian` | Berkas kajian resmi, TEU, lokasi perpustakaan dan publikasi |
| Metadata Naskah Akademik (11 bidang) | Pembentukan PUU → Naskah Akademik | Skema bidang `katalog.html?kategori=naskah-akademik` | Pengayaan metadata naskah akademik dari dokumen sumber |
| Program Penyusunan di urutan paling atas | Menu Pembentukan PUU | `program-penyusunan.html`, menampilkan daftar rancangan yang sudah tersedia | Kepmen yang menjadi dasar Progsun, nomor/tahun, PDF dan tahapan |
| Risalah Pembahasan setelah Naskah Akademik | Menu Pembentukan PUU | Navigasi `index.html` | Katalog resmi risalah jika sudah tersedia |
| Analisis dan Evaluasi setelah Risalah | Menu Pembentukan PUU | Navigasi dan kategori internal | Sumber dokumen anev |
| Kajian Peraturan terakhir | Menu Pembentukan PUU | Navigasi dan kategori internal | Sumber kajian |
| Abstrak langsung menuju PDF abstrak, tanpa input ulang | Detail Peraturan | Tombol Unduh Abstrak diletakkan sesudah judul abstrak | URL abstrak PDF resmi |
| Peraturan terkait | Detail Peraturan → Status dan Hubungan Hukum | Tautan internal untuk peraturan yang relasinya terverifikasi | Relasi tambahan wajib konfirmasi |
| Dokumen terkait | Detail Peraturan → Status dan Hubungan Hukum | Bagian terpisah dengan status ketersediaan | Pemetaan dokumen pembentukan ke peraturan yang ditetapkan |
| Pendapat Anda | Detail peraturan & contoh dokumen, bersebelahan dengan akses PDF | Penilaian dan isian masukan, ekspor draf `JSON` untuk uji | Endpoint resmi, kebijakan privasi, moderasi, audit dan keamanan |
| Halaman Progsun | `program-penyusunan.html` | Daftar nama rancangan, kolom status proses, tautan masukan | Kepmen dasar program dan status resmi tahapan yang belum dilampirkan |

## Penjelasan batasan

Dokumen Monev pada halaman rancangan Program Penyusunan menuliskan **Keputusan Menteri Nomor <> Tahun <>**, yaitu placeholder. Tidak ada nomor/tahun riil sehingga website tidak mengisinya secara fiktif. Tautan unduh/detail Kepmen dasar program hanya boleh aktif jika dokumen keputusan sudah diketahui.

Dua dokumen yang disebut untuk Risalah Pembahasan ialah **Undangan Harmonisasi** dan **Laporan Rapat Harmonisasi**. Struktur metadatanya telah dibuat, tetapi data faktual keduanya belum disuplai.

Formulir Pendapat Anda dapat dipakai untuk menguji pengalaman pengguna dan mengunduh draf masukan sebagai JSON. **Form tidak mengirim data ke website atau pejabat pemerintah**, sehingga belum boleh diumumkan sebagai layanan penerimaan aspirasi yang operasional.

Bagian Peraturan Terkait menautkan Permen Transmigrasi 4/2026 dengan Permen 10/2025 melalui detail internal berdasar status pencabutan yang dikonfirmasi. Bagian Dokumen Terkait tidak menghubungkan dokumen hanya karena kemiripan judul.

## Langkah implementasi operasional Pusdatin

1. Tetapkan tabel metadata per tipe dokumen dan validasi input wajib bersama Biro Hukum.
2. Sediakan relasi dokumen pembentukan dengan peraturan final, termasuk Progsun → rancangan → naskah urgensi/akademik → risalah → kajian → peraturan.
3. Sediakan endpoint kepmen dasar Progsun (nomor, tahun, status, PDF dan detail).
4. Sediakan endpoint untuk masukan masyarakat dengan autentikasi, antispam, privasi, audit dan moderasi.
5. Uji keamanan dan aksesibilitas serta sinkronisasi JDIHN sebelum layanan resmi dibuka.

Prototipe ini adalah **acuan implementasi frontend**, bukan pernyataan bahwa backend pemerintah sudah selesai.
