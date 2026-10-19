# Matriks standar metadata berdasarkan Permenkumham Nomor 8 Tahun 2019

**Status:** rujukan klasifikasi dan rancangan template frontend. Belum merupakan klaim bahwa seluruh koleksi JDIH telah dibersihkan atau telah memenuhi standar.

**Dokumen sumber:** *Peraturan Menteri Hukum dan Hak Asasi Manusia Nomor 8 Tahun 2019 tentang Standar Pengelolaan Dokumen dan Informasi Hukum*, BN 2019 No. 692, terutama Lampiran I halaman 7–9 dan Lampiran II halaman 21–24, 56–57, 81–82, 92–93 (nomor halaman PDF).

## Prinsip pembeda

Lampiran II membedakan empat tipe dokumen hukum, masing-masing dengan skema katalog berbeda. Lampiran I mengatur **pembuatan abstrak peraturan perundang-undangan**, bukan menetapkan kerangka lima bagian bagi ringkasan monografi, artikel, dan putusan. Lampiran II memuat contoh lampiran abstrak untuk sebagian jenis dokumen tersebut, tetapi bukan instruksi agar abstraknya sama dengan peraturan.

Metadata yang tidak ditemukan di halaman resmi harus tetap kosong/berstatus belum dicatat sampai diverifikasi pengelola. Jangan gunakan tanggal pada Catatan Abstrak untuk mengisi otomatis kolom tanggal penetapan/pengundangan yang kosong di metadata resmi.

## A. Peraturan perundang-undangan (Lampiran II halaman 24)

1. Tipe Dokumen
2. Judul
3. T.E.U. Badan/Pengarang
4. Nomor Peraturan
5. Jenis/Bentuk Peraturan
6. Singkatan Jenis/Bentuk Peraturan
7. Tempat Penetapan
8. Tanggal-Bulan-Tahun Penetapan/Pengundangan
9. Sumber
10. Subjek
11. Status
12. Bahasa
13. Lokasi
14. Bidang Hukum
15. Lampiran

**Abstrak khusus PUU menurut Lampiran I halaman 7–9:**
- Kepala abstrak: subjek, tahun, jenis dan nomor peraturan, sumber, serta judul;
- Dasar Pertimbangan: ringkasan bagian *Menimbang*;
- Dasar Hukum: disalin dari bagian *Mengingat* sesuai hierarki;
- Materi Pokok: ringkasan substansi berdasarkan batang tubuh/pasal;
- Catatan: tanggal berlaku, pelaksanaan, pencabutan, perubahan, dan informasi kedudukan hukum jika ada.

**Catatan penting:** abstrak yang standar ini wajib dibedakan dari ikhtisar singkat di kartu pencarian. Ikhtisar dapat membantu pengguna, tetapi tidak boleh diberi label sebagai abstrak resmi yang lengkap.

## B. Monografi hukum (Lampiran II halaman 56)

1. Tipe Dokumen
2. Judul
3. T.E.U. Orang/Badan
4. Nomor Panggil
5. Cetakan/Edisi
6. Tempat Terbit
7. Penerbit
8. Tahun Terbit
9. Deskripsi Fisik
10. Subjek
11. ISBN
12. Bahasa
13. Bidang Hukum
14. Nomor Induk Buku
15. Lokasi
16. Lampiran

**Ringkasan/abstrak:** Lampiran II tidak menetapkan susunan Menimbang–Mengingat–Materi Pokok–Catatan untuk monografi. Bila penerbit atau pengelola mempunyai ringkasan/abstrak yang dapat diverifikasi, tampilkan sebagai ringkasan isi karya tersendiri. Nomor panggil, edisi, penerbit, ISBN, deskripsi fisik, dan nomor induk buku tidak boleh diganti dengan elemen penetapan peraturan.

## C. Artikel hukum (Lampiran II halaman 81)

