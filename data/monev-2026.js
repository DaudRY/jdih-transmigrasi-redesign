/* Daftar kebutuhan metadata pada dokumen Tindak Lanjut Monev 2026.
 * Ini adalah permintaan operasional Biro Hukum, tidak diklaim sebagai
 * daftar normatif Permenkumham 8/2019. Nilai field harus berasal dari sumber. */
(function(global){
"use strict";
const definitions={
 court:[
 ["Jenis Putusan","decisionType"],["Nomor Putusan","number"],["Tahun","year"],
 ["Judul","title"],["T.E.U. Badan/Pengarang","courtAuthority"],
 ["Jenis Peradilan","courtType"],["Singkatan Jenis Peradilan","courtTypeAbbreviation"],
 ["Tempat Peradilan","courtPlace"],["Tanggal Dibacakan","dateRead"],
 ["Sumber","source"],["Subjek","subject"],["Status Putusan","decisionStatus"],
 ["Bahasa","language"],["Bidang Hukum/Jenis Perkara","caseType"],["Lokasi","location"]
 ],
 minutes:[
 ["Jenis Dokumen","documentType"],["Judul","title"],["Tahun Terbit","publicationYear"],
 ["Penerbit","publisher"],["Tempat Terbit","publicationPlace"],
 ["Bidang Hukum","field"],["Bahasa","language"],["Lokasi Perpustakaan","libraryLocation"],
 ["T.E.U.","author"],["Subjek","subject"]
 ],
 study:[
 ["Jenis Dokumen","documentType"],["Judul","title"],["Tahun Terbit","publicationYear"],
 ["Tempat Terbit","publicationPlace"],["Bidang Hukum","field"],["Bahasa","language"],
 ["Lokasi Perpustakaan","libraryLocation"],["T.E.U.","author"],["Subjek","subject"]
 ],
 academic:[
 ["Jenis Dokumen","documentType"],["Judul","title"],["Tahun Terbit","publicationYear"],
 ["Penerbit","publisher"],["Tempat Terbit","publicationPlace"],["Deskripsi Fisik","physicalDescription"],
 ["Bidang Hukum","field"],["Bahasa","language"],["Lokasi Perpustakaan","libraryLocation"],
 ["T.E.U.","author"],["Subjek","subject"]
 ]
};
for(const key of Object.keys(definitions)){definitions[key].forEach(Object.freeze);Object.freeze(definitions[key]);}
global.JDIH_MONEV_METADATA=Object.freeze(definitions);
})(window);