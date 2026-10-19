# Laporan demonstrasi sampel PDF JDIH Kementerian Transmigrasi

**Tanggal pemeriksaan:** 19 Oktober 2026  
**Kegunaan:** dokumentasi pengembangan antarmuka dan usulan integrasi data untuk Biro Hukum serta Pusdatin.  
**Status:** prototipe yang menggunakan dokumen publik resmi, bukan sistem operasional atau pengganti JDIH kementerian.

## Hasil demonstrasi

Dari 26 kategori yang tersedia di katalog prototipe, **14 kategori** telah memiliki **satu contoh PDF resmi** masing-masing. Salinan berkas tersebut berhasil diperoleh melalui proses build GitHub Actions dan diperiksa sebagai PDF, dilengkapi ukuran serta checksum SHA-256. **12 kategori** belum memiliki contoh PDF terverifikasi berdasarkan pemeriksaan pada koleksi publik. Ketiadaan sampel bukan berarti tidak ada dokumen pada sistem internal atau tidak perlu diintegrasikan.

Tersedia: [Laporan HTML yang dapat dicetak sebagai PDF](https://daudry.github.io/jdih-transmigrasi-redesign/laporan.html), [Katalog interaktif](https://daudry.github.io/jdih-transmigrasi-redesign/katalog.html?kategori=peraturan-menteri-transmigrasi), serta [manifest hash dan status unduh](https://daudry.github.io/jdih-transmigrasi-redesign/data/pdf-manifest.json).

## Daftar satu sampel per kategori

| No. | Jenis dokumen | Identitas contoh | Halaman sumber |
|---|---|---|---|
| 1 | Peraturan Menteri Transmigrasi | Nomor 4 Tahun 2026, Pakaian Dinas dan Atribut Pegawai | [JDIH 988](https://jdih.transmigrasi.go.id/web/regulations/read/988) |
| 2 | Keputusan Menteri Transmigrasi | Nomor 99 Tahun 2025, Walidata dan Produsen Data Bidang Transmigrasi | [JDIH 854](https://jdih.transmigrasi.go.id/web/regulations/read/854) |
| 3 | Memorandum of Understanding | Nomor 52/HKM.07/XI/2025, Kesepahaman dengan PT Haeng Nam Sejahtera Indonesia | [JDIH 915](https://jdih.transmigrasi.go.id/web/regulations/read/915) |
| 4 | Undang-Undang | Nomor 15 Tahun 1997 tentang Ketransmigrasian | [JDIH 639](https://jdih.transmigrasi.go.id/web/regulations/read/639) |
| 5 | Perppu | Nomor 1 Tahun 2020 tentang Kebijakan Keuangan Negara dan Stabilitas Sistem Keuangan | [JDIH 564](https://jdih.transmigrasi.go.id/web/regulations/read/564) |
| 6 | Peraturan Pemerintah | Nomor 19 Tahun 2024 tentang Peraturan Pelaksanaan UU Ketransmigrasian | [JDIH 725](https://jdih.transmigrasi.go.id/web/regulations/read/725) |
| 7 | Peraturan Presiden | Nomor 50 Tahun 2018 tentang Koordinasi dan Integrasi Penyelenggaraan Transmigrasi | [JDIH 835](https://jdih.transmigrasi.go.id/web/regulations/read/835) |
| 8 | Keputusan Presiden | Nomor 12 Tahun 2020 tentang Penetapan Bencana Nonalam COVID-19 sebagai Bencana Nasional | [JDIH 164](https://jdih.transmigrasi.go.id/web/regulations/read/164) |
| 9 | Instruksi Presiden | Nomor 8 Tahun 2025 tentang Pengentasan Kemiskinan dan Penghapusan Kemiskinan Ekstrem | [JDIH 840](https://jdih.transmigrasi.go.id/web/regulations/read/840) |
| 10 | Permendes PDTT | Nomor 8 Tahun 2024 tentang Standar Sarana dan Prasarana Kantor | [JDIH 763](https://jdih.transmigrasi.go.id/web/regulations/read/763) |
| 11 | Rancangan Peraturan Menteri | Tahun 2025 tentang JDIH Kementerian Transmigrasi | [JDIH 969](https://jdih.transmigrasi.go.id/web/regulations/read/969) |
| 12 | Naskah Urgensi | Tahun 2025, Pedoman Umum Penyaluran Bantuan Pemerintah | [JDIH 982](https://jdih.transmigrasi.go.id/web/regulations/read/982) |
| 13 | Naskah Akademik | Tahun 2025, Pakaian Dinas Harian dan Atribut | [JDIH 983](https://jdih.transmigrasi.go.id/web/regulations/read/983) |
| 14 | Putusan Pengadilan | Nomor 5/Pdt.G/2025/PN Mll, Pengadilan Negeri Malili | [JDIH 984](https://jdih.transmigrasi.go.id/web/regulations/read/984) |

**Kategori lain yang tetap disediakan tanpa PDF contoh yang dinyatakan telah diperiksa:** Perjanjian Kerja Sama, Instruksi Menteri, Surat Edaran Kementerian, SK Pimpinan UKE I, Program Penyusunan, Analisis dan Evaluasi, Risalah Harmonisasi, Kajian dan Penelitian Hukum, Monografi, Artikel Hukum, HAKI, dan Yurisprudensi (Nonperaturan).

## Ketentuan pengelolaan sampel dan metadata

1. Setiap kategori yang ditemukan memiliki tepat **satu sampel**, terpisah dari pengisian seluruh koleksi.
2. PDF diunduh dari domain `jdih.transmigrasi.go.id/public/documents`, dan diterbitkan sebagai salinan untuk demonstrasi. Tiap berkas diperiksa header `%PDF-`, ukuran, dan checksum SHA-256.
3. Halaman detail menampilkan metadata yang tersedia pada sumber resmi; nilai yang tidak tersedia tidak ditebak.
4. Status "Berlaku" pada portal untuk putusan pengadilan **tidak dianggap sebagai bukti putusan inkracht**. Kolom status putusan belum dapat diisi sebelum diverifikasi melalui putusan atau direktori peradilan.
5. Dokumen pembentukan PUU (rancangan, naskah urgensi, naskah akademik) tidak dinyatakan sebagai peraturan yang sudah ditetapkan.
6. Dokumen hukum selain peraturan tidak secara otomatis diberi struktur abstrak PUU. Pemetaan metadata mengikuti kategori dan Permenkumham Nomor 8 Tahun 2019.
7. Berkas tetap membutuhkan pemeriksaan konten, keutuhan metadata, izin penggunaan sistem resmi, dan mekanisme pemutakhiran oleh Biro Hukum dan Pusdatin ketika memasuki tahap operasional.

## Kebutuhan Pusdatin untuk pengembangan operasional

- API koleksi yang mengembalikan daftar dokumen per kategori dengan pencarian, filter, paginasi, status dan waktu pembaruan.
- API atau mekanisme penyajian PDF publik, identitas dokumen, riwayat versi, pengendalian perubahan dan checksum.
- Validasi metadata per tipe dokumen, pengelolaan abstrak, relasi perubahan/pencabutan, proses dokumen pembentukan PUU, serta klasifikasi keputusan/MoU.
- Sinkronisasi JDIHN, log perubahan, monitoring gagal sinkron, hak akses CMS dan koordinasi pengesahan metadata.
- Integrasi berita, galeri, survei, statistik dan kebutuhan aksesibilitas sebagai kelanjutan pengembangan frontend.

**Catatan:** Laporan ini menggambarkan hasil demonstrasi teknis. Penyediaan 14 PDF sampel **belum berarti** 14 koleksi tersebut lengkap atau seluruh 26 kategori telah terhubung dengan server JDIH operasional.