1. Tipe Dokumen
2. Judul
3. T.E.U. Orang/Badan
4. Tempat Terbit
5. Tahun Terbit
6. Sumber
7. Subjek
8. Bahasa
9. Bidang Hukum
10. Lokasi
11. Lampiran

**Ringkasan/abstrak:** mengikuti naskah artikel dan informasi publikasinya, jika tersedia dan terverifikasi. Lampiran II tidak memberi format lima bagian abstrak PUU sebagai struktur wajib untuk artikel. Sumber merujuk publikasi asal (misalnya nama jurnal/majalah/koran), bukan BN/LN yang dipakai peraturan.

## D. Putusan pengadilan/yurisprudensi (Lampiran II halaman 92)

1. Tipe Dokumen
2. Judul
3. T.E.U. Badan
4. Nomor Putusan
5. Jenis Peradilan
6. Singkatan Jenis Peradilan
7. Tempat Peradilan
8. Tanggal-Bulan-Tahun Dibacakan
9. Sumber
10. Subjek
11. Status
12. Bahasa
13. Bidang Hukum/Jenis Perkara
14. Lokasi
15. Lampiran

**Ringkasan/abstrak:** status putusan dan tanggal dibacakan berbeda dari keberlakuan serta pengundangan peraturan. Lampiran II tidak menetapkan format lima bagian abstrak PUU untuk putusan. Bila menyajikan ringkasan perkara, pertimbangan hukum atau amar putusan, itu adalah **usulan struktur UI tambahan**, bukan kewajiban redaksi Lampiran I, dan isinya wajib diperiksa dari putusan resmi.

## Penggunaan dalam kode

- `data/metadata-schemas.js`: empat skema terpisah, mengikuti urutan lampiran.
- `detail.html`: memilih skema berdasarkan `d.type`. Untuk `regulation`, halaman menyajikan susunan abstrak yang dipersyaratkan dengan penanda "belum ditranskripsi" pada bagian yang belum tersedia; tidak menyamarkan ikhtisar sebagai abstrak lengkap.
- `data/peraturan-2026.js`: saat ini hanya empat sampel **peraturan**, bukan sampel monografi/artikel/putusan. Jangan menampilkan sampel fiktif hanya demi menguji UI publik.
- `tests/sprint1.test.cjs`: memastikan urutan dan nama key tiap skema tidak menjadi satu daftar universal.

## Jenis dokumen eksisting lain di portal

Kategori seperti Keputusan Menteri, kerja sama/MoU, dokumen HAKI, dan dokumen pembentukan PUU harus **dipetakan dan diverifikasi terlebih dahulu** terhadap klasifikasi dan ketentuan pengelola. Empat tipe pada Lampiran II tidak berarti seluruh ragam dokumen tersebut boleh dimasukkan secara sembarangan ke metadata Peraturan. Untuk jenis yang belum ditentukan skemanya, tampilkan informasi minimal yang telah diverifikasi dan minta validasi Biro Hukum sebelum menambah field.

## Pemeriksaan kualitas sebelum status 'lengkap'

1. Pastikan tipe dokumen dan skema yang benar.
2. Validasi setiap field dengan naskah sumber atau metadata yang diterbitkan.
3. Periksa format tanggal yang sesuai jenis dokumen: penetapan/pengundangan untuk peraturan; dibacakan untuk putusan; tahun terbit untuk monografi dan artikel.
4. Periksa status hukum/putusan dengan terminologi yang sesuai, jangan menyamakan keduanya.
5. Periksa kesesuaian isi abstrak dengan jenis dokumen. Untuk PUU gunakan susunan Lampiran I; untuk lainnya jangan memaksakan Lampiran I.
6. Pastikan tautan lampiran naskah dan/atau abstrak resmi tidak rusak; simpan asal-usul sumber dokumen.
7. Jangan tandai lengkap jika data belum diperiksa oleh pemilik/pengelola informasi.

